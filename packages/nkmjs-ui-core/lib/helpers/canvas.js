'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require("@nkmjs/collections");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const DisplayObject = require(`../display-object`);

const SIGNAL = require(`../signal`);

class Canvas extends DisplayObject {
    constructor() { super(); }

    static __useResizeCallback = true;
    static __usePaintCallback = true;

    // ----> Init

    _Init() {
        super._Init();
        this._ctxType = '2d';
        this._realtime = false;
        this._requestDraw = false;
        this._requestAfter = false;
        this._alwaysFit = true;
        this._size = { width: 0, height: 0 };
        this._deltaSum = 0;
        this._Bind(this.Draw);
    }

    _PostInit() {
        super._PostInit();
        this._ctx = this._GetContext();
    }

    get requestDraw() { return this._requestDraw; }
    set requestDraw(p_value) { this._requestDraw = p_value; }

    SetSize(p_width = null, p_height = null) {
        this._size.width = p_width || this._size.width;
        this._size.height = p_height || this._size.height;
        this.setAttribute(`width`, this._size.width);
        this.setAttribute(`height`, this._size.height);
    }

    get realtime() { return this._realtime; }
    set realtime(p_value) {
        if (this._realtime == p_value) { return; }
        this._realtime = p_value;
        if (!p_value) { com.time.TIME.Unwatch(com.SIGNAL.TICK, this.Draw); }
        else { if (this._isPainted) { com.time.TIME.Watch(com.SIGNAL.TICK, this.Draw); } }
    }

    _OnSizeChange(p_contentRect) {
        if (this._alwaysFit) {
            this.SetSize(p_contentRect.width, p_contentRect.height);
        }
    }

    _OnPaintChange() {
        super._OnPaintChange();
        if (this._isPainted) {
            if (this._realtime) {
                com.time.TIME.Watch(com.SIGNAL.TICK, this.Draw);
                this.Draw();
            } else {
                if (this._waitingForDraw) {
                    this._waitingForDraw = false;
                    this.Draw(this._deltaSum);
                    this._deltaSum = 0;
                }
            }
        } else {
            if (this._realtime) {
                com.time.TIME.Unwatch(com.SIGNAL.TICK, this.Draw);
            } else {

            }
        }

    }

    // ---->

    _GetContext() { return this.getContext(this._ctxType) }

    Draw(p_delta = 0) {
        if (!this._isPainted) {
            // Offscreen, schedule draw for next paint instead
            this._deltaSum += p_delta;
            this._waitingForDraw = true;
            return;
        } else {
            this._deltaSum = 0;
        }

        if (this._requestDraw) {
            this.Broadcast(SIGNAL.DRAW_REQUEST_BEFORE, this, this._ctx, p_delta);
            this._InternalDraw(p_delta);
            this.Broadcast(SIGNAL.DRAW_REQUEST_AFTER, this, this._ctx, p_delta);
        } else {
            this._InternalDraw(p_delta);
        }

    }

    _InternalDraw(p_delta = 0) { }

}

module.exports = Canvas;
UI.Register(`nkmjs-canvas`, Canvas, `canvas`);