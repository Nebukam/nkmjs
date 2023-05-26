'use strict';

const com = require(`@nkmjs/common`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const base = ui.Widget;
class MiniHeader extends base {
    constructor() { super(); }

    static __usePaintCallback = true;
    static __defaultSelectOnActivation = true;
    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`label`, (p_target, p_value) => { p_target._label.Set(p_value); })
        .To(`htitle`, (p_target, p_value) => { p_target.htitle = p_value; });


    _Init() {
        super._Init();
        this._notifiesSelectionStack = true;
    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    get editor() {
        if (this._editor) { return this._editor; }
        return null;
    }
    set editor(p_value) { this._editor = p_value; }

    static _Style() {
        return style.Extends({
            ':host': {
                //...style.rules.fadeIn,
                ...style.flex.row,
                ...style.flex.align.center.cross,
                'width': '100%',
                'margin-top': '2px',
            },
            '.label': {
                ...style.flexItem.shrink,
                'text-transform': 'uppercase',
                'opacity': '0.5',
                'font-size': `0.65em`,
                'margin': '0 10px 0 10px',
            },
            '.line':{
                ...style.flexItem.fill,
                'height':'1px',
                'background-color':'rgba(var(--col-base-500-rgb), 0.5)'
            }
            
        }, base._Style());
    }

    _Render() {

        super._Render();
        this._line = ui.dom.El(`span`, { class: `line` }, this._host);
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `label font-xsmall` }, this._host), false, false);
        this._line = ui.dom.El(`span`, { class: `line` }, this._host);

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = MiniHeader;
ui.Register(`nkm-mini-header`, MiniHeader);