'use strict';

const com = require("@nkmjs/common");

const REQUEST = require(`./lib/request`);
const overlays = require(`./lib/overlays`);

const commands = require(`./lib/commands`);
const lists = require(`./lib/lists`);


class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        commands.Menu.__defaultMenuClass = lists.MenuRoot;

        this.Add(
            {
                context: overlays.CONTEXT.OVERLAY,
                kvps: [
                    { key: REQUEST.OVERLAY, binding: overlays.Overlay },
                    //{ key: REQUEST.DRAWER, binding: overlays.DrawerOverlay }
                ]
            },
            {
                context: overlays.CONTEXT.CONTENT,
                kvps: [
                    //{ key: REQUEST.DRAWER, binding: overlays.Drawer }
                ]
            });

    }
}

module.exports = Bindings;