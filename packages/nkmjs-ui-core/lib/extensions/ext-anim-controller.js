'use strict';

const FLAGS = require(`../flags`);

const Extension = require(`./extension`);

/**
 * a CSSAnimationController is used to trigger animations
 * onto an object and listen to their completion.
 * 
 * TODO : Add more control, as well as the ability to listen to more animations.
 * Use start to add animation to the style.animation value (anim1,anim2,anim3)
 * hence, don't stop listening until all animations are finished.
 */

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogWatcher
 * @memberof ui.core.helpers
 */
class AnimControllerExtension extends Extension {

    constructor(p_element = null) {

        super();

        this._element = p_element;
        this._animations = [];
        this._animationsMap = {};

        this._hooks = {};

        this._Bind(this._aStart);
        this._Bind(this._aCancel);
        this._Bind(this._aIteration);
        this._Bind(this._aEnd);

    }

    /**
     * @description TODO
     * @type {string}
     */
    get animation() { return this._animation; }
    set animation(p_value) {

        if (this._animation === p_value) { return; }
        this._animation = p_value;

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get element() { return this._element; }
    set element(p_value) {

        if (this._element === p_value) { return; }

        let oldElement = this._element;
        this._element = p_value;

        if (this._isEnabled) {
            if (oldElement) { oldElement.removeEventListener(`animationstart`, this._aStart); }
            if (this._element) { this._element.addEventListener(`animationstart`, this._aStart); }
        }

    }

    Enable() {
        if (!super.Enable()) { return false; }
        if (this._element) { this._element.addEventListener(`animationstart`, this._aStart); }
        return true;
    }

    Disable() {
        if (!super.Disable()) { return false; }
        if (this._element) { this._element.removeEventListener(`animationstart`, this._aStart); }
        return true;
    }

    _aStart(p_evt) {
        if (!this._animationsMap.hasOwnProperty(p_evt.animationName)) { return; }
        this._Trigger(p_evt.animationName, FLAGS.A_START);
        this._element.addEventListener(`animationcancel`, this._aCancel);
        this._element.addEventListener(`animationend`, this._aEnd);
        this._element.addEventListener(`animationiteration`, this._aIteration);
    }

    _aCancel(p_evt) {
        if (!this._animationsMap.hasOwnProperty(p_evt.animationName)) { return; }
        this._ClearListeners();
        this._Trigger(p_evt.animationName, FLAGS.A_CANCEL);
        this._Trigger(p_evt.animationName, FLAGS.A_ANY_END);
    }

    _aIteration(p_evt) {
        if (!this._animationsMap.hasOwnProperty(p_evt.animationName)) { return; }
        this._Trigger(p_evt.animationName, FLAGS.A_ITERATION);
    }

    _aEnd(p_evt) {
        if (!this._animationsMap.hasOwnProperty(p_evt.animationName)) { return; }
        this._ClearListeners();
        this._Trigger(p_evt.animationName, FLAGS.A_END);
        this._Trigger(p_evt.animationName, FLAGS.A_ANY_END);
    }

    _ClearListeners() {
        this._element.removeEventListener(`animationcancel`, this._aCancel);
        this._element.removeEventListener(`animationend`, this._aEnd);
        this._element.removeEventListener(`animationiteration`, this._aIteration);
    }

    Add(p_animationName, p_duration, p_ease = `linear`, p_delay = 0, p_iterations = 0, p_extras = ``) {
        if (this._animationsMap.hasOwnProperty(p_animationName)) { return; }

        let newAnim = {
            name: p_animationName,
            dur: p_duration,
            ease: p_ease,
            extras: p_extras,
            delay: p_delay,
            iterations: p_iterations
        };

        this._animationsMap[p_animationName] = newAnim;
        this._animations.push(newAnim);

        this._RefreshAnimationSerial();
    }

    Remove(p_animationName) {
        if (!this._animationsMap.hasOwnProperty(p_animationName)) { return; }

        let anim = this._animationsMap[p_animationName],
            index = this._animations.indexOf(anim);

        delete this._animationsMap[p_animationName];
        this._animations.splice(index, 1);
        this._RefreshAnimationSerial();
    }

    _RefreshAnimationSerial() {
        var serial = ``;
        for(let i = 0, n = this._animations.length; i < n; i++){
            if(i != 0){serial += `, `}
            let anim = this._animations[i];
            serial += `${anim.dur}`;
            serial += ` ${anim.ease}`;
            if(anim.delay > 0){ serial += ` ${anim.delay}`; }
            if(anim.iterations > 0){ serial += ` ${anim.iterations}`; }
            else if(anim.iterations == -1){ serial += ` infinite`; }
            if(anim.extras > 0){ serial += ` ${anim.extras}`; }
            serial += `${anim.name}`;
        }
        console.log(serial);
        this._element.style.animation = serial;
    }

    // ----> Hooks

    /**
     * @description TODO
     * @param {string} p_state 
     * @param {function} p_fn 
     * @group Hooks
     */
    Hook(p_animationName, p_state, p_fn) {

        let animHooks = this._hooks[p_animationName];
        if (!animHooks) {
            animHooks = {};
            this._hooks[p_animationName] = animHooks;
        }

        let fnList = animHooks[p_state];
        if (!fnList) {
            fnList = [];
            animHooks[p_state] = fnList;
        }

        if (fnList.includes(p_fn)) { return; }
        fnList.push(p_fn);
    }

    /**
     * @description TODO
     * @param {string} p_state 
     * @param {function} p_fn  
     * @group Hooks
     */
    Unhook(p_animationName, p_state, p_fn) {

        let animHooks = this._hooks[p_animationName];
        if (!animHooks) { return; }

        let fnList = animHooks[p_state];
        if (!fnList || fnList.length == 0) { return; }

        let index = fnList.indexOf(p_fn);
        if (index === -1) { return; }

        fnList.splice(index, 1);
    }

    _Trigger(p_animationName, p_state) {
        let animHooks = this._hooks[p_animationName];
        if (!animHooks) { return; }

        let fnList = animHooks[p_state];
        if (!fnList) { return; }
        for (let i = 0, n = fnList.length; i < n; i++) {
            fnList[i](this._element, p_animationName);
        }

    }

}

module.exports = AnimControllerExtension;