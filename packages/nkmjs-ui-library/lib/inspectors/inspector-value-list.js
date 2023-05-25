const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const env = require(`@nkmjs/environment`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

const Foldout = require(`../widgets/foldout`);

const base = datacontrols.InspectorView;
class ValueListInspector extends base {
    constructor() { super(); }

    static __width = `auto`;
    static __controls = [];
    static __foldouts = []; // [ {foldout:{}, controls:[]}, {foldout:{}, controls:[]} ]

    _Init() {
        super._Init();
        this._builder.defaultControlClass = datacontrols.widgets.ValueControl;
        this._builder.defaultCSS = `control`;
    }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.fadeIn,
                'flex-flow': 'row wrap',
                'align-content': 'flex-start',
                'width': `${this.__width}`,
            },
            '.body': {
                ...style.rules.flex.row.wrap,
                ...style.rules.item.fill,
                'overflow': 'auto',
                ...style.rules.gap.small,
                'padding': `10px`,
            },
            '.control': {
                'flex': '1 1 100%',
                'margin': '0',
                //'margin-bottom': '5px'
            },
            '.separator': {
                //'border-top':'1px solid gray'
            },
            '.foldout': {
                ...style.rules.item.fill,
                'width': `350px`,
            },

            '.header': { 'margin': '5px 2px 5px 2px' },
            '.small': { 'flex': '1 1 25%' },
            '.vsmall': { 'flex': '1 1 15%' },
            '.large': { 'flex': '1 1 80%' },

        }, base._Style());
    }

    _Render() {

        this._body = ui.dom.El(`div`, { class: `body` }, this._host);
        this._builder.host = this._body;

        super._Render();

        for (const foldout of this.constructor.__foldouts) {
            this._Foldout(foldout.foldout, foldout.controls);
        };
    }

    _Foldout(p_foldout, p_controls, p_css = ``, p_host = null) {

        let foldout = this.Attach(Foldout, `item foldout${p_css ? ' ' + p_css : ''}`, p_host || this._body);
        foldout.options = p_foldout;

        if (p_controls) {
            let builder = new datacontrols.helpers.ControlBuilder(this);
            builder.options = { host: foldout, cl: datacontrols.widgets.ValueControl, css: `foldout-item full` };
            this.forwardData.To(builder);
            builder.Build(p_controls);
        }

        return foldout;

    }


}

module.exports = ValueListInspector;
ui.Register(`nkm-value-list-inspector`, ValueListInspector);