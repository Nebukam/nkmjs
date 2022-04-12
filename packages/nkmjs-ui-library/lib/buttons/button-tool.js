'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

/**
 * @description A tool button is a simple button with an icon.
 * @class
 * @hideconstructor
 * @augments ui.core.WidgetButton
 * @memberof ui.library.buttons
 */
class ToolButton extends ui.WidgetButton {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/button-tool.css`]
    }, ui.WidgetButton, ['css']);

    _Init() {
        super._Init();
        this._distribute
            .To(ui.IDS.ICON, null, ``);

        this._icon = null;

        this._flags.Add(this, ui.FLAGS.NO_ICON, ui.FLAGS.NO_LABEL);
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
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

    _OnCommandUpdated(p_command) {
        super._OnCommandUpdated(p_command);
        this.icon = p_command.displayInfos.icon;
    }

    _Render() {
        super._Render();
        this._icon = new ui.manipulators.Icon(ui.dom.El(`div`, { class: ui.IDS.ICON }, this._host), false);
    }

    _PostRender() {
        this._icon.Set(null);
    }

    _CleanUp() {
        this._icon.Set(null);
        super._CleanUp();
    }



}

module.exports = ToolButton;
ui.Register(`nkmjs-tool-button`, ToolButton);