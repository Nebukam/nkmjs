'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof io.core
 */
module.exports = {

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Registry
     */
    RSC_REGISTERED: Symbol(`rscRegistered`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Registry
     */
    RSC_UNREGISTERED: Symbol(`rscUnregistered`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    READ_START: Symbol(`readStart`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    READ_ERROR: Symbol(`readError`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    READ_PROGRESS: Symbol(`readProgress`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Read
     */
    READ_COMPLETE: Symbol(`readComplete`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    WRITE_START: Symbol(`writeStart`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    WRITE_ERROR: Symbol(`writeError`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    WRITE_PROGRESS: Symbol(`writeProgress`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Write
     */
    WRITE_COMPLETE: Symbol(`writeComplete`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    RENAME_START: Symbol(`renameStart`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    RENAME_ERROR: Symbol(`renameError`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    RENAME_PROGRESS: Symbol(`renameProgress`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Rename
     */
    RENAME_COMPLETE: Symbol(`renameComplete`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    DELETE_START: Symbol(`deleteStart`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    DELETE_ERROR: Symbol(`deleteError`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    DELETE_PROGRESS: Symbol(`deleteProgress`),

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Operation.Delete
     */
    DELETE_COMPLETE: Symbol(`deleteComplete`),


    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    RENAMED: Symbol(`renamed`),


}