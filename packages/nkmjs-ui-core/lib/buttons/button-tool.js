'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const IDS = require(`../ids`);
const UI = require(`../ui.js`);
const ButtonBase = require(`./button-base`);
const manipulators = require("../manipulators");

/**
 * @description A tool button is a simple button with an icon.
 * @class
 * @hideconstructor
 * @augments ui.core.buttons.ButtonBase
 * @memberof ui.core.buttons
 */
class ToolButton extends ButtonBase {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/button-tool.css`]
    }, ButtonBase, ['css']);

    _Init() {

        super._Init();

        this._optionsHandler.Hook(IDS.ICON, null, ``);
        
        this._icon = null;

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
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

    _Render() {
        super._Render();
        this._icon = new manipulators.Icon(u.dom.New(`div`, { class: IDS.ICON }, this._host), false);
    }

    _PostRender(){
        this._icon.Set(null);
    }

    _CleanUp() {
        this._icon.Set(null);
        super._CleanUp();
    }



}

module.exports = ToolButton;
UI.Register(`nkmjs-tool-button`, ToolButton);