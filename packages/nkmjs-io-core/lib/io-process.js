'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL, DisposableObjectEx } = require(`@nkmjs/common`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof io.core
 */
class IOProcess extends DisposableObjectEx {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._operation = null;
        this._running = false;
        this._globalResourceMap = null;
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

    /**
     * @description TODO
     * @type {io.core.Resource}
     * @customtag read-only
     */
    get rsc() { return this._operation.rsc; }

    /**
     * @description TODO
     * @type {io.core.ENCODING}
     * @customtag read-only
     */
    get encoding() { this._operation.rsc.encoding; }

    /**
     * @description TODO
     * @type {io.core.ResourceOperation}
     */
    get operation() { return this._operation; }
    set operation(p_value) { this._operation = p_value; }

    /**
     * @description Called by the IOQueue before Process
     * This is to make sure basic infos are valid before starting the process itself.
     */
    Validate() {
        
        if (U.isEmpty(this._operation.rsc.path)) {
            this._OnError(new Error(`Resource path is empty.`));
            return false;
        }
        return true;
    }

    /**
     * @description TODO
     */
    Process() {
        throw new Error(`Process not implemented in io-process`);
    }

    _OnStart() {
        this._running = true;
        this._operation.OnStart();
    }

    _OnProgress(p_progress) {
        this._operation.OnProgress(p_progress);
    }

    _OnError(p_err) {
        this._operation.OnError(p_err);
        this._OnComplete();
    }

    _OnSuccess() {
        this._operation.OnSuccess();
        this._OnComplete();
    }

    _OnComplete() {
        this._running = false;
        this._Broadcast(SIGNAL.COMPLETE, this);
        this.Release();
    }

    _CleanUp() {
        this._operation = null;
        this._running = false;
        this._globalResourceMap = null;
        super._CleanUp();
    }

    toString() {
        return `[${this.constructor.name}::${this._operation ? this._operation.fullPath : 'NO_OPERATION_SET'}]`;
    }
}

module.exports = IOProcess;