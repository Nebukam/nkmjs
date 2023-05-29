'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const col = require("@nkmjs/collections");
const RectTracker = require(`./rect-tracker`);
/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class SizeTracker {
    constructor(p_owner) {
        this._rectTracker = new RectTracker(this._Bind(this._OnRectUpdate));
        this._owner = p_owner;
        this._breakpoints = [];
        this._elements = new col.DictionaryList();
        this._toggles = new Map();
        this._widthOnly = [];
        this._heightOnly = [];
        this._both = [];
    }

    get rectTracker() { return this._rectTracker; }

    Enable() {
        if (!this._rectTracker.Enable()) { return false; }
    }

    Disable() {
        if (!this.rectTracker.Disable()) { return false; }
    }

    /**
     * { width:300, height:500, additive:true, strict:true, flag:`.myFlag` }
     * @param {*} param0 
     */
    AddBreakpoint(p_breakpoint, ...p_elements) {
        if (this._breakpoints.AddNew(p_breakpoint)) {
            let match_w = ('width' in p_breakpoint),
                match_h = ('height' in p_breakpoint);

            if (match_w && match_h) { this._both.push(p_breakpoint); }
            else if (match_w) {
                this._widthOnly.push(p_breakpoint);
                this._widthOnly.sort((a, b) => { return a.width - b.width; });
            }
            else if (match_h) {
                this._heightOnly.push(p_breakpoint);
                this._widthOnly.sort((a, b) => { return a.height - b.height; });
            }

        }
        this._toggles.set(p_breakpoint, false);
        for (const el of p_elements) { this._elements.Set(p_breakpoint, el); };
    }

    RemoveBreakpoint(p_breakpoint) {
        this._breakpoints.Remove(p_breakpoint);
        this._toggles.delete(p_breakpoint);
        this._elements.RemoveKey(p_breakpoint);
        //TODO : Remove
    }

    AddElements(p_breakpoint, ...p_elements) {
        if (!this._breakpoints.includes(p_breakpoint)) { return; }
        for (const el of p_elements) { this._elements.Set(p_breakpoint, el); };
    }

    _OnRectUpdate(p_tracker) {
        // A tracker rect has been updated.
        //Go through the breakpoint and toggle the one that make sense
        let rect = p_tracker.GetRect(this._owner);

        for (const bp of this._breakpoints) { this._toggles.set(bp, this._Check(p_breakpoint, rect)); }

        this._Process(this._widthOnly);
        this._Process(this._heightOnly);
        
        for (const bp of this._both) { this._ToggleBP(bp, this._elements.Get(bp), false); };

    }

    _Process(p_list) {
        let broke = false;
        for (const bp of p_list) {
            let toggle = this._toggles.get(bp);
            if (!toggle || broke) { this._ToggleBP(bp, this._elements.Get(bp), false); }
            else { broke = true; this._ToggleBP(bp, this._elements.Get(bp), true); }
        };
    }

    _Check(p_bp, p_rect) {

        let
            match_w = true,
            match_h = true;

        if ('width' in p_bp) { match_w = (p_rect.width >= p_bp.width); }
        if ('height' in p_bp) { match_h = (p_rect.height >= p_bp.height); }

        return p_bp.strict ? match_h && match_w : match_h || match_w;

    }

    _ToggleBP(p_breakpoint, p_elements, p_toggle) {
        this._owner._flags.Set(p_breakpoint.flag, p_toggle);
        dom.CSSClass(p_elements, p_breakpoint.flag, p_toggle);
    }

}

module.exports = SizeTracker;