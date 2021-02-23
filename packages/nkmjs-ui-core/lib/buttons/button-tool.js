'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS } = require("@nkmjs/common");
const { CSS } = require("@nkmjs/style");

const UI_FLAG = require(`../ui-flag`);
const UI_ID = require(`../ui-id`);
const UI = require(`../ui.js`);
const ButtonBase = require(`../button-base`);
const ImageManipulator = require("../manipulators/manipulator-image");

/**
 * @description A tool button is a simple button with an icon.
 * @class
 * @hideconstructor
 * @augments ui.core.buttons.ButtonBase
 * @memberof ui.core.buttons
 */
class ToolButton extends ButtonBase {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/buttons/button-tool.css`]
    }, ButtonBase, ['css']);

    _Init() {

        super._Init();

        this._optionsHandler.Hook(UI_ID.ICON, null, ``);
        
        this._icon = null;

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
    }

    // ----> DOM
    
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

    _Render() {
        super._Render();
        this._icon = new ImageManipulator(UDOM.New(`span`, { class: UI_ID.ICON }, this._host), false);
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