
'use strict';

const collections = require(`@nkmjs/collections`);
const u = require("@nkmjs/utils");

/**
 * @description TODO
 * @class
 * @memberof common.helpers
 */
class StateBase {

    constructor() {
        this._id = ``;
        this._data = null;
    }

    /**
     * State id
     * @type {string}
     */
    get id() { return this._id; }
    /**
     * State data
     * @type {object}
     */
    get data() { return this._data; }

    /**
     * Get or create a state with a given id and data
     * @param {string} p_stateId 
     * @param {object} p_data 
     * @returns {StateBase} Requested state
     */
    static GetOrCreate(p_stateId, p_data = null) {
        if (u.isVoid(this._stateMap)) { this._stateMap = new collections.Dictionary(); }
        let state = this._stateMap.Get(p_stateId);
        if (u.isVoid(state)) {
            state = new this();
            state._id = p_stateId;
            state._data = p_data;
            this._stateMap.Set(p_stateId, state);
        }
        return state;
    }

    toString(){ return this._id; }

}

module.exports = StateBase;

/* State Class Example

const _state_a_opts = {};
const _state_b_opts = {};

class MyState extends StateBase{
    constructor(){ super(); }

    static get STATE_A(){ return MyState.GetOrCreate(`state_a`, _state_a_opts); }
    static get STATE_B(){ return MyState.GetOrCreate(`state_b`, _state_b_opts); }

}

module.exports = MyState;

*/