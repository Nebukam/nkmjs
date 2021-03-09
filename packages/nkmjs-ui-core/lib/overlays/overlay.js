const { U, UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { BINDINGS, SIGNAL, OptionsHandler } = require(`@nkmjs/common`);

const UI = require(`../ui`);
const Layer = require(`../views/layer`);

const OVERLAY_CONTEXT = require("./overlay-context");
const OverlayOptions = require(`./overlay-options`);



/**
 * @description TODO
 */
class Overlay extends Layer {
    constructor() { super(); }

    static __default_overlayContentClass = null;

    _Init() {
        super._Init();
        this._background = null;
        this._content = null;

        this._dataObserver.Hook(SIGNAL.CONSUMED, this._Bind(this._OnDataConsumed));

        this._options = null;
        this._optionsHandler = new OptionsHandler(this._Bind(this._OnOptionsProcessed), this._Bind(this._OnOptionsWillUpdate));
        this._optionsHandler.Hook(`placement`, `contentPlacement`);
        this._optionsHandler.Hook(`flavor`, `contentFlavor`);
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            '.bg': {
                'position': `absolute`, // TODO : Update with blocking overlay css preset
                'top': `0px`,
                'left': `0px`,
                'width': `100%`,
                'height': `100%`
            }
        }, super._Style());
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

    set contentPlacement(p_value) { if (`placement` in this._content) { this._content.placement = p_value; } }
    set contentFlavor(p_value) { if (`flavor` in this._content) { this._content.flavor = p_value; } }

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
        this._content.data = this._data;

        // Feed data as options once the content is ready
        this.options = this._data;

    }

    _OnDataConsumed(p_data) {

    }

    _Render() {
        this._background = UDOM.New(`div`, { class: `bg` }, this._host);
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);