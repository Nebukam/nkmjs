'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");

const dom = require(`../dom`);

const FolderListItem = require(`./folder-list-item`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.lists.List
 * @memberof ui.core.tree
 */
class FolderList extends ui.lists.Folder {
    constructor() { super(); }

    static __defaultItemClass = FolderListItem;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/lists/folder-list.css`]
    }, ui.lists.List, ['css']);

    // ----> Init

    _Init() {
        super._Init();
    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._body, this._expandIcon.element);
    }

    _SetupBuilder(p_catalogBuilder) {
        this._streamerWrapper = this._body;
        p_catalogBuilder.host = this._body;
    }

    // ----> DOM

    //TODO : Body must break flex row
    _Style() {
        return style.Extends({
            ':host': {
                
            },
            '.header': {
                
            }
        }, super._Style());
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

}

module.exports = FolderList;
ui.Register(`nkmjs-folder-list`, FolderList, `ul`);