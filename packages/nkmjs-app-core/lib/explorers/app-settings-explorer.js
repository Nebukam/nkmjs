const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const u = require(`@nkmjs/utils`);
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
        this._builder.defaultCSS = `item`;
    }

    static _Style() {
        return style.Extends({
            ':host': {

            },
            '.list': {
                ...style.flex.column.nowrap,
                'overflow': 'auto',
            },
            '.body': {
                'padding': `20px 20px`,
            },
            '.foldout': {

            },

            ...style.flexItem.items.prefix(`.body`),

        }, base._Style());
    }

    _Render() {

        super._Render();

        let groups = data.SIMPLEX.GetGroups(env.app._appSettingsType);
        for (const group of groups) {

            let
                groupDescriptor = data.GetDescriptor(group.id),
                foldout = {
                    ...groupDescriptor,
                    prefId: `appSettings:foldout:${groupDescriptor.id}`,
                    expanded: true,
                    controls: []
                };

            for (const valueDef of group.definitions) {
                let
                    descriptor = data.GetDescriptor(valueDef.id),
                    options = { options: { propertyId: valueDef.id } };

                if (u.isInstanceOf(descriptor.valueType, data.TYPES.BOOLEAN)) { options.options.invertInputOrder = true; }

                if (descriptor.controlOptions) {
                    for (var o in descriptor.controlOptions) { options[o] = descriptor.controlOptions[o]; }
                }

                foldout.controls.push(options);
            };

            uilib.views.ControlsFoldout.Build(this, foldout);

        };

    }

}

module.exports = AppSettingsExplorer;
ui.Register(`simplex-app-settings-explorer`, AppSettingsExplorer);