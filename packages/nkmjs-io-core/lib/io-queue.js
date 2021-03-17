'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof io.core
 */
class IOQueue extends com.pool.DisposableObjectEx {


    constructor() { super(); }

    _Init() {
        super._Init();
        this._queue = new collections.List();
        this._currentItem = null;
        this._running = false;

        this._itemObserver = new com.signals.Observer();
        this._itemObserver.Hook(com.SIGNAL.FAIL, this._OnCurrentRscProcessingFailed, this);
        this._itemObserver.Hook(com.SIGNAL.COMPLETE, this._OnCurrentRscProcessingComplete, this);

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }
    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty() { return this._queue.isEmpty; }

    /**
     * @description TODO
     * @type {io.core.IOProcess}
     */
    get currentItem() { return this._currentItem; }
    set currentItem(p_value) {

        if (this._currentItem === p_value) { return; }
        let oldValue = this._currentItem;
        this._currentItem = p_value;

        if (oldValue) { this._itemObserver.Unobserve(oldValue); }
        if (p_value) { this._itemObserver.Observe(p_value); }

    }

    /**
     * @description TODO
     * @param {io.core.IOProcess} p_process 
     */
    Add(p_process) {
        if (p_process === this._currentItem) { return; }
        this._queue.Add(p_process);
    }

    /**
     * @description TODO
     * @param {io.core.IOProcess} p_process 
     */
    Remove(p_process) {
        if (p_process === this._currentItem) { return; }
        this._queue.Remove(p_process);
    }

    /**
     * @description TODO
     */
    ProcessNext() {

        if (this._running) { return; }

        this._running = true;
        this._currentItem = this._queue.Shift();

        if (!this._currentItem) {
            this._running = false;
            return;
        }

        this._currentItem.Watch(com.SIGNAL.COMPLETE, this._OnCurrentItemComplete, this);
        if (this._currentItem.Validate()) { this._currentItem.Process(); }

    }

    _OnCurrentItemComplete(p_item) {
        this._running = false;
        this.ProcessNext();
    }

    _CleanUp() {
        this._queue.Clear();
        super._CleanUp();
    }

}

module.exports = IOQueue;