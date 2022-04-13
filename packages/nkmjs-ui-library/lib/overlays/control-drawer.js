'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

const dom = require(`../dom`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class ControlDrawer extends datacontrols.ControlView {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/drawer.css`]
    }, datacontrols.ControlView, ['css']);

    static __ppdata = (p_owner, p_data) => {

        if (u.isInstanceOf(p_data, ui.overlays.OverlayOptions)) {

            let p_options = p_data.options;
            p_owner._icon.Set(p_options);
            p_owner._title.Set(p_options);
            let altData = p_data.GetOption(`data`, p_data);
            p_owner._overlayOptions = p_data;
            return altData;

        }

        p_owner._overlayOptions = p_data;
        return p_data;
    }

    // ----> Init

    static __defaultOrientation = ui.FLAGS.VERTICAL;
    static __default_facadeTPL = dom.FacadeTitleClose;

    _Init() {
        super._Init();

        this._Bind(this._CloseRequest);

        this._closeBtn = this._pointer.Add(ui.extensions.Pointer);
        this._closeBtn.Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.RELEASE, this._CloseRequest);

        this._dataPreProcessor = this.constructor.__ppdata;

    }

    _PostInit() {
        super._PostInit();
    }


    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'display': `grid`,
                'grid-template-rows': 'max-content auto'
            },
            '.header': {
                'grid-row': '1'
            },
            '.body': {
                'grid-row': '2',
                'overflow-x': 'hidden',
                'overflow-y': 'auto',
            },
            '.icon.close': {
            }
        }, super._Style());
    }

    /**
     * @returns {Image}
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
     * @returns {Image}
     */
    get closeIcon() { return this._closeIcon; }
    /**
     * @param {*} p_value
     */
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    _Render() {

        this._header = ui.dom.El(`div`, { class: `header` }, this);
        this._body = ui.dom.El(`div`, { class: `body` }, this);

        ui.DOMTemplate.Render(this.constructor.__default_facadeTPL, this._header, {
            [ui.IDS.OWNER]: this,
            [ui.IDS.TITLE]: { [ui.IDS.CSS_CL]: `${style.FONT_FLAG.MEDIUM}` },
            closeIcon: { htitle: `Close` }
        });

        this._closeIcon.element.style[`--size`] = `var(--size-m)`;
        this._closeBtn.element = this._closeIcon.element;

        this._wrapper = this._body;

        super._Render();
    }

    // ----> DATA

    //

    _CloseRequest() {
        if (!this._isActivable) { return; }
        if (this._overlayOptions) {
            if (`Consume` in this._overlayOptions) { this._overlayOptions.Consume(); }
            this._overlayOptions = null;
        }
        //this.Broadcast(SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> Pooling

    _CleanUp() {
        this._overlayOptions = null;
        super._CleanUp();
    }



}

module.exports = ControlDrawer;
ui.Register('nkmjs-control-drawer', ControlDrawer);
