'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { CSS } = require(`@nkmjs/style`);

const UI = require(`../ui`);
const UI_ID = require(`../ui-id`);
const MOUSE = require("../mouse");

const DOMTemplate = require(`../dom-template`);
const Toolbar = require(`../helpers/toolbar`);

const { TPLFacadeLabel } = require("../templates");
const CatalogWidget = require("../widget-catalog");


/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.CatalogWidget
 * @memberof ui.core.tree
 */
class TreeItem extends CatalogWidget {
    constructor() {
        super();
        this.depth = 0;
    }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/tree/tree-item.css`]
    }, CatalogWidget, ['css']);

    // ----> Init

    _Init() {

        this.default_SelectOnActivation = u.tils.Default(this.default_SelectOnActivation, true);

        super._Init();

        this._notifiesSelectionStack = true;

        this._tplClass = TPLFacadeLabel;
        this._toolbarClass = Toolbar;
        this._toolbar = null;
        this._toolbarCtnr = null;

        this._depth = 0;

    }

    _PostInit() {
        super._PostInit();
        this.order = 1;
    }

    // ----> DOM

    /**
     * @description TODO
     * @type {number}
     */
    get depth() { return this._depth; }
    set depth(p_value) { this._depth = p_value; this.style.setProperty(`--depth`, this._depth); }

    /**
     * @description TODO
     * @type {ui.core.manipulators.ImageManipulator}
     * @customtag read-only
     */
    get icon() { return this._icon; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set icon(p_value) { this._icon.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.manipulators.ImageManipulator}
     * @customtag read-only
     */
    get label() { return this._label; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set label(p_value) { this._label.Set(p_value); }

    _Style() {
        return CSS.Extends({
            ':host': {
                'position': 'relative',
                'min-width': 0,
            },
            '.toolbar': {
                'flex': `0 0 auto`
            }
        }, super._Style());
    }

    _Render() {

        if (!this._tplOptions) {
            this._tplOptions = {
                [UI_ID.OWNER]: this,
                [UI_ID.ICON]: { autoHide: false }
            };
        }

        DOMTemplate.Render(this._tplClass, this, this._tplOptions);
        this._toolbarCtnr = this;
        this.focusArea = this;

    }

    // ----> Update infos   

    _UpdateInfos() {

        if (this._itemData) {
            this._flavorEnum.Set(this._itemData.isDirty ? com.COMMON_FLAG.WARNING : null);
            if (!this._label.Set(this._itemData)) { this._label.Set(this._data.options); }
            if (!this._icon.Set(this._itemData)) { this._icon.Set(this._data.options); }
        } else {
            this._flavorEnum.Set(null);
            this._label.Set(this._data.options);
            this._icon.Set(this._data.options);
        }

    }

    // ----> COMMANDS

    _BuildCommand(p_cmd) {

        if (!this._toolbar) { this._toolbar = this.Add(this._toolbarClass, `toolbar`, this._toolbarCtnr); }
        this._toolbar.CreateHandle({
            command: p_cmd, isCommandTrigger: false,
            trigger: { thisArg: this, fn: this._ExecuteCommand, arg: p_cmd }
        });

    }

    _ClearCommandHandles() {
        super._ClearCommandHandles();
        if (this._toolbar) {
            this._toolbar.Release();
            this._toolbar = null;
        }
    }

    // ----> Pooling

    _CleanUp() {
        this._depth = 0;
        super._CleanUp();
    }

}

module.exports = TreeItem;
UI.Register(`nkmjs-tree-item`, TreeItem, `li`);