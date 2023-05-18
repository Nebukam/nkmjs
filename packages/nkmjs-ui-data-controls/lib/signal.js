'use strict';

const SIGNAL = {};

SIGNAL.META_PROPERTY_TYPE_CHANGED = Symbol(`metaPropetyTypeChanged`);
SIGNAL.SEL_SHAREDTYPE_CHANGED = Symbol(`inspectionSharedTypeChanged`);
SIGNAL.SEL_LASTTYPE_CHANGED = Symbol(`inspectionLastTypeChanged`);

module.exports = SIGNAL;