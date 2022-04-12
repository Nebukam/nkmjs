'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

/**
 * @description A ButtonEx is a basic button implementation with an icon & a label.
 * @class
 * @hideconstructor
 * @augments ui.core.buttons.ButtonBase
 * @memberof ui.core.buttons
 */
class ButtonEx extends ui.WidgetButton {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/button-ex.css`]
    }, ui.WidgetButton, ['css']);

    _Init() {
        super._Init();

        this._distribute
            .To(ui.IDS.ICON, null, ``)
            .To(ui.IDS.LABEL, null, ``)
            .To(`uppercaseText`);

        this._icon = null;
        this._label = null;

        this._flags.Add(this, ui.FLAGS.NO_ICON, ui.FLAGS.NO_LABEL);

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        //this._facade.data = p_data;
    }

    // ----> DOM

    /**
     * @description TODO
     * @type {ui.core.manipulators.Icon}
     * @customtag read-only
     * @group Components
     */
    get icon() { return this._icon; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     * @group Components
     */
    set icon(p_value) { this._flags.Set(ui.FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    /**
     * @description TODO
     * @type {ui.core.manipulators.Icon}
     * @customtag read-only
     * @group Components
     */
    get label() { return this._label; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     * @group Components
     */
    set label(p_value) { this._flags.Set(ui.FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    _OnCommandUpdated(p_command){
        super._OnCommandUpdated(p_command);
        this.label = p_command.displayInfos.name;
        this.icon = p_command.displayInfos.icon;
    }

    _Render() {
        super._Render();

        this._icon = new ui.manipulators.Icon(ui.dom.El(`div`, { class: ui.IDS.ICON }, this._host));
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: ui.IDS.LABEL }, this._host));
        this._label.ellipsis = true;

    }

    _CleanUp() {
        this._icon.Set(null);
        this._label.Set(null);
        super._CleanUp();
    }



}

module.exports = ButtonEx;
ui.Register(`nkmjs-button-ex`, ButtonEx);