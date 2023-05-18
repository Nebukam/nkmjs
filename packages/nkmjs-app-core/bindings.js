'use strict';

const com = require(`@nkmjs/common`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

const explorers = require(`./lib/explorers`);
const AppSettings = require(`./lib/app-settings`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                ctx: datacontrols.CTX.DEFAULT_EDITOR,
                kvps: [
                    { key: AppSettings, binding: explorers.AppSettings },
                ]
            });

    }
}

module.exports = Bindings;