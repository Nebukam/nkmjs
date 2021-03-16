'use strict';

const nkm = require(`@nkmjs/core`);
const env = nkm.env;
const u = nkm.utils;
const { UI, manipulators, DisplayObjectContainer } = nkm.ui;
const { CSS } = nkm.style;

class FeaturesWidget extends DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    static __usePaintCallback = true;

    _Init() {
        super._Init();
        this._label = null;
        this._errorTf = null;
        this._sample = null;
        this._visibilityRatio = 0;
        this._isPainted = false;
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
        return CSS.Extends({
            ':host': {
                //opacity: 0,
                margin: `5px`,
                padding: `5px`,
                border: `1px solid #ffffff10`,
                display: `flex`,
                'flex-flow': `column wrap`,
                'overflow': 'hidden',
            },
            '.label': {
                'margin-block-start': 0,
                'margin-block-end': 0,
                'margin-bottom': `5px`,
                'transform': 'scale(0.8,0.8)',
            },
            '.item-wrapper': {
                position: `relative`,
                padding: `5px`,
                display: `flex`,
                'align-items': `center`,
                'justify-content': `center`,
                flex: `1 1 auto`,
                //'background-color': 'rgba(200,200,200,1)',
                'background-image': `url('img/checker_20a.png')`,
                'overflow': 'hidden',
                'min-width': 0,
                'min-height': 0,
            },
            '.content': {
                flex: `1 1 auto`
            },
            'p.error': {
                color: `#ff0000`
            }
        }, super._Style());
    }

    _UpdateInfos() {

    }

    _Render() {
        this._label = new manipulators.Text(u.dom.New(`p`, { class: `label` }, this));
        this._wrapper = u.dom.New(`div`, { class: `item-wrapper` }, this);
        this._errorTf = new manipulators.Text(u.dom.New(`p`, { class: `error` }, this));
    }


}

module.exports = FeaturesWidget;
UI.Register(`nkmjs-features`, FeaturesWidget);