'use strict';

const nkm = require(`@nkmjs/core`);
const env = nkm.env;
const u = nkm.u;
const ui = nkm.ui;
const style = nkm.style;

class FeatureLine extends ui.DOMTemplate {
    constructor() { super(); }

    static _CreateTemplate() {
        let wrapper = `wrapper`;
        this._Add(ui.dom.El(`li`, { class: `item` }), {
            [ui.IDS.UID]: wrapper
        });
        this._Add(ui.dom.El(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: ui.IDS.ICON, parent: wrapper, fn: this.AsIcon
        });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: ui.IDS.LABEL, parent: wrapper, fn: this.AsTextStatic
        });
    }

}

class FeaturesWidget extends ui.DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    _Init() {
        super._Init();

        this._items = [
            { id: `isBrowser` },
            { id: `isMobile` },
            { id: `isExtension` },
            { id: `isTouchEnabled` },
            { id: `hasStorageArea` },
            { id: `isCORSEnabled` },
            { id: `isNodeEnabled` },
            { id: `displayMode`, icon: `▢ `, title: `displayMode`, type: `enum` },
            { id: `prefersColorScheme`, icon: `◐ `, title: `prefersColorScheme`, type: `enum` },
            { id: `displayType`, icon: `⎚ `, title: `displayType`, type: `enum` },
        ];

    }

    _PostInit() {

        super._PostInit();
        this._Bind(this._UpdateInfos);

        let updateFn = this._UpdateInfos;
        env.features
            .Watch(env.SIGNAL.DISPLAY_MODE_CHANGED, updateFn)
            .Watch(env.SIGNAL.COLOR_SCHEME_CHANGED, updateFn)
            .Watch(env.SIGNAL.DISPLAY_TYPE_CHANGED, updateFn);

        updateFn();

    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                //opacity: 0,
                margin: `5px`,
                padding: `5px`,
                'overflow': 'hidden',
            },
            '.item::marker': {
                'width':'25px',
                'content': 'attr(data-marker)'
            }
        }, super._Style());
    }

    _Render() {
        var opts = { [ui.IDS.LABEL]: { [ui.IDS.UID]: `text` } };
        this._items.forEach((item) => { item.line = ui.Render(FeatureLine, this, opts); });
    }

    // ----> Update

    _UpdateInfos() {

        var F = env.features;

        this._items.forEach((item) => {
            let marker = ``;
            switch (item.type) {
                case `enum`:
                    marker = (item.icon || `-`);
                    item.line.text.Set(`${(item.title || item.id)} : ${F[`_${item.id}`]}`); break;
                default:
                    marker = F[`_${item.id}`] ? `✔` : `❌`;
                    item.line.text.Set((item.title || item.id)); break;
            }

            item.line.wrapper.setAttribute(`data-marker`, marker);

        });

    }


}

module.exports = FeaturesWidget;
ui.Register("nkmjs-features", FeaturesWidget);