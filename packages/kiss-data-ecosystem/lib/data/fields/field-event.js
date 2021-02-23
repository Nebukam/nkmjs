'use strict';

class FIELD_EVENT{
    constructor() {}

    static FIELD_ADDED = Symbol(`fieldAdded`);
    static FIELD_REMOVED = Symbol(`fieldRemoved`);
    static FIELD_RENAMED = Symbol(`fieldRenamed`);
    static FIELD_UPDATED = Symbol(`fieldUpdated`);
    static FIELD_CLASS_CHANGED = Symbol(`fieldClassChanged`);

}

module.exports = FIELD_EVENT;