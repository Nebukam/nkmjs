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
        this._content = new Array(0);

        this._optionsHandler = new OptionsHandler();
        this._optionsHandler.Hook(`origin`, `_origin`);
        this._optionsHandler.Hook(COM_ID.TITLE, `_title`);
        this._optionsHandler.Hook(COM_ID.MESSAGE, `_message`);
        this._optionsHandler.Hook(`type`, `_type`);
        this._optionsHandler.Hook(`dialogClass`, `_dialogClass`);
        this._optionsHandler.Hook(`primary`, `_primary`);
        this._optionsHandler.Hook(`secondary`, `_secondary`);
        this._optionsHandler.Hook(`content`);
        this._optionsHandler.Hook(`actions`);

        this._Reset();

    }

    _Reset() {

        this._origin = null;
        this._title = ``;
        this._message = ``;
        this._type = ``;

        this._dialogClass = null;
        this._primary = null;
        this._secondary = null;

        this._consumed = false;
        this._inputClass = null;

        this._actions.length = 0;
        this._content.length = 0;

    }

    /**
     * @description TODO
     * @type {*}
     */
    get origin() { return this._origin; }
    set origin(p_value) { this._origin = p_value; }

    /**
     * @description TODO
     * @type {string}
     */
    get title() { return this._title; } F
    set title(p_value) { this._title = p_value; }

    /**
     * @description TODO
     * @type {string}
     */
    get message() { return this._message; }
    set message(p_value) { this._message = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get type() { return this._type; }
    set type(p_value) { this._type = p_value; }

    /**
     * @description TODO
     * @type {function}
     */
    get dialogClass() { return this._dialogClass; }
    set dialogClass(p_value) { this._dialogClass = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get primary() { return this._primary; }
    set primary(p_value) { this._primary = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get secondary() { return this._secondary; }
    set secondary(p_value) { this._secondary = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get content() { return this._content; }
    set content(p_value) {
        if (this._content === p_value) { return; }
        if (!p_value) { this._content.length = 0; return; }
        for (let i = 0, n = p_value.length; i < n; i++) {
            this._content.push(p_value[i]);
        }
    }

    /**
     * @description TODO
     * @type {array}
     */
    get actions() { return this._actions; }
    set actions(p_value) {
        if (this._actions === p_value) { return; }
        if (!p_value) { this._actions.length = 0; return; }
        this._primary = null;
        this._secondary = null;
        for (let i = 0, n = p_value.length; i < n; i++) {
            let action = p_value[i];
            this._actions.push(action);
            if (i === 0) { this._primary = action; }
            else if (i === 1) { this._secondary = action; }
        }
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