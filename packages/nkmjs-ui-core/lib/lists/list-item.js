'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);

const dom = require(`../utils-dom`);

const WidgetBar = require(`../widget-bar`);
const WidgetItem = require("../widget-item");

const base = WidgetItem;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetItem
 * @memberof ui.core.tree
 */
class ListItem extends base {
    constructor() { 
        super(); 
        this.depth = this.constructor.__defaultDepth;
    }

    static __defaultDepth = 0;
    static __defaultOrder = 1;

    static __defaultSelectOnActivation = true;

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._notifiesSelectionStack = true;

        this._toolbarClass = WidgetBar;
        this._toolbar = null;
        this._toolbarCtnr = this;

    }

    // ----> DOM

    /**
     * @description TODO
     * @type {number}
     */
    get depth() { return this._depth; }
    set depth(p_value) { this._depth = p_value; dom.CSS(this, `--depth`, p_value); }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.pos.rel,
                'min-width': 0,
                //...style.rules.fadeIn,

                'box-sizing': `border-box`,

                'height': `var(--tree-size)`,
                'min-height': `var(--tree-size)`,

                '--indent': `calc(var(--depth) * var(--tree-indent))`,
                'padding-left': `var(--indent, 0px)`,
            },
            '.toolbar': {
                ...style.rules.item.fixed,
            }
        }, base._Style());
    }

    _Render() {
        this._toolbarCtnr = this;
        this.focusArea = this;
    }

    // ----> COMMANDS

    _BuildCommand(p_cmd) {

        if (!this._toolbarClass) { return; }

        if (!this._toolbar) { this._toolbar = this.Attach(this._toolbarClass, `toolbar`, this._toolbarCtnr); }
        this._toolbar.CreateHandle({
            command: p_cmd, isCmdTrigger: false,
            trigger: { thisArg: this, fn: this._ExecuteCommand, arg: p_cmd }
        });

    }

    _ClearCommandHandles() {
        super._ClearCommandHandles();
        if (this._toolbar) {
            this._toolbar.Release();
            this._toolbar = null;
        }
    }

    // ----> Pooling

    _CleanUp() {
        this._depth = 0;
        super._CleanUp();
    }

}

module.exports = ListItem;