const u = require("@nkmjs/utils");
const style = require(`@nkmjs/style`);
const com = require("@nkmjs/common");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const POINTER = require("../pointer");
const Layer = require(`../views/layer`);
const extensions = require(`../extensions`);

const CONTEXT = require(`./overlay-context`);
const OverlayOptions = require(`./overlay-options`);

/**
 * @description TODO
 */
class Overlay extends Layer {
    constructor() { super(); }

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

        this._closeBg = this._pointer.Add(extensions.PointerStatic);
        this._closeBg.Hook(POINTER.MOUSE_LEFT, POINTER.RELEASE, this._Bind(this._CloseRequest));

        this._options = null;
        this._distribute = new com.helpers.OptionsDistribute(
            this._Bind(this._OnOptionsUpdated),
            this._Bind(this._OnOptionsWillUpdate));

        this._distribute
            .To(`orientation`)
            .To(`placement`, `contentPlacement`, this.constructor.__default_contentPlacement)
            .To(`flavor`, `contentFlavor`);

    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'transform': 'translateX(-100%)', // YES this is a terrible hack
                'transition': 'transform 0s linear',
                'z-index':'10', // Modals are 100.
            },
            '.bg': {
                '@': [`layer`], // absolute, 0,0 100% 100% box-sizing border-box
                'transform': 'translateY(-100%)',
                'transition': 'transform 0s linear'
            }
        }, super._Style());
    }

    _Render() {
        super._Render();
        this._bg = dom.El(`div`, { class: `bg` }, this);
        this._closeBg.element = this._bg;
    }

    // ----> Options

    get options() { return this._options; }
    set options(p_value) {
        if (this._options == p_value || !p_value) { return; }
        this._options = p_value;
        this._distribute.Update(this, p_value);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
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
    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {

    }

    // ----> Data Management

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        if (this._content) {
            this._content.classList.remove(FLAGS.SHOWN);
            this._content.style.removeProperty(`transform`);
            if (this._content._flags) { this._content._flags.Set(FLAGS.SHOWN, false); }
            this._content.Release();
            this._content = null;
        }

        if (!this._data) { return; }


        if (!u.isInstanceOf(this._data, OverlayOptions)) {
            throw new Error(`Overlay expect data of type OverlayOptions, got ${this._data.constructor.name} instead.`);
        }

        let contentData = this._ExtractData(this._data),
            contentClass = this._FindContentClass(this._data, contentData);

        if (!contentClass) {
            throw new Error(`Invalid overlay contentClass : ${contentClass}`);
        }

        this._content = this.Add(contentClass, 'content');
        this._content.classList.add(FLAGS.SHOWN);
        this._content.style.setProperty(`transform`, `translateX(0%)`);

        if (this._content._flags) { this._content._flags.Set(FLAGS.SHOWN, true); }
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
    
    _OnDisplayGain() { 
        super._OnDisplayGain();
        this.style.setProperty(`transform`, `translateX(0%)`);
        this._bg.style.setProperty(`transform`, `translateY(0%)`);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.overlays.OverlayOptions} p_data 
     */
    _OnDataConsumed(p_data) {

    }

    _CleanUp() {
        this.style.removeProperty(`transform`);
        this._bg.style.removeProperty(`transform`);
        super._CleanUp();
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);