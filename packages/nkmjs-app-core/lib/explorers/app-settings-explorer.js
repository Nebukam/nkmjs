const nkm = require(`@nkmjs/core`);
const ui = nkm.ui;
const uilib = nkm.uilib;

const widgets = require(`../widgets`);

const isAutoSave = (owner) => { return owner.data ? owner.data.Get(mkfData.IDS_PREFS.AUTOSAVE) : true; };

const base = uilib.overlays.ControlDrawer;
class AppSettingsExplorer extends base {
    constructor() { super(); }

    static __controls = [];

    _Init() {
        super._Init();
        this._builder.defaultControlClass = widgets.PropertyControl;
        this._builder.defaultCSS = `control`;
    }

    static _Style() {
        return nkm.style.Extends({
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

        let groups = nkm.data.SIMPLEX.GetGroups(nkm.env.APP._appSettingsType);
        groups.forEach(group => {

            let
                groupDescriptor = nkm.data.SIMPLEX.GetDescriptor(group.id),
                header = {
                    ...groupDescriptor,
                    prefId: `appSettings:foldout:${groupDescriptor.id}`,
                    expanded: true
                },
                ctrls = [];

            group.definitions.foreach(valueDef => {
                let
                    descriptor = nkm.data.SIMPLEX.GetDescriptor(valueDef.id),
                    options = { options: { propertyId: valueDef.id } };

                if (descriptor.controlOptions) {
                    for (var o in descriptor.controlOptions) { options[o] = descriptor.controlOptions[o]; }
                }

                ctrls.push(options);
            });

            this._Foldout(header, ctrls);

        });

    }

    _Foldout(p_foldout, p_controls, p_css = ``, p_host = null) {

        let foldout = this.Attach(nkm.uilib.widgets.Foldout, `item drawer${p_css ? ' ' + p_css : ''}`, p_host || this);
        foldout.options = p_foldout;

        if (p_controls) {
            let builder = new nkm.datacontrols.helpers.ControlBuilder(this);
            builder.options = { host: foldout, cl: widgets.PropertyControl, css: `foldout-item full` };
            this.forwardData.To(builder);
            builder.Build(p_controls);
        }

        return foldout;

    }


}

module.exports = AppSettingsExplorer;
ui.Register(`simplex-app-settings-explorer`, AppSettingsExplorer);