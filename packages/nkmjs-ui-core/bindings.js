'use strict';

const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const CONTEXT = require(`./lib/context`);
const REQUEST = require(`./lib/request`);
const overlays = require(`./lib/overlays`);
const INPUT_KEYS = require(`./lib/inputs/keys`);

const commands = require(`./lib/commands`);
const lists = require(`./lib/lists`);


class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        commands.Menu.__defaultMenuClass = lists.MenuRoot;

        this.Add(
            {
                context: CONTEXT.I_TYPE,
                kvps: [

                    { key: data.TYPES.STRING, binding: INPUT_KEYS.STRING },
                    { key: data.TYPES.IDENTIFIER, binding: INPUT_KEYS.STRING_IDENTIFIER },
                    { key: data.TYPES.TEXT, binding: INPUT_KEYS.STRING_TEXT },
                    { key: data.TYPES.TEXT_INLINE, binding: INPUT_KEYS.STRING_TEXT_INLINE },
                    { key: data.TYPES.TEXT_SEARCH, binding: INPUT_KEYS.STRING_TEXT },

                    { key: data.TYPES.COLOR, binding: INPUT_KEYS.COLOR },

                    { key: data.TYPES.PATH, binding: INPUT_KEYS.STRING_PATH },
                    { key: data.TYPES.PATH_FILE, binding: INPUT_KEYS.STRING_PATH },
                    { key: data.TYPES.PATH_DIRECTORY, binding: INPUT_KEYS.STRING_PATH_DIR },

                    { key: data.TYPES.NUMBER, binding: INPUT_KEYS.NUMBER },
                    { key: data.TYPES.NUMBER_SOFT, binding: INPUT_KEYS.NUMBER_DRAG },
                    { key: data.TYPES.MINMAX, binding: INPUT_KEYS.NUMBER_SLIDER },
                    { key: data.TYPES.MINMAX_SOFT, binding: INPUT_KEYS.NUMBER_SLIDER_ONLY },

                    { key: data.TYPES.BOOLEAN, binding: INPUT_KEYS.BOOLEAN },
                    { key: data.TYPES.BOOLEAN_CHECK, binding: INPUT_KEYS.BOOLEAN_CHECK },

                    { key: data.TYPES.ENUM, binding: INPUT_KEYS.ENUM },
                    { key: data.TYPES.ENUM_INLINE, binding: INPUT_KEYS.ENUM_INLINE },
                    { key: data.TYPES.FLAGS, binding: INPUT_KEYS.FLAGS },
                    { key: data.TYPES.FLAGS_INLINE, binding: INPUT_KEYS.FLAGS_INLINE },
                    
                ]
            },
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