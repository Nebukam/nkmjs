'use strict';

const NKMjs = require(`@nkmjs/core`);
const u = NKMjs.utils;
const { UI, Layer, UI_FLAG } = NKMjs.ui;
const { CSS } = NKMjs.style;

const UIItem = require("./ui-item");

class UIItemListLayer extends Layer {
    constructor() { super(); }

    static __default_orientation = UI_FLAG.VERTICAL;

    _Init() {
        super._Init();
        this._variants = new Array(0);
        this._itemContainer = null;
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            ':host': {
                display: `flex`,
                //zoom:0.8,
            },
            '.list-ctnr': {
                width: `100%`,
                display: `flex`,
                'flex-flow': `row wrap`,
                'overflow-y':'scroll'
            },
            '.item': {
                flex: `1 1 auto`,
                'min-width': `250px`,
                'min-height': `150px`
            }
        }, super._Style());
    }

    _Render() {

        this._itemContainer = u.dom.New(`div`, { class: `list-ctnr` }, this);

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
            let v = this._variants[i];
            if (u.tils.isInstanceOf(p_class, v.cl) && (!v.not || !v.not.includes(p_class))) {
                variants = v.variants;
                callback = v.fn;
            }
        }

        if (variants) {
            for (let i = 0, n = variants.length; i < n; i++) {
                let item = this.Add(UIItem, `item`, this._itemContainer);
                item.Display(p_id, p_class, variants[i]);
                if(callback){ callback(item._sample); }
            }
        } else {
            let item = this.Add(UIItem, `item`, this._itemContainer);
            item.Display(p_id, p_class);
            if(callback){ callback(item._sample); }
        }

    }

}

module.exports = UIItemListLayer;
UI.Register(`nkmjs-ui-item-list-layer`, UIItemListLayer);