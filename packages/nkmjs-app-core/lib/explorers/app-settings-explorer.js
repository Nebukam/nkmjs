const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const env = require(`@nkmjs/environment`);

const IDS = require(`../ids`);

const isAutoSave = (owner) => { return owner.data ? owner.data.Get(IDS.AUTOSAVE) : true; };

const base = uilib.overlays.ControlDrawer;
class AppSettingsExplorer extends base {
    constructor() { super(); }

    static __controls = [];

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
                'padding': '0px',
            },
            '.body': {
                'padding': `20px 20px`,
            },
            '.control': {
                'flex': '0 1 auto',
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
            }
        }, base._Style());
    }

    _Render() {

        super._Render();

        let groups = data.SIMPLEX.GetGroups(env.app._appSettingsType);
        for(const group of groups){

            let
                groupDescriptor = data.GetDescriptor(group.id),
                header = {
                    ...groupDescriptor,
                    prefId: `appSettings:foldout:${groupDescriptor.id}`,
                    expanded: true
                },
                ctrls = [];

            for( const valueDef of group.definitions){
                let
                    descriptor = data.GetDescriptor(valueDef.id),
                    options = { options: { propertyId: valueDef.id } };

                if (descriptor.controlOptions) {
                    for (var o in descriptor.controlOptions) { options[o] = descriptor.controlOptions[o]; }
                }

                ctrls.push(options);
            };

            this._Foldout(header, ctrls);

        };

    }

    _Foldout(p_foldout, p_controls, p_css = ``, p_host = null) {

        let foldout = this.Attach(uilib.widgets.Foldout, `item drawer${p_css ? ' ' + p_css : ''}`, p_host || this);
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

module.exports = AppSettingsExplorer;
ui.Register(`simplex-app-settings-explorer`, AppSettingsExplorer);