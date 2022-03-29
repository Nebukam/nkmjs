'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);

class InputTextarea extends ui.inputs.InputTextBase {
    constructor() { super(); }

    static __inputProperties = { rows: 3, spellcheck:false };

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/expandable.css`]
    }, ui.inputs.InputField, ['css']);

    _Init() {
        super._Init();
        this._distribute.To('rows');
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'height': 'auto !important'
            },
            '.field':{
                'resize': 'none'
            }
        }, super._Style());
    }

    set rows(p_value){
        this._inputField.setAttribute(`rows`, p_value || 3);
    }

    _Render() {
        this._inputField = ui.dom.El(`textarea`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }

    _CleanUp(){
        this.rows = null;
        super._CleanUp();
    }

}

module.exports = InputTextarea;
ui.Register(`nkmjs-input-textarea`, InputTextarea);