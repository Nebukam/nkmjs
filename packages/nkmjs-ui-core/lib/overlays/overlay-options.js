const { U } = require(`@nkmjs/utils`);
const { COM_ID, SIGNAL, COMMON_FLAG, DisposableObjectEx, OptionsHandler } = require(`@nkmjs/common`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof dialog
 */
class OverlayOptions extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._optionsHandler = new OptionsHandler();
        this._optionsHandler.Hook(`overlayClass`, `_overlayClass`);
        this._optionsHandler.Hook(`contentClass`, `_contentClass`);
        this._optionsHandler.Hook(`origin`, `_origin`);
    }

    _PostInit(){
        super._PostInit();
        this._Reset();
    }

    _Reset() {
        this._overlayClass = null;
        this._contentClass = null;
        this._origin = null;
        this._request = null;
        this._consumed = false;
    }

    /**
     * @description TODO
     * @type {object}
     */
     get options() { return this._options; }
     set options(p_value) {
 
         this._options = p_value;
         this._optionsHandler.Process(this, p_value);
 
         //TODO : Add support for custom popup content request
         // = when displaying popup, callback to some function providing both dialog & dialog info
 
         this._Broadcast(SIGNAL.UPDATED, this);
 
     }

    /**
     * @description The overlay class to be instanciated by the OverlayHandler
     * @type {*}
     */
    get overlayClass() { return this._overlayClass; }
    set overlayClass(p_value) { this._overlayClass = p_value; }

    /**
     * @description The content class to be instanciated by the overlay
     * @type {*}
     */
     get contentClass() { return this._contentClass; }
     set contentClass(p_value) { this._contentClass = p_value; }

    /**
     * @description The origin of the overlay request that created this OverlayInfos
     * @type {*}
     */
    get origin() { return this._origin; }
    set origin(p_value) { this._origin = p_value; }

    get request() { return this._request; }
    set request(p_value) { this._request = p_value; }

    /**
     * @description TODO
     * @param {string} p_id 
     * @param {*} [p_fallback] 
     */
    GetOption(p_id, p_fallback) {
        return U.Get(this._options, p_id, p_fallback);
    }

    /**
     * @description Consume the current options -- signifying listeners that
     * the related overlay has been consumed (usually means closed)
     */
    Consume() {
        if (this._consumed) { return; }
        this._consumed = true;
        this._Broadcast(SIGNAL.CONSUMED, this);
    }

    _CleanUp() {
        this._Reset();
        super._CleanUp();
    }

    toString() {
        return `<? ${this._title} : ${this._message} />`;
    }
}

module.exports = OverlayOptions;