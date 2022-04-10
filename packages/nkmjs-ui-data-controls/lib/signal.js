'use strict';

class SIGNAL { constructor() { } 

    static META_PROPERTY_TYPE_CHANGED = Symbol(`metaPropetyTypeChanged`);

    static SELECTION_SHAREDTYPE_CHANGED = Symbol(`inspectionSharedTypeChanged`);

    static SELECTION_LASTTYPE_CHANGED = Symbol(`inspectionLastTypeChanged`);

}

module.exports = SIGNAL;