const { U } = require(`@nkmjs/utils`);
const { COM_ID, SIGNAL, COMMON_FLAG, DisposableObjectEx, OptionsHandler } = require(`@nkmjs/common`);

const DIALOG_SIGNAL = require(`./dialog-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof dialog
 */
class DialogInfos extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._actions = new Array(0);
        this._optionsHandler = new OptionsHandler();
        this._optionsHandler.Hook(`origin`, `_origin`);

        this._Reset();

    }

    _Reset() {
        this._origin = null;
        this._consumed = false;
    }

    /**
     * @description TODO
     * @type {*}
     */
    get origin() { return this._origin; }
    set origin(p_value) { this._origin = p_value; }

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
     * @description TODO
     * @param {string} p_id 
     * @param {*} [p_fallback] 
     */
    GetOption(p_id, p_fallback) {
        return U.Get(this._options, p_id, p_fallback);
    }

    /**
     * @description TODO
     */
    Consume() {
        if (this._consumed) { return; }
        this._consumed = true;
        this._Broadcast(DIALOG_SIGNAL.CONSUMED, this);
    }

    _CleanUp() {
        this._Reset();
        super._CleanUp();
    }

    toString() {
        return `<? ${this._title} : ${this._message} />`;
    }
}

module.exports = DialogInfos;