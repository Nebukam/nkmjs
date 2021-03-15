const u = require("@nkmjs/utils");
const { CSS } = require(`@nkmjs/style`);
const com = require("@nkmjs/common");

const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const MOUSE = require("../mouse");
const Layer = require(`../views/layer`);
const extensions = require(`../extensions`);

const CONTEXT = require(`./overlay-context`);
const OverlayOptions = require(`./overlay-options`);

/**
 * @description TODO
 */
class Overlay extends Layer {
    constructor() { super(); }

    static __usePaintCallback = true;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/overlay.css`]
    }, Layer, ['css']);

    static __default_overlayContentClass = null;
    static __default_contentPlacement = null;
    static __content_context = CONTEXT.CONTENT;

    _Init() {

        super._Init();
        
        this._background = null;
        this._content = null;
        this._contentPlacement = null;

        this._dataObserver.Hook(com.SIGNAL.CONSUMED, this._Bind(this._OnDataConsumed));
        this._transitions = new extensions.AnimController();

        this._closeBg = this._interactions.Add(extensions.Mouse);
        this._closeBg.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE, this._Bind(this._CloseRequest));

        this._options = null;
        this._optionsHandler = new com.helpers.OptionsHandler(this._Bind(this._OnOptionsProcessed), this._Bind(this._OnOptionsWillUpdate));
        this._optionsHandler.Hook(`orientation`);
        this._optionsHandler.Hook(`placement`, `contentPlacement`, this.constructor.__default_contentPlacement);
        this._optionsHandler.Hook(`flavor`, `contentFlavor`);

    }

    // ----> DOM

    _OnPaintChange() {
        // This is to make sure the background slides in and recieve mouse events
        // when an overlay is created for the first time
        super._OnPaintChange();
        if (this._isPainted) {
            this.style.setProperty(`transform`, `translateX(0%)`);
        }else{
            this.style.removeProperty(`transform`);
        }
    }

    _Style() {
        return CSS.Extends({
            ':host':{
                'transform': 'translateX(-100%)',
                'transition': 'transform 0s linear'
            },
            '.bg': {
                '@': [`layer`], // absolute, 0,0 100% 100% box-sizing border-box
            }
        }, super._Style());
    }

    _Render() {
        super._Render();
        this.style.setProperty(`--__click_offset`, `0%`);
        this._bg = u.dom.New(`div`, { class: `bg` }, this);
        this._closeBg.element = this._bg;
    }

    // ----> Options

    get options() { return this._options; }
    set options(p_value) {
        if (this._options == p_value || !p_value) { return; }
        this._options = p_value;
        this._optionsHandler.Process(this, p_value);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options) {
        if (!p_options) { return; }
        // At that point, this._overlayContent exists and is initialized
    }

    /**
     * @description TODO
     * @type {string}
     */
    set contentPlacement(p_value) {

        if (this._contentPlacement) {
            this.classList.remove(`content-${this._contentPlacement}`);
        }

        let simplified = FLAGS.SimplifyPlacement(
            p_value,
            this._orientation.currentFlag == FLAGS.VERTICAL ? true : false);

        if (simplified) {
            this._contentPlacement = simplified;
            this.classList.add(`content-${this._contentPlacement}`);
        }

        if (`placement` in this._content) {
            this._content.placement = simplified;
        }
    }

    /**
     * @description TODO
     * @type {string}
     */
    set contentFlavor(p_value) {
        if (`flavor` in this._content) { this._content.flavor = p_value; }
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_options 
     */
    _OnOptionsProcessed(p_options) {

    }

    // ----> Data Management

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        if (this._content) {
            this._content.Release();
            this._content = null;
        }

        if (!this._data) { return; }

        if (!u.tils.isInstanceOf(this._data, OverlayOptions)) {
            throw new Error(`Overlay expect data of type OverlayOptions, got ${this._data.constructor.name} instead.`);
        }

        let contentData = this._ExtractData(this._data),
            contentClass = this._FindContentClass(this._data, contentData);

        if (!contentClass) {
            throw new Error(`Invalid overlay contentClass : ${contentClass}`);
        }

        this._content = this.Add(contentClass, 'content');
        this._content.data = contentData;

        // Feed data as options once the content is ready
        this.options = this._data.options;

    }

    _FindContentClass(p_overlayData, p_contentData) {

        let contentClass = p_overlayData.GetOption(`contentClass`, null);

        // In case there is no user-defined content class
        // look for a default one
        if (!contentClass) {

            // First, check if any content is bound to the requestType
            contentClass = com.BINDINGS.Get(
                CONTEXT.CONTENT,
                p_overlayData.request.requestType,
                null);

            // Fall back to contentData association if any
            if (p_contentData && !contentClass) {
                contentClass = com.BINDINGS.Get(
                    CONTEXT.CONTENT,
                    p_contentData,
                    null);
            }

            // Fall back to static default
            if (!contentClass) {
                contentClass = this.constructor.__default_overlayContentClass;
            }
        }

        // Override with any user-defined contentClass.
        return contentClass;
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.overlays.OverlayOptions} p_overlayOptions 
     * @returns 
     * @customtag override-me
     */
    _ExtractData(p_overlayOptions) {
        return p_overlayOptions;
    }

    _CloseRequest() {
        if (`_CloseRequest` in this._content) { this._content._CloseRequest(); }
    }

    DisplayGranted() {
        super.DisplayGranted();
        this.classList.add(FLAGS.SHOWN);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.overlays.OverlayOptions} p_data 
     */
    _OnDataConsumed(p_data) {

    }

    _CleanUp() {
        this.classList.remove(FLAGS.SHOWN);
        super._CleanUp();
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);