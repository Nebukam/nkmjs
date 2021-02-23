'use strict';

const { U } = require(`@nkmjs/utils`);
const POOL = require("../pool/pool");
const Filter = require(`./filter`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.filters.Filter
 * @memberof common.filters
 */
class FilterBox extends Filter {

    constructor() { super(); }

    _Init(){
        super._Init();
        this._filters = new Array(0);
    }

    /**
     * @description TODO
     * @param {common.filters.Filter} p_filter 
     * @param {object} [p_filterOptions]
     */
    Add( p_filter, p_filterOptions = null ){

        if(U.isFunc(p_filter)){
            p_filter = POOL.Rent(p_filter);
            if(p_filterOptions){
                for(let key in p_filterOptions){ p_filter[key] = p_filterOptions[key]; }
            }
            this._filters.push(p_filter);
            this._Reorder();
            return p_filter;
        }

        if(this._filters.includes(p_filter)){ return null; }

        this._filters.push(p_filter);
        this._Reorder();
        return p_filter;
    }

    _Reorder(){
        // Put loop-breaking filters at the top of the list
    }

    /**
     * @description TODO
     * @param {*} p_obj 
     */
    Check(p_obj){
        return true;
    }

}

module.exports = FilterBox;