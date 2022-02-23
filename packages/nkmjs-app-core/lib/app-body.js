'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

class AppBody extends ui.views.LayerContainer {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/global.css`]
    }, ui.views.LayerContainer, ['css']);

}

module.exports = AppBody;
ui.UI.Register(`nkmjs-app-body`, AppBody);