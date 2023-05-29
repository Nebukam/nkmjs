'use strict';

const utils = require(`@nkmjs/utils`);
const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);

const ResourceOperation = require(`./resource-operation`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof io.core
 */
class IOQueue extends com.Observable {


    constructor() { super(); }

    _Init() {
        super._Init();
        this._queue = [];
        this._currentItem = null;
        this._running = false;

        this._itemObserver = new com.signals.Observer();
        this._itemObserver
            .Hook(com.SIGNAL.FAIL, this._OnCurrentRscProcessingFailed, this)
            .Hook(com.SIGNAL.COMPLETE, this._OnCurrentRscProcessingComplete, this);

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
    Add(p_process, p_first = false) {
        if (p_process === this._currentItem) { return; }
        if (p_first) {
            this._queue.Unshift(p_process);
        } else {
            this._queue.Add(p_process);
        }
    }

    /**
     * @description TODO
     * @param {io.core.IOProcess} p_process 
     */
    Remove(p_process) {
        if (p_process === this._currentItem) { return; }
        this._queue.Remove(p_process);
    }

    Bump(p_process) {

        if (utils.isInstanceOf(p_process, ResourceOperation)) {
            // Find process of operation in queue
            let op = p_process;
            p_process = null;
            for (var i = 0; i < this._queue.length; i++) {
                let p = this._queue[i];
                if (p.operation == op) {
                    p_process = p;
                    break;
                }
            }
        }

        if (!p_process) { return; }

        this._queue.Unshift(p_process);

    }

    /**
     * @description TODO
     */
    ProcessNext() {

        if (this._running) { return; }

        this._running = true;
        this._currentItem = this._queue.shift();

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