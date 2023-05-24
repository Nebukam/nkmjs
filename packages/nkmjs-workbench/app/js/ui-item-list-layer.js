'use strict';

const nkm = require(`@nkmjs/core`);
const u = nkm.u;
const ui = nkm.ui;

const UIItem = require("./ui-item");

const base = ui.views.Layer;
class UIItemListLayer extends base {
    constructor() { super(); }

    static __defaultOrientation = ui.FLAGS.VERTICAL;

    _Init() {
        super._Init();
        this._variants = [];
        this._itemContainer = null;
    }

    // ----> DOM

    static _Style() {
        return nkm.style.Extends({
            ':host': {
                ...nkm.style.rules.display.flex,
                //zoom:0.8,
            },
            '.list-ctnr': {
                width: `100%`,
                ...nkm.style.rules.flex.row.wrap,
                'overflow-y': 'scroll'
            },
            '.item': {
                ...nkm.style.rules.item.fill,
                'min-width': `250px`,
                'min-height': `150px`
            }
        }, base._Style());
    }

    _Render() {

        this._itemContainer = ui.dom.El(`div`, { class: `list-ctnr` }, this);

    }

    /**
     * [ { class:xxx, flags:[] } ]
     * @param {*} p_variants 
     */
    SetVariants(p_variants) {
        this._variants = p_variants;
    }

    Handle(p_id, p_class) {

        // fetch variations
        let variants = null;
        let callback = null;

        for (let i = 0, n = this._variants.length; i < n; i++) {
            let v = this._variants[i],
                pass = (u.isInstanceOf(p_class, v.cl) && (!v.not || !v.not.includes(p_class)));

            if (pass) {
                variants = v.variants;
                callback = v.fn;
            }
        }

        if (variants) {
            for (const v of variants) {
                let item = this.Attach(UIItem, `item`, this._itemContainer);
                item.Display(p_id, p_class, v);
                if (callback) { callback(item._sample, v); }
            };
        } else {
            let item = this.Attach(UIItem, `item`, this._itemContainer);
            item.Display(p_id, p_class);
            if (callback) { callback(item._sample, null); }
        }

    }

}

module.exports = UIItemListLayer;
ui.Register(`nkmjs-ui-item-list-layer`, UIItemListLayer);