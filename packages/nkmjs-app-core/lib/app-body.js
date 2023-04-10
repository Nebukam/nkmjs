'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

const base = ui.views.LayerContainer;

class AppBody extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/global.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._screenWidth = window.innerWidth;
        this._screenHeight = window.innerHeight;

        com.time.TIME.Watch(com.SIGNAL.TICK, this._OnTick, this);

        ui.dom.CSS(this, {
            [`--screen-width`]: this._screenWidth,
            [`--screen-height`]: this._screenWidth,
        });

        this._layerConfigs = null;
        this._overlayHandler = null;

    }

    static _Style() {
        return style.Extends({
            ':host': {
                'transform': `translate3d(0,0,0)`,
            }
        }, base._Style());
    }

    BuildLayers(p_owner, p_layerConfigs) {

        this._layerConfigs = p_layerConfigs;

        let layerCount = p_layerConfigs ? p_layerConfigs.length : 0;

        if (layerCount == 0) {
            throw new Error(`no body layer`);
        }

        for (let i = 0, n = layerCount; i < n; i++) {
            let conf = p_layerConfigs[i],
                layer = this.Attach(conf.cl);

            conf.layer = layer;
            if (conf.id) { p_owner[conf.id] = layer; }
            if (conf.fn) { u.Call(conf.fn, layer, conf); }
        }

        for (let i = 0, n = layerCount; i < n; i++) {
            let conf = p_layerConfigs[i];
            if (conf.postFn) { u.Call(conf.postFn, conf.layer, conf); }
        }

    }

    _OnTick() {

        let
            w = window.innerWidth,
            h = window.innerHeight;

        if (this._screenWidth != w) {
            ui.dom.CSS(this, `--screen-width`, w);
            this._screenWidth = w;
        }

        if (this._screenHeight != h) {
            ui.dom.CSS(this, `--screen-height`, h);
            this._screenHeight = h;
        }

    }

}

module.exports = AppBody;
ui.UI.Register(`nkmjs-app-body`, AppBody);