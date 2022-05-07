
'use strict';

const collections = require("@nkmjs/collections");

const CatalogFilter = require(`./catalog-filter`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class FilterByTag extends CatalogFilter {
    constructor() {
        super();

        this._tags = new collections.List();
        this._tagArray = this._tags.internalArray;

        this._Bind(this._PassAny);
        this._Bind(this._PassAll);

        this.Pass = this.__PassAny;

    }

    get any() { return this.Pass == this._PassAny; }
    set any(p_value) {
        if (p_value) { this.Pass = this._PassAny; }
        else { this.Pass = this.__PassAll; }
    }

    _PassAny(p_item) { return p_item.HasTagAny(...this._tagArray); }
    _PassAll(p_item) { return p_item.HasTagAll(...this._tagArray); }

}

module.exports = FilterByTag;