'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);

const IDS = require(`../ids`);
const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);

const View = require(`../views/view`);
const CatalogViewBuilder = require("../helpers/catalog-view-builder");
const FlagEnum = require(`../helpers/flag-enum`);
const DOMTemplate = require(`../dom-template`);
const extensions = require("../extensions");
const POINTER = require("../pointer");
const templates = require(`../templates`);

const OverlayOptions = require("./overlay-options");

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Drawer extends View {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/drawer.css`]
    }, View, ['css']);

    // ----> Init

    static __default_orientation = FLAGS.VERTICAL;
    static __default_facadeTPL = templates.FacadeTitleClose;

    _Init() {
        super._Init();

        this._Bind(this._CloseRequest);

        this._closeBtn = this._pointer.Add(extensions.Pointer);
        this._closeBtn.Hook(POINTER.MOUSE_LEFT, POINTER.RELEASE, this._CloseRequest);

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
            '.header':{
                'grid-row': '1'
            },
            '.body':{
                'grid-row': '2',
                'overflow-x':'hidden',
                'overflow-y':'auto',
            },
            '.icon.close':{
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

        this._header = u.dom.New(`div`, {class:`header`}, this);
        this._body = u.dom.New(`div`, {class:`body`}, this);

        DOMTemplate.Render(this.constructor.__default_facadeTPL, this._header, {
            [IDS.OWNER]: this,
            [IDS.TITLE]:{ [IDS.CSS_CL]:`${style.FONT_FLAG.MEDIUM}` },
            closeIcon: { htitle: `Close` }
        });

        this._closeIcon.element.style[`--size`] = `var(--size_m)`;
        this._closeBtn.element = this._closeIcon.element;

        this._wrapper = this._body;
    }

    // ----> DATA

    _PreprocessData(p_data) {
        if (u.tils.isInstanceOf(p_data, OverlayOptions)) {
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
        if(this._data){
            this._data.Consume();
        }
        //this._Broadcast(SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = Drawer;
UI.Register('nkmjs-drawer', Drawer);
