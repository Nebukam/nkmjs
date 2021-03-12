'use strict';

const com = require("@nkmjs/common");
const { DataBlock, CatalogItem } = require(`@nkmjs/data-core`);
const { CSS, FONT_FLAG } = require(`@nkmjs/style`);
const { UI_ID, UI, UI_FLAG, ButtonBase, DOMTemplate, templates } = require(`@nkmjs/ui-core`);

class BreadcrumbItem extends ButtonBase {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/breadcrum-item.css`]
    }, ButtonBase, ['css']);

    _Init() {
        super._Init();

        this._optionsHandler.Hook(UI_ID.ICON, null, ``);
        this._optionsHandler.Hook(UI_ID.LABEL, null, ``);

        this._alwaysDisplayCommand = true;
        this._icon = null;
        this._label = null;
    }

    // ----> DOM

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) { this._flags.Set(UI_FLAG.NO_LABEL, !this._label.Set(p_value)); }

    _Render() {
        DOMTemplate.Render(templates.FacadeLabel, this, {
            [UI_ID.OWNER]: this,
            [UI_ID.LABEL]: { [UI_ID.CSS_CL]: FONT_FLAG.REGULAR }
        });

        this.focusArea = this;
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        //this._label.Set(this._data);
    }
}

module.exports = BreadcrumbItem;
UI.Register(`nkmjs-breadcrum-item`, BreadcrumbItem);