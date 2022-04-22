'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

const base = ui.views.View;

class Explorer extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/explorer.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
    }

    get header() { return this._header; }

    get body() { return this._body; }

    get footer() { return this._footer; }

    // ----> DOM

    static _Style() {

        let shadowSize = 5;
        let shadowColor = `rgba(0,0,0,0.5)`;
        return {
            ':host': {
                position: `relative`,
                flex: `1 1 auto`,
                'min-width': 0,

                display: `flex`,
                'flex-flow': `column nowrap`,
                'align-content': `stretch`,
                'align-items': `stretch`,
            },
            '.group': {
                position: `relative`
            },
            '.header': {
                flex: `0 0 auto`,
            },
            '.footer': {
                flex: `0 0 auto`,
            },

            '.body': {
                'overflow-y': `auto`,
                'min-width': 0,
                flex: `1 1 1px`,
            }
        };
    }

    _Render() {
        this._header = ui.dom.El(`div`, { class: `header group` }, this._host);
        this._body = ui.dom.El(`div`, { class: `body group` }, this._host);
        this._footer = ui.dom.El(`div`, { class: `footer group` }, this._host);
        this._wrapper = this._body;
    }

}

module.exports = Explorer;
ui.Register('nkmjs-explorer', Explorer);