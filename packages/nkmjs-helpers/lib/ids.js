'use strict';

const nkm = require(`@nkmjs/core`);
const TYPES = nkm.data.TYPES;

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

}

//#region Search descriptors

nkm.data.RegisterDescriptors({

    [IDS.SEARCH_ENABLED]: {
        valueType: TYPES.BOOLEAN,
        label: `Search`,
        inputOptions: { placeholder: `...`, size: nkm.ui.FLAGS.SIZE_XS },
        desc: `Enable filter within current glyph selection.\nSeparate terms with an empty space.\nNote : search can impact responsiveness.`
    },

    [IDS.SEARCH_TERMS]: {
        recompute: true,
        valueType: TYPES.TEXT_SEARCH,
        label: `Search`,
        inputOptions: { placeholder: `a b c square...`, changeOnInput: true, submitOnChange: true, },
        desc: `Search for characters within Unicode.\nSeparate search terms with a space.`
    },

    [IDS.SEARCH_CASE_SENSITIVE]: {
        recompute: true,
        valueType: TYPES.BOOLEAN_CHECK,
        label: `Insensitive`,
        inputOptions: { placeholder: `...`, size: nkm.ui.FLAGS.SIZE_XS },
        desc: `Broad search doesn't care whether the case is uppercase or lowercase.`
    },

    [IDS.SEARCH_EXACT_MATCH]: {
        recompute: true,
        valueType: TYPES.BOOLEAN_CHECK,
        label: `Exact Match`,
        inputOptions: { placeholder: `...`, size: nkm.ui.FLAGS.SIZE_XS },
        desc: `Show only the results that have an exact match.`
    }

});

//#endregion

module.exports = IDS;