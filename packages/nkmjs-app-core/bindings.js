'use strict';

const com = require(`@nkmjs/common`);
const datacontrols = require(`@nkmjs/ui-data-controls`);
const AppSettings = require(`./lib/app-settings`);
const explorers = require(`./lib/explorers`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.AddClasses(
            mkfData.Family
        );

        this.Add(
            {
                context: datacontrols.CONTEXT.DEFAULT_EDITOR,
                kvps: [
                    { key: AppSettings, binding: explorers.AppSettings },
                ]
            });

    }
}

module.exports = Bindings;