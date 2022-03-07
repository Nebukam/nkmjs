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

    _Init() {
        super._Init();
        this._screenWidth = window.innerWidth;
        this._screenHeight = window.innerHeight;

        com.time.TIME.Watch(com.SIGNAL.TICK, this._OnTick, this);

        this.style.setProperty(`--screen-width`, this._screenWidt);
        this.style.setProperty(`--screen-height`, this._screenHeight);

    }

    _Style() {
        return style.Extends({
            ':host': {
                'transform':`translate3d(0,0,0)`,
            }
        }, super._Style());
    }

    _OnTick() {

        let
            w = window.innerWidth,
            h = window.innerHeight;

        if (this._screenWidth != w) {
            this.style.setProperty(`--screen-width`, w);
            this._screenWidth = w;
        }

        if (this._screenHeight != h) {
            this.style.setProperty(`--screen-height`, h);
            this._screenHeight = h;
        }

    }

}

module.exports = AppBody;
ui.UI.Register(`nkmjs-app-body`, AppBody);