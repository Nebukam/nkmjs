'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);

const WidgetBar = require(`../widget-bar`);
const WidgetItem = require("../widget-item");


/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetItem
 * @memberof ui.core.tree
 */
class ListItem extends WidgetItem {
    constructor() { 
        super(); 
        this.depth = this.constructor.__defaultDepth;
    }

    static __defaultDepth = 0;
    static __defaultOrder = 1;

    static __NFO__ = com.NFOS.Ext({}, WidgetItem, ['css']);

    // ----> Init

    _Init() {

        this.default_SelectOnActivation = u.tils.Default(this.default_SelectOnActivation, true);

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
    set depth(p_value) { this._depth = p_value; this.style.setProperty(`--depth`, this._depth); }

    _Style() {
        return style.Extends({
            ':host': {
                'position': 'relative',
                'min-width': 0,
                '@': ['fade-in']
            },
            '.toolbar': {
                'flex': `0 0 auto`
            }
        }, super._Style());
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
            command: p_cmd, isCommandTrigger: false,
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