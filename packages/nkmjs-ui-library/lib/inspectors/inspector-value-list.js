const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const env = require(`@nkmjs/environment`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const views = require(`../views`);

const base = datacontrols.InspectorView;
class ValueListInspector extends base {
    constructor() { super(); }

    static __width = `auto`;
    static __controls = [];
    static __foldouts = []; // [ {foldout:{}, controls:[]}, {foldout:{}, controls:[]} ]

    _Init() {
        super._Init();
        this._builder.defaultControlClass = datacontrols.widgets.ValueControl;
        this._builder.defaultCSS = `item`;
    }

    static _Style() {
        return style.Extends({

            ':host': {
                ...style.rules.fadeIn,
                ...style.flex.rows,
                'align-content': 'flex-start',
                'width': `${this.__width}`,
            },

            '.body': {
                ...style.flex.rows,
                ...nkm.style.rules.gap.small,

                ...style.flexItem.fill,
             //   'overflow': 'auto',
            },

            '.foldout': {
                ...style.flexItem.fillAbs(350),
            },

            ...style.flexItem.items.prefix(`.body`),


        }, base._Style());
    }

    _Render() {

        this._body = ui.dom.El(`div`, { class: `body` }, this._host);
        this._builder.host = this._body;

        super._Render();

        let foldouts = this._GetFoldouts([]);
        if (!foldouts.length) { foldouts = this.constructor.__foldouts; }

        for (const foldout of foldouts) { views.Foldout(this, foldout, this._body); };
    }

    _GetFoldouts(p_foldouts) { return p_foldouts; }


}

module.exports = ValueListInspector;
ui.Register(`nkm-value-list-inspector`, ValueListInspector);