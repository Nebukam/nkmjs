'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
class IO_SIGNAL{
    constructor() {}

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Registry
     */
    static RSC_REGISTERED = Symbol(`rscRegistered`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Registry
     */
    static RSC_UNREGISTERED = Symbol(`rscUnregistered`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    static READ_START = Symbol(`readStart`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    static READ_ERROR = Symbol(`readError`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    static READ_PROGRESS = Symbol(`readProgress`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    static READ_COMPLETE = Symbol(`readComplete`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    static WRITE_START = Symbol(`writeStart`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    static WRITE_ERROR = Symbol(`writeError`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    static WRITE_PROGRESS = Symbol(`writeProgress`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    static WRITE_COMPLETE = Symbol(`writeComplete`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    static RENAME_START = Symbol(`renameStart`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    static RENAME_ERROR = Symbol(`renameError`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    static RENAME_PROGRESS = Symbol(`renameProgress`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    static RENAME_COMPLETE = Symbol(`renameComplete`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    static DELETE_START = Symbol(`deleteStart`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    static DELETE_ERROR = Symbol(`deleteError`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    static DELETE_PROGRESS = Symbol(`deleteProgress`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    static DELETE_COMPLETE = Symbol(`deleteComplete`);


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static RENAMED = Symbol(`renamed`);


}

module.exports = IO_SIGNAL;