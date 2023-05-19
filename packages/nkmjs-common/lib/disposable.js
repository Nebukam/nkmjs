'use strict';

/**
 * This is the base class for most of the objects in the @nkmjs ecosystem.  
 * They encapsulate boilerplate code that allow the `{@link common.pool.POOL}` to function correctly and streamline
 * pooled object behavior. If you are coming from any other programming language that supports interfaces, 
 * see this as an IDisposable, with all the boilerplate code already implemented.  
 * If you need to broadcast signals, consider using `{@link common.Observable}` instead.
 * @class
 * @customtag abstract
 * @hideconstructor
 * @memberof common.pool
 */
class Disposable {

    constructor(p_initOptions = null) {
        this._isReleasing = false;
        this._Init(p_initOptions);
        this._PostInit();
    }

    /**
     * @access protected
     * @description Called only once in the `constructor` of the object, _Init, well, _initialize_ the object.  
     * Use it for initlizing variables, members, bind functions etc, so they can be used safely in _PostInit.  
     * Note : There is no need to call super() on this member when immediately extending Disposable, the function is a stub.
     * @customtag override-me
     * @group Initialization
     */
    _Init() { }

    /**
     * @access protected
     * @description Called only once in the `constructor` of the object, right after `_Init`. This allows
     * your constructor to perform operations on members etc, **knowing they have been properly initilized** with their default
     * or intended values.  
     * Note : There is no need to call super() on this member when immediately extending Disposable, the function is a stub.
     * @customtag override-me
     * @group Initialization
     */
    _PostInit() { }

    /**
     * @access protected
     * @description Bind the given function to this object and returns it.
     * Note that it replaces the function reference, hence referencing function before they are being bound in `_Init`,
     * ( i.e in the constructor ) will target an obsolete function.
     * @param {*} p_func 
     * @group Utils
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    //#region Pooling

    /**
     * Whether the object is currently in the process of being released or not.
     * @customtag read-only
     * @type {boolean}
     * @group Pooling
     */
    get isReleasing() { return this._isReleasing; }

    /**
     * @description Releases the object and returns it back to the pool.  
     * If you want to do operations when the object is released, do so by overriding the `_CleanUp` method.
     * @broadcasts common.SIGNAL.RELEASING
     * @broadcasts common.SIGNAL.RELEASED
     * @group Pooling
     * @groupdescription Group of methods related to the NKMjs pooling system.
     */
    Release() {
        if (this._isReleasing) { return; }
        this._isReleasing = true;

        this._CleanUp();
        if (this._returnFn) { this._returnFn(this); }

        this._isReleasing = false;
    }

    /**
     * @access protected
     * @description Called when the object is released. Resets most properties to their initial values.  
     * Override this method in your own implementations to 'reset' the object to the state you want it to be
     * when it gets rented again through `{@link common.POOL.Rent}`
     * @customtag override-me
     * @example MyClass extends Disposable{
     * 
     *     _Init(){
     *         this._arr = []; // Create member during _Init
     *     }
     * 
     *     _CleanUp(){ 
     *         this._arr.length = 0; // Reset member during _CleanUp
     *     }
     * 
     * }
     * @group Pooling 
     */
    _CleanUp() { }

    //#endregion

    Dismantle(){
        this.Release();
        this._returnFn = null;
        this._internalDismantle?.();
        for(let p in this){
            let member =this[p]; 
            this[p] = null;
        }
    }


}

module.exports = Disposable;