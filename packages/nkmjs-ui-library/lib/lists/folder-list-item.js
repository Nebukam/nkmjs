'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const dom = require(`../dom`);


/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetItem
 * @memberof ui.core.tree
 */
class FolderListItem extends ui.lists.ListItem {
    constructor() {
        super();
        this.depth = 0;
    }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/lists/folder-list-item.css`]
    }, ui.lists.ListItem, ['css']);

    // ----> Init

    _Init() {
        super._Init();
        this._toolbarClass = ui.WidgetBar;
    }

    _PostInit(){
        super._PostInit();
        this._distribute.To(`data`, `itemData`); // Make sure this is registered last
    }

    // ----> DOM

    /**
     * @description TODO
     * @type {ui.core.manipulators.Icon}
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
     * @type {ui.core.manipulators.Text}
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
        return style.Extends({
            ':host': {
                
            }
        }, super._Style());
    }

    _Render() {

        super._Render();

        ui.DOMTemplate.Render(dom.FacadeLabel, this, {
            [ui.IDS.OWNER]: this,
            [ui.IDS.ICON]: { autoHide: false }
        });

        this._label.ellipsis = true;

    }

    // ----> Update infos   

    _UpdateInfos() {
        
        if (this._itemData) {
            if (!this._label.Set(this._itemData)) { this._label.Set(this._data.options); }
            if (!this._icon.Set(this._itemData)) { this._icon.Set(this._data.options); }
        } else {
            this._label.Set(this._data.options);
            this._icon.Set(this._data.options);
        }

    }

}

module.exports = FolderListItem;
ui.Register(`nkmjs-folder-list-item`, FolderListItem, `li`);