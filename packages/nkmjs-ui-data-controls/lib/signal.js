'use strict';

class SIGNAL { constructor() { } 

    static META_PROPERTY_TYPE_CHANGED = Symbol(`metaPropetyTypeChanged`);

    static SEL_SHAREDTYPE_CHANGED = Symbol(`inspectionSharedTypeChanged`);

    static SEL_LASTTYPE_CHANGED = Symbol(`inspectionLastTypeChanged`);

}

module.exports = SIGNAL;