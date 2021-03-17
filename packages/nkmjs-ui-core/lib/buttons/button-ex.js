'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const IDS = require(`../ids`);
const UI = require(`../ui.js`);
const ButtonBase = require(`./button-base`);
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

        this._optionsHandler.Hook( IDS.ICON, null, ``);
        this._optionsHandler.Hook( IDS.LABEL, null, ``);
        this._optionsHandler.Hook(`uppercaseText`);

        this._icon = null;
        this._label = null;

        this._flags.Add(this, FLAGS.NO_ICON, FLAGS.NO_LABEL);

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
     */
    get icon() { return this._icon; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set icon(p_value) { this._flags.Set(FLAGS.NO_ICON, !this._icon.Set(p_value)); }

    /**
     * @description TODO
     * @type {ui.core.manipulators.Icon}
     * @customtag read-only
     */
    get label() { return this._label; }

    /**
     * @description TODO
     * @type {*}
     * @customtag write-only
     */
    set label(p_value) {  this._flags.Set(FLAGS.NO_LABEL, !this._label.Set(p_value)); }

    _Render() {
        super._Render();

        this._icon = new manipulators.Icon(u.dom.El(`div`, { class: IDS.ICON }, this._host));
        this._label = new manipulators.Text(u.dom.El(`span`, { class: IDS.LABEL }, this._host));

    }

    _CleanUp() {
        this._icon.Set(null);
        this._label.Set(null);
        super._CleanUp();
    }



}

module.exports = ButtonEx;
UI.Register(`nkmjs-button-ex`, ButtonEx);