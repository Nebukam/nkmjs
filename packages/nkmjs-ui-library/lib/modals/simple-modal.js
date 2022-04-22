'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.helpers.Modal;

class SimpleModal extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/modals/simple-modal.css`, `@/modals/modal.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._body = null;
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                'border': 'none',
            },
            '.body':{
                'position':'relative',
                'display':'inherit',
            }
        }, base._Style());
    }

    _Render() {
        this._wrapper = ui.dom.El(`div`, { class: 'body' }, this._host);        
    }

}

module.exports = SimpleModal;
ui.Register(`nkmjs-simple-modal`, SimpleModal);