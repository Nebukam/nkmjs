'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS, SIGNAL } = require(`@nkmjs/common`);
const { CatalogItem } = require(`@nkmjs/data-core`);
const { CSS, FONT_FLAG } = require(`@nkmjs/style`);

const UI_ID = require(`../ui-id`);
const UI = require(`../ui`);
const UI_SIGNAL = require(`../ui-signal`);
const UI_FLAG = require(`../ui-flag`);

const View = require(`../views/view`);
const CatalogViewBuilder = require("../helpers/catalog-view-builder");
const FlagEnum = require(`../helpers/flag-enum`);
const { OverlayOptions } = require("../overlays");
const DOMTemplate = require(`../dom-template`);
const { ExtMouse } = require("../extensions");
const MOUSE = require("../mouse");

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Drawer extends View {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/views/drawer.css`]
    }, View, ['css']);

    // ----> Init

    static __default_orientation = UI_FLAG.VERTICAL;
    static __default_facadeTPL = require(`../templates`).TPLFacadeTitleClose;

    _Init() {
        super._Init();

        this._Bind(this._CloseRequest);

        this._closeBtn = this._interactions.Add(ExtMouse);
        this._closeBtn.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE, this._CloseRequest);

    }

    _PostInit() {
        super._PostInit();
    }


    // ----> DOM

    _Style() {
        return CSS.Extends({
            ':host': { 

            }
        }, super._Style());
    }

    /**
     * @returns {ImageManipulator}
     */
    get icon() { return this._icon; }
    /**
     * @param {*} p_value
     */
    set icon(p_value) { this._icon.Set(p_value); }

    /**
     * @returns {TextManipulator}
     */
    get title() { return this._title; }
    /**
     * @param {string} p_value
     */
    set title(p_value) { this._title.Set(p_value); }

    /**
     * @returns {ImageManipulator}
     */
    get closeIcon() { return this._closeIcon; }
    /**
     * @param {*} p_value
     */
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    _Render() {
        super._Render();
        DOMTemplate.Render(this.constructor.__default_facadeTPL, this, {
            [UI_ID.OWNER]: this,
            [UI_ID.TITLE]:{ [UI_ID.CSS_CL]:`${FONT_FLAG.MEDIUM}` },
            closeIcon: { htitle: `Close` }
        });
    }

    // ----> DATA

    _PreprocessData(p_data) {
        if (U.isInstanceOf(p_data, OverlayOptions)) {
            let p_options = p_data.options;
            this._icon.Set(p_options);
            this._title.Set(p_options);
            return p_data.GetOption(`data`, p_data);
        }

        return p_data;
    }

    //

    _CloseRequest() {
        if (!this._isActivable) { return; }
        this._Broadcast(UI_SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = Drawer;
UI.Register('nkmjs-drawer', Drawer);
