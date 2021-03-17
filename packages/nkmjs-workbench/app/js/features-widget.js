'use strict';

const nkm = require(`@nkmjs/core`);
const env = nkm.env;
const u = nkm.utils;
const ui = nkm.ui;
const style = nkm.style;

class FeatureLine extends ui.DOMTemplate {
    constructor() { super(); }

    static _CreateTemplate() {
        this._Add(u.dom.New(`div`, { class: ui.IDS.ICON }), {
            [ui.IDS.UID]: ui.IDS.ICON, fn: this.AsIcon
        });
        this._Add(u.dom.New(`span`, { class: ui.IDS.LABEL }), {
            [ui.IDS.UID]: ui.IDS.LABEL, fn: this.AsTextStatic
        });
    }

}

class FeaturesWidget extends ui.DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    _Init() {
        super._Init();
    }

    _PostInit() {

        super._PostInit();
        this._Bind(this._UpdateInfos);

        let updateFn = this._UpdateInfos;
        env.ENV.FEATURES
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
                border: `1px solid #ffffff10`,
                display: `flex`,
                'flex-flow': `column wrap`,
                'overflow': 'hidden',
            }
        }, super._Style());
    }

    _Render() {
        let opts = { [ui.IDS.LABEL]: { [ui.IDS.UID]: `text` } };

        this.line_isBrowser = ui.Render(FeatureLine, this, opts);
        this.line_isMobile = ui.Render(FeatureLine, this, opts);
        this.line_isExtension = ui.Render(FeatureLine, this, opts);
        this.line_isTouchEnabled = ui.Render(FeatureLine, this, opts);
        this.line_hasStorageArea = ui.Render(FeatureLine, this, opts);
        this.line_isCORSEnabled = ui.Render(FeatureLine, this, opts);
        this.line_displayMode = ui.Render(FeatureLine, this, opts);
        this.line_prefersColorScheme = ui.Render(FeatureLine, this, opts);
        this.line_displayType = ui.Render(FeatureLine, this, opts);
        this.line_isNodeEnabled = ui.Render(FeatureLine, this, opts);
    }

    // ----> Update

    _UpdateInfos() {

        let F = env.ENV.FEATURES,
            g = `✔`, b = `❌`;

        this.line_isBrowser.text.Set(`${F._isBrowser ? g : b} isBrowser`);
        this.line_isMobile.text.Set(`${F._isMobile ? g : b} isMobile`);
        this.line_isExtension.text.Set(`${F._isExtension ? g : b} isExtension`);
        this.line_isTouchEnabled.text.Set(`${F._isTouchEnabled ? g : b} isToucheEnabled`);
        this.line_hasStorageArea.text.Set(`${F._hasStorageArea ? g : b} hasStorageArea`);
        this.line_isCORSEnabled.text.Set(`${F._isCORSEnabled ? g : b} isCORSEnabled`);
        this.line_isNodeEnabled.text.Set(`${F._isNodeEnabled ? g : b} isNodeEnabled`);
        this.line_displayMode.text.Set(`▢ displayMode : ${F._displayMode}`);
        this.line_prefersColorScheme.text.Set(`◐ prefersColorScheme : ${F._prefersColorScheme}`);
        this.line_displayType.text.Set(`⎚ displayType : ${F._displayType}`);

    }


}

module.exports = FeaturesWidget;
ui.Register("nkmjs-features", FeaturesWidget);