'use strict';

const NKMjs = require(`@nkmjs/core`);
const u = NKMjs.utils;
const { UI, manipulators, DisplayObjectContainer } = NKMjs.ui;
const { CSS } = NKMjs.style;

class UIItem extends DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`, `css/test.css`] }

    static __usePaintCallback = true;

    _Init() {
        super._Init();
        this._label = null;
        this._errorTf = null;
        this._sample = null;
        this._visibilityRatio = 0;
        this._isPainted = false;
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

    _OnPaintChange(p_value) {
        //this.style.opacity = this._isPainted ? 1 : 0;
    }

    _Render() {
        this._label = new manipulators.Text(u.dom.New(`p`, { class: `label` }, this));
        this._wrapper = u.dom.New(`div`, { class: `item-wrapper` }, this);
        this._errorTf = new manipulators.Text(u.dom.New(`p`, { class: `error` }, this));
    }

    Display(p_id, p_class, p_variant) {

        let variants = ` `;

        try {
            this._errorTf.Set(null);
            this._sample = this.Add(p_class, `content`, this._wrapper);

            if (p_variant) {
                for (let key in p_variant) {
                    if (key === `flags`) {
                        let flags = p_variant.flags;
                        for (let i = 0, n = flags.length; i < n; i++) { this._flags.Set(flags[i], true); }
                    } else {
                        this._sample[key] = p_variant[key]; variants += `${p_variant[key]} / `;
                    }
                }
            }

            if (`title` in this._sample) { this._sample.title = u.tils.CamelSplit(`${p_class.name}Title`); }
            if (`subtitle` in this._sample) { this._sample.subtitle = u.tils.CamelSplit(`${p_class.name}Subtitle`); }
            if (`label` in this._sample) { this._sample.label = u.tils.CamelSplit(`${p_class.name}Label`); }

        } catch (e) {
            this._errorTf.Set(e.message);
            this.order = -1;
            throw e;
            console.error(e);
        }

        this._label.Set(`<b>${p_id}</b><br/><i>${p_class.name}</i><br/><i><small>.${variants}</small></i>`);
    }

}

module.exports = UIItem;
UI.Register(`nkmjs-ui-item`, UIItem);