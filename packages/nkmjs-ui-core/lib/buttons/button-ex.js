'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { CSS, FONT_FLAG } = require("@nkmjs/style");

const UI_FLAG = require(`../ui-flag`);
const UI_ID = require(`../ui-id`);
const UI = require(`../ui.js`);
const ButtonBase = require(`../button-base`);
const manipulators = require("../manipulators");

/**
 * @description A ButtonEx is a basic button implementation with an icon & a label.
 * @class
 * @hideconstructor
 * @augments ui.core.buttons.ButtonBase
 * @memberof ui.core.buttons
 */
class ButtonEx extends ButtonBase {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/button-ex.css`]
    }, ButtonBase, ['css']);

    _Init() {
        super._Init();

        this._optionsHandler.Hook( UI_ID.ICON, null, ``);
        this._optionsHandler.Hook( UI_ID.LABEL, null, ``);
        this._optionsHandler.Hook(`uppercaseText`);

        this._icon = null;
        this._label = null;

        this._flags.Add(this, UI_FLAG.NO_ICON, UI_FLAG.NO_LABEL);

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        //this._facade.data = p_data;
    }

    // ----> DOM

    /**
     * @description TODO
     * @type {ui.core.manipulators.IconManipulator}
     * @customtag read-only
     */
    get icon() { return this._icon; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    /**
     * @description TODO
     * @type {ui.core.manipulators.IconManipulator}
     * @customtag read-only
     */
    get label() { return this._label; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set label(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._label.Set(p_value)); }

    _Render() {
        super._Render();

        this._icon = new manipulators.Icon(u.dom.New(`img`, { class: UI_ID.ICON }, this._host));
        this._label = new manipulators.Text(u.dom.New(`span`, { class: UI_ID.LABEL }, this._host));

    }

    _CleanUp() {
        this._icon.Set(null);
        this._label.Set(null);
        super._CleanUp();
    }



}

module.exports = ButtonEx;
UI.Register(`nkmjs-button-ex`, ButtonEx);