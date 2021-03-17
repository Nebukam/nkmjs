'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

class BreadcrumbItem extends ui.buttons.ButtonBase {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/breadcrum-item.css`]
    }, ui.buttons.ButtonBase, ['css']);

    _Init() {
        super._Init();

        this._optionsHandler.Hook(ui.IDS.ICON, null, ``);
        this._optionsHandler.Hook(ui.IDS.LABEL, null, ``);

        this._alwaysDisplayCommand = true;
        this._icon = null;
        this._label = null;
    }

    // ----> DOM

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(ui.FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) { this._flags.Set(ui.FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    _Render() {
        ui.Render(ui.templates.FacadeLabel, this, {
            [ui.IDS.OWNER]: this,
            [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: style.FONT_FLAG.REGULAR }
        });

        this.focusArea = this;
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
    }
}

module.exports = BreadcrumbItem;
ui.Register(`nkmjs-breadcrum-item`, BreadcrumbItem);