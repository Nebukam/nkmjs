'use strict';

const com = require(`@nkmjs/common`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const actions = require(`@nkmjs/actions`);
const data = require(`@nkmjs/data-core`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const env = require(`@nkmjs/environment`);

class CmdOpenAppSettings extends actions.Command {
    constructor() { super(); }

    static __displayName = `App settings`;
    static __displayIcon = `gear`;

    _Init() {
        super._Init();
    }

    _InternalExecute() {

        let editorClass = com.BINDINGS.Get(datacontrols.CONTEXT.DEFAULT_EDITOR, env.app.appSettings);

        if (!editorClass) { return this._Cancel(); }

        let opts = {
            orientation: ui.FLAGS.HORIZONTAL,
            placement: ui.FLAGS.LEFT,
            title: `App settings`,
            data: env.app._appSettings,
            contentClass: editorClass
        };

        actions.Emit(uilib.REQUEST.DRAWER, opts, this);

        this._Success();

    }

}

module.exports = CmdOpenAppSettings;