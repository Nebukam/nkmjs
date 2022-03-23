'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class RectTracker {
    constructor(p_callback = null, ...p_elements) {

        this._OnObservation = this._OnObservation.bind(this);
        this._observer = new IntersectionObserver(this._OnObservation);

        this._elements = [];
        this._cachedRects = new Map();
        this._cachedIntersections = new Map();
        this._enabled = false;
        this._onObserved = p_callback;

        for (let i = 0; i < p_elements.length; i++) { this.Add(p_elements[i]); }
    }

    Enable() {
        if (this._enabled) { return; }
        this._enabled = true;
        for (let i = 0; i < this._elements.length; i++) {
            this._observer.observe(this._elements[i]);
        }
    }

    Disable() {
        if (!this._enabled) { return; }
        this._enabled = false;
        this._observer.disconnect();
        this._cachedRects.clear();
        this._cachedIntersections.clear();
    }

    Add(p_element) {
        let index = this._elements.indexOf(p_element);
        if (index != -1) { return; }
        this._elements.push(p_element);
        if (this._enabled) { this._observer.observe(p_element); }
    }

    Remove(p_element) {
        let index = this._elements.indexOf(p_element);
        if (index == -1) { return; }
        this._elements.splice(index, 1);
        this._cachedRects.delete(p_element);
        this._cachedIntersections.delete(p_element);
        if (this._enabled) { this._observer.unobserve(p_element); }
    }

    _OnObservation(entries, observer) {

        let doCallback = false;

        for (let i = 0, n = entries.length; i < n; i++) {
            let
                entry = entries[i],
                target = entry.target,
                oldRect = this._cachedRects.get(target),
                newRect = entry.boundingClientRect,
                oldIntersection = this._cachedIntersections.get(target),
                newIntersection = entry.intersectionRect,
                localUpdate = false;

            if (!oldRect ||
                !oldIntersection) {
                localUpdate = true;
            }
            else if (
                oldRect.x != newRect.x ||
                oldRect.y != newRect.y ||
                oldRect.width != newRect.width ||
                oldRect.height != newRect.height ||
                oldIntersection.x != newIntersection.x ||
                oldIntersection.y != newIntersection.y ||
                oldIntersection.width != newIntersection.width ||
                oldIntersection.height != newIntersection.height) {
                localUpdate = true;
            }

            if (localUpdate) {
                doCallback = true;
                this._cachedRects.set(target, newRect);
                this._cachedIntersections.set(target, newIntersection);
            }

        }

        if (doCallback && this._onObserved) { this._onObserved(); }

        observer.disconnect();

        if (!this._enabled) { return; }

        for (let i = 0; i < this._elements.length; i++) {
            observer.observe(this._elements[i]);
        }

    }

    GetRect(p_element) { return this._cachedRects.get(p_element); }
    GetIntersect(p_element) { return this._cachedIntersections.get(p_element); }



}

module.exports = RectTracker;