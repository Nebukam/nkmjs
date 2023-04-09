'use strict';

const u = require("@nkmjs/utils");

const dom = require(`../utils-dom`);
const POINTER = require(`../pointer`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);

const ExtDrop = require("./ext-drop");

/**
 * @description The DropExtension enable drop capabilities to a widget.
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.ExtDrop
 * @memberof ui.core.extensions
 */
class DropExtension extends ExtDrop {
    constructor() { super(); }

    static __hintEdges = null;

    // ----> Init

    get edgeHint() { return this.constructor.__hintEdges; }

    _Init() {
        super._Init();
        this._Bind(this._OnMouseMove);
        this._watchingMouse = false;
        this._orientation = FLAGS.VERTICAL;
        this._verticalEdge = FLAGS.TOP;
        this._horizontalEdge = FLAGS.TOP;
    }

    get orientation() { return this._orientation; }
    set orientation(p_value) {
        let oldOrientation = this._orientation;
        this._orientation = p_value;
        if (this.__hintEdges) {
            if (oldOrientation) { dom.CSS(this.__hintEdges, oldOrientation, false); }
            dom.CSSClass(this.__hintEdges, this._orientation, true);
        }
    }

    get verticalEdge() { return this._verticalEdge; }
    get horizontalEdge() { return this._horizontalEdge; }

    /**
     * 
     * @param {*} p_isMouseOver When true, means the dragged data is right over.
     */
    _ShowHint() {
        super._ShowHint();

        //Start listening to mouse move events
        if (this.edgeHint) { dom.Attach(this.edgeHint, nkm.main._appBody); }
        else {
            this.constructor.__hintEdges = dom.El(`div`, { class: `ext-overlay drop-target-edges` }, nkm.main._appBody);
            let line = dom.El(`div`, { class: `line` }, this.edgeHint);
            dom.El(`div`, { class: `dot` }, line);
        }

        dom.CSSClass(this.edgeHint, this._orientation, true);

        if (!this._watchingMouse) {
            this._watchingMouse = true;
            this._UpdateMouseInfos();
            this._OnMouseMove();
            POINTER.Watch(POINTER.MOUSE_MOVE, this._OnMouseMove);
        }

    }

    _HideHint() {
        super._HideHint();
        if (this.edgeHint) { dom.Detach(this.edgeHint); }

        if (this._watchingMouse) {
            this._watchingMouse = false;
            POINTER.Unwatch(POINTER.MOUSE_MOVE, this._OnMouseMove);
        }
    }

    _UpdateMouseInfos() {
        let m = super._UpdateMouseInfos();
        let hint = this.edgeHint;
        if (hint) {
            dom.CSS(hint, {
                'max-width': `${m.rect.width}px`,
                'max-height': `${m.rect.height}px`,
                transform: `translateX(${m.rect.x}px) translateY(${m.rect.y}px)`,
                '--mx':m.rx,
                '--my':m.ry
            });
        }
        return m;
    }

    _OnMouseMove() {

        let
            m = this._UpdateMouseInfos(),
            isTop = m.ry < 0.5,
            isLeft = m.rx < 0.5;

        this._verticalEdge = isTop ? FLAGS.TOP : FLAGS.BOTTOM;
        this._horizontalEdge = isLeft ? FLAGS.LEFT : FLAGS.RIGHT;

        dom.CSSClass(this.edgeHint, {
            [FLAGS.TOP]: isTop,
            [FLAGS.BOTTOM]: !isTop,
            [FLAGS.LEFT]: isLeft,
            [FLAGS.RIGHT]: !isLeft,
            'drop-before': this._orientation == FLAGS.VERTICAL ? isTop : isLeft,
            'drop-after': this._orientation == FLAGS.VERTICAL ? !isTop : !isLeft
        });

    }

}

module.exports = DropExtension;