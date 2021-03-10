const { U, UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { NFOS } = require(`@nkmjs/common`);
const { BINDINGS, SIGNAL, OptionsHandler } = require(`@nkmjs/common`);

const UI = require(`../ui`);
const UI_FLAG = require(`../ui-flag`);
const Layer = require(`../views/layer`);

const OVERLAY_CONTEXT = require("./overlay-context");
const OverlayOptions = require(`./overlay-options`);
const ExtAnimController = require(`../extensions/ext-anim-controller`);



/**
 * @description TODO
 */
class Overlay extends Layer {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/views/overlay.css`]
    }, Layer, ['css']);

    static __default_overlayContentClass = null;
    static __default_contentPlacement = null;

    _Init() {
        super._Init();
        this._background = null;
        this._content = null;
        this._contentPlacement = null;

        this._dataObserver.Hook(SIGNAL.CONSUMED, this._Bind(this._OnDataConsumed));
        this._transitions = new ExtAnimController();

        this._options = null;
        this._optionsHandler = new OptionsHandler(this._Bind(this._OnOptionsProcessed), this._Bind(this._OnOptionsWillUpdate));
        this._optionsHandler.Hook(`orientation`);
        this._optionsHandler.Hook(`placement`, `contentPlacement`, this.constructor.__default_contentPlacement);
        this._optionsHandler.Hook(`flavor`, `contentFlavor`);
    }

    // ----> DOM

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
        console.log(p_options);
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

        let simplified = UI_FLAG.SimplifyPlacement(
            p_value,
            this._orientation.currentFlag == UI_FLAG.VERTICAL ? true : false);

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

        if (!U.isInstanceOf(this._data, OverlayOptions)) {
            throw new Error(`Overlay expect data of type OverlayOptions, got ${this._data.constructor.name} instead.`);
        }

        let fallbackContentClass = BINDINGS.Get(
            OVERLAY_CONTEXT.DEFAULT_CONTENT,
            this._data.request.requestType,
            this.constructor.__default_overlayContentClass);

        let contentClass = this._data.GetOption(`contentClass`, fallbackContentClass);

        if (!contentClass) {
            throw new Error(`Invalid overlay contentClass : ${contentClass}`);
        }

        this._content = this.Add(contentClass, 'content');
        this._content.data = this._ExtractData(this._data);

        // Feed data as options once the content is ready
        this.options = this._data.options;

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

    DisplayGranted(){
        super.DisplayGranted();
        this.classList.add(UI_FLAG.SHOWN);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.overlays.OverlayOptions} p_data 
     */
    _OnDataConsumed(p_data) {

    }

    _CleanUp(){
        this.classList.remove(UI_FLAG.SHOWN);
        super._CleanUp();
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);