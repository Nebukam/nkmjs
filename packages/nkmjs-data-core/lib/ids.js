'use strict';

const SIMPLEX = require(`./simplex`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
class IDS {
    constructor() { }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static AUTO_RELEASE = Object.freeze(`autoRelease`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BOUND = Object.freeze(`dataBound`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static BLOCS = Object.freeze(`__blocs`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static DATALISTS = Object.freeze(`__datalists`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SKIP_S11N = Object.freeze(`skipSerialization`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static GROUP_OTHERS = Object.freeze(`group:others`);

    //#region Search

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SEARCH_ENABLED = Object.freeze(`searchEnabled`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SEARCH_RESULTS = Object.freeze(`searchResults`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SEARCH_TERMS = Object.freeze(`searchTerms`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SEARCH_CASE_SENSITIVE = Object.freeze(`searchParamCaseSensitive`);

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    static SEARCH_EXACT_MATCH = Object.freeze(`searchParamExactMatch`);

    //#endregion

}



module.exports = IDS;