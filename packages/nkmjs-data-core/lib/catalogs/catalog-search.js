'use strict'

const com = require("@nkmjs/common");

/**
 * @description A Catalog selection is a catalog which item belong to other catalogs.
 * as such it does not own items internally, nor releases them
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core.catalog
 */
class CatalogSearch extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._searchResult = new CatalogSearch();
        this._sourceCatalog = null;
    }

}

module.exports = CatalogSearch;