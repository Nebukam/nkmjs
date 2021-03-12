'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { DataBlock } = require(`@nkmjs/data-core`);

const DOCUMENT_CONTEXT = require(`./document-context`);

/**
 * Helper class that hold windows data and help sort out ipcMessaging between windows
 * @class
 * @hideconstructor
 * @augments common.helper.SingletonEx
 * @memberof documents
 */
class DOCUMENTS extends com.helpers.SingletonEx {

    constructor() { super(); }

    _Init() {

    }

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */
    static Get(p_options) { return this.instance._Get(p_options); }

    /**
     * @access private
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */
    _Get(p_options) {

        let document, data, path;
        // First, check if data is set. If so, it should drive the type of document (if not set)
        data = u.tils.Get(p_options, `data`, null);
        document = u.tils.Get(p_options, `document`, null);
        path = u.tils.Get(p_options, `path`, null);

        if (data && !document) { document = com.BINDINGS.Get(DOCUMENT_CONTEXT.DOCUMENT, data, null); }
        if (!document) { throw new Error(`Not enough options set to create a new document.`); }

        document = com.pool.POOL.Rent(document);
        if (path) { document.currentPath = path; }

        if (data) {
            if (u.tils.isFunc(data)) { data = com.pool.POOL.Rent(data); }
            document.currentData = data;
        }

        return document;

    }


}

module.exports = DOCUMENTS;