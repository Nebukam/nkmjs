'use strict';

const nkm = require(`@nkmjs/core`);
const data = nkm.data;
const IDS = require(`./lib/ids`);

const base = nkm.com.helpers.BindingKit;
class Bindings extends base {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: nkm.datacontrols.CONTEXT.DEFAULT_EDITOR,
                kvps: [
                    { key: nkm.app.AppSettings, binding: mkfEditors.FontEditor },
                ]
            });

    }
}

module.exports = Bindings;