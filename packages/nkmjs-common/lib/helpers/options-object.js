'use strict';

const u = require("@nkmjs/utils");

const DisposableObjectEx = require(`../pool/disposable-object-ex`);
const OptionsHandler = require(`./options-handler`);

/**
 * An OptionObject is an extension over the DisposableObjectEx with a builtin
 * {@link common.helpers.OptionHandler}.  
 * It is a glorified Object
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof common.helpers
 */
class OptionsObject extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._options = {};
        this._optionHandler = new OptionsHandler();

    }

    /**
     * @description TODO
     * @type {common.helpers.OptionsHandler}
     */
    get optionHandler() { return this._optionHandler; }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this._optionHandler.Process(this, p_options);
    }

    // ----> Options

    /**
     * @description TODO
     * @param {object} p_options 
     */
    AppendOptions(p_options) {

        if (!this._options) { this._options = {}; }

        for (let member in p_options) {
            let value = p_options[member];
            this._options[member] = value;
        }

        this._optionHandler.Process(this, p_options, this._options);

    }

    /**
     * @description Return the option value at specified id.  
     * Return the fallback value in case no option exists.
     * @param {string} p_id 
     * @param {*} p_fallback 
     */
    GetOption(p_id, p_fallback = null) {
        if (!this._options.hasOwnProperty(p_id)) { return p_fallback; }
        return this._options[p_id];
    }

    /**
     * @description Return the option value at specified id.  
     * Return the fallback value in case no option exists.
     * @param {string} p_id 
     * @param {*} p_fallback 
     */
    GetOrSetOption(p_id, p_fallback = null, p_process = false) {
        if (!this._options.hasOwnProperty(p_id)) {
            this.SetOption(p_id, p_fallback);
            return p_fallback;
        } else {
            return this._options[p_id];
        }
    }

    /**
     * @description Set the value of the option with the specified id.
     * @param {string} p_id 
     * @param {*} p_value 
     */
    SetOption(p_id, p_value) {
        if (!this._options) { this._options = {}; }
        if(p_id in this._options && this._options[p_id] === p_value){ return; }

        //process value first so if one already exists, it can be fetched as 'previous value'
        this._optionHandler.ProcessSingle(this, p_id, p_value, this._options, true);
        this._options[p_id] = p_value;
    }

    _CleanUp() {
        this._options = {};//u.tils.DeepClear(this._options, true); //Circular bs going on
        super._CleanUp();
    }

}

module.exports = OptionsObject;