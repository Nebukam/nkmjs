'use strict';

const com = require("@nkmjs/common");

/**
 * SERIALIZER Context
 * @class
 * @memberof data.core.serialization
 */
class SERIALIZER extends com.CSYMBOL{ constructor() { super(); } }

/**
 * SERIALIZER Context
 * @class
 * @memberof data.core.serialization
 */
class NONE extends com.CSYMBOL{ constructor() { super(); } }

/**
 * SERIALIZER Context
 * @class
 * @memberof data.core.serialization
 */
class TEXT extends com.CSYMBOL{ constructor() { super(); } }

/**
 * JSON Context
 * @class
 * @memberof data.core.serialization
 */
class JSON extends com.CSYMBOL{ constructor() { super(); }
    /**
     * @description Expected JSON Keyword in serialized JSON data
     * @type {string}
     * @customtag read-only
     */
    static META_KEY = 'meta';

    /**
     * @description Expected JSON Keyword in serialized JSON data
     * @type {string}
     * @customtag read-only
     */
    static DATA_KEY = 'data';

    /**
     * @description Expected JSON Keyword in serialized JSON data
     * @type {string}
     * @customtag read-only
     */
    static ERRORS_KEY = 'errors';

    /**
     * @description NKMjs JSON Identifier for storing class string identifier
     * @type {string}
     * @customtag read-only
     */
    static CONSTRUCTOR = 'constructor';

    /**
     * @description NKMjs JSON Identifier for storing class string identifier
     * @type {string}
     * @customtag read-only
     */
     static UID = com.IDS.UID;
}

module.exports = {
    SERIALIZER: SERIALIZER,
    NONE: NONE,
    TEXT: TEXT,
    JSON: JSON
};