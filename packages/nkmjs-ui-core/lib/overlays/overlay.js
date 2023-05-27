const u = require("@nkmjs/utils");
const style = require(`@nkmjs/style`);
const com = require("@nkmjs/common");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const POINTER = require("../pointer");
const Layer = require(`../views/layer`);
const extensions = require(`../extensions`);

const CTX = require(`./overlay-context`);
const OverlayOptions = require(`./overlay-options`);

const base = Layer;

/**
 * @description TODO
 */
class Overlay extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/overlay.css`]
    }, base, ['css']);

    static __closeOnBgClick = false;
    static __default_overlayContentClass = null;
    static __default_contentPlacement = null;
    static __content_context = CTX.CONTENT;
    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate`, wrapUpFn: `_OnOptionsUpdated` })
        .To(`orientation`)
        .To(`placement`, `contentPlacement`, null, `__default_contentPlacement`)
        .To(`flavor`, `contentFlavor`);

    _Init() {

        super._Init();

        this._background = null;
        this._content = null;
        this._contentPlacement = null;

        this._dataObserver.Hook(com.SIGNAL.CONSUMED, this._Bind(this._OnDataConsumed));
        this._transitions = new extensions.AnimController();

        if (this.constructor.__closeOnBgClick) {
            this._closeBg = this._pointer.Add(extensions.PointerStatic);
            this._closeBg.Hook(POINTER.KEYS.MOUSE_LEFT, POINTER.KEYS.RELEASE, this._Bind(this.RequestClose));
        }

        this._options = null;
        this._lastContent = null;

        this._delayedRelease = com.DelayedCall(() => {
            if (this._lastContent) {
                this._lastContent.Release();
                this._lastContent = null;
            }
            super.Release();
        }, 500);

    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                'transform': 'translateX(-100%)', // YES this is a terrible hack
                'transition': 'transform 0s linear',
                'z-index': '10', // Modals are 100.
            },
            ':host(:not(.shown))': { 'pointer-events': 'none !important', },
            '.bg': {
                ...style.rules.layer,
                'transform': 'translateY(-100%)',
                'transition': 'transform 0s linear'
            },
            '.content': {
                ...style.flexItem.shrink,
                'max-width': `100%`,
                'max-height': `100%`,
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._bg = dom.El(`div`, { class: `bg` }, this);
        if (this._closeBg) { this._closeBg.element = this._bg; }
    }

    // ----> Options

    get options() { return this._options; }
    set options(p_value) {
        if (this._options == p_value || !p_value) { return; }
        this._options = p_value;
        this.constructor.__distribute.Update(this, p_value);
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
            dom.CSSClass(this, `content-${this._contentPlacement}`, false);
        }

        let simplified = FLAGS.SimplifyPlacement(
            p_value,
            this.orientation == FLAGS.VERTICAL);

        if (simplified) {
            this._contentPlacement = simplified;
            dom.CSSClass(this, `content-${this._contentPlacement}`);
        }

        this._content.placement = simplified;

    }

    /**
     * @description TODO
     * @type {string}
     */
    set contentFlavor(p_value) { this._content.flavor = p_value; }

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

            dom.CSSClass(this._content, FLAGS.SHOWN, false);
            if (this._content._flags) { this._content._flags.Set(FLAGS.SHOWN, false); }
            //this._content.Release();
            this._lastContent = this._content;
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

        this._content = this.Attach(contentClass, 'content');
        this._data.currentContent = this._content;

        dom.CSSClass(this._content, FLAGS.SHOWN);
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
            contentClass = com.GetBinding(
                CTX.CONTENT,
                p_overlayData.request.requestType,
                null);

            // Fall back to contentData association if any
            if (p_contentData && !contentClass) {
                contentClass = com.GetBinding(
                    CTX.CONTENT,
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

    RequestClose() {
        this.DisplayLost();
        this._content.RequestClose?.();
    }

    _OnDisplayLost() {
        super._OnDisplayLost();
        this._content?.DisplayLost?.();
    }

    _OnDisplayGain() {
        super._OnDisplayGain();
        dom.CSS(this, `transform`, `translateX(0%)`);
        dom.CSS(this._bg, `transform`, `translateY(0%)`);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.overlays.OverlayOptions} p_data 
     */
    _OnDataConsumed(p_data) {

    }

    Release() {
        this._lastContent = this._content;
        this.RequestClose();
        this._delayedRelease.Schedule();
    }

    _CleanUp() {
        dom.CSS(this, 'transform');
        dom.CSS(this._bg, 'transform');
        super._CleanUp();
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);