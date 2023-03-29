const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const env = require(`@nkmjs/environment`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

const Foldout = require(`../widgets/foldout`);

const base = datacontrols.InspectorView;
class ValueListInspector extends base {
    constructor() { super(); }

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
                'min-width': '350px',
                //'flex': '0 0 auto',
            },
            '.list': {
                'display': 'flex',
                'flex-flow': 'column nowrap',
                'flex': '1 1 auto',
                'min-height': '0',
                'overflow': 'auto',
                'padding': '10px',
            },
            '.body': {
                'padding': `20px 20px`,
            },
            '.control': {
                'flex': '0 1 auto',
                'margin': '0',
                'margin-bottom': '5px'
            },
            '.separator': {
                //'border-top':'1px solid gray'
            },
            '.drawer': {
                'flex': '1 1 auto',
                'width': `350px`,
                'padding': `10px`,
                'background-color': `rgba(19, 19, 19, 0.15)`,
                'border-radius': '4px',
                'margin-bottom': '5px',
            },
        }, base._Style());
    }

    _Render() {

        super._Render();

        /*
        {
            title: LOC.labelTr, icon: `font-bounds`, prefId: `transforms`, expanded: true,
                handles: [
                    {
                        icon: 'clipboard-read', htitle: 'Paste transforms  [ Ctrl Alt V ]',
                        trigger: { fn: () => { this.editor.cmdGlyphPasteTransform.Execute(this._data); } },
                    }
                ]
        },
        */

        this.constructor.__foldouts.forEach(foldout => {
            this._Foldout(foldout.foldout, foldout.controls);
        });

    }

    _Foldout(p_foldout, p_controls, p_css = ``, p_host = null) {

        let foldout = this.Attach(Foldout, `item drawer${p_css ? ' ' + p_css : ''}`, p_host || this);
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