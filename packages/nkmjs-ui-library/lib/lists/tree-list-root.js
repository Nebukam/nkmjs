'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");

const dom = require(`../dom`);

const TreeItem = require(`./tree-list-item`);
const TreeList = require(`./tree-list`);

const base = ui.lists.ListRoot;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.lists.ListRoot
 * @memberof ui.core.tree
 */
class TreeListRoot extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/lists/tree-list-root.css`]
    }, base, ['css']);

    static __defaultItemClass = TreeItem;
    static __defaultDirClass = TreeList;

    // ----> Init

    _Init() {
        super._Init();
    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._body, this._expandIcon.element);
    }

    _SetupBuilder(p_catalogBuilder) {
        p_catalogBuilder.host = this._body;
    }

    static _Style() {
        return style.Extends({
            ':host': {
                
            }
        }, base._Style());
    }

    _Render() {

        ui.DOMTemplate.Render(dom.BodyExpand, this, {
            [ui.IDS.OWNER]: this,
            //[ui.IDS.ICON]: { autoHide: true },
            expandIcon: { htitle: `Expand` }
        });

        this._icon.autoHide = true;

        this._toolbarCtnr = this._header;

        this._dragActivator = this._header;
        this._dragFeedbackHost = this._header;

        this.focusArea = this._header;

        this._label.ellipsis = true;

    }

    // ----> Update infos   

    _UpdateInfos() {

        super._UpdateInfos();

        if (this._itemData) {
            if (!this._label.Set(this._itemData)) { this._label.Set(this._data.options); }
            if (!this._icon.Set(this._itemData)) { this._icon.Set(this._data.options); }
        } else {
            this._label.Set(this._data.options);
            this._icon.Set(this._data.options);
        }

    }

    _OpenFind() {

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = TreeListRoot;
ui.Register(`nkmjs-tree-list-root`, TreeListRoot);