'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.DisplayObject;
class ProgressBar extends base {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }
    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`hideWhenComplete`)
        .To(ui.IDS.SIZE)
        .To(ui.IDS.FLAVOR);

    _Init() {
        super._Init();

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

    }

    /**
     * @description TODO
     * @type {object}
     */
    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    set hideWhenComplete(p_value) { this._hideWhenComplete = p_value; }
    set size(p_value) { this._sizeEnum.Set(p_value); }
    set flavor(p_value) { this._flavorEnum.Set(p_value); }
    set inverted(p_value) { ui.dom.CSSClass(this, `inverted`, p_value); }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.fadeIn,
                'opacity': 0,
                ...style.rules.pos.rel,
                'height': 'var(--size)',
                'min-height': 'var(--size)',
                'max-height': 'var(--size)',
                '--bg-color': 'var(--flavor-color-low-rgb)',
                '--bar-color': 'var(--flavor-color)',

                'background-color': 'rgba(var(--bg-color), 0.1)',
            },
            ':host(.inverted)': {
                //'backdrop-filter': 'blur(2px)'
            },
            ':host(.complete)': {
                'display': 'none'
            },
            '.bar': {
                'position': `absolute`,
                'width': 'var(--progress, 0%)',
                'height': '100%',
                'background-color': 'var(--bar-color)',
            },
            ':host(.inverted) .bar': {
                'backdrop-filter': 'blur(10px)',
                'width': 'calc(100% - var(--progress, 0%))',
                'right': '0px'
            }
        }, base._Style());
    }

    _Render() {
        this._bar = ui.El(`div`, { class: `bar` }, this._host);
        this.style.opacity = 1;
    }

    SetColors(p_bg = null, p_bar = null) {
        if (!p_bg && !p_bar) {
            ui.dom.CSS(this, {
                ['--bg-color']: 'var(--flavor-color-low-rgb)',
                ['--bar-color']: 'var(--flavor-color)',
            });
        } else {
            if (p_bg) { ui.dom.CSS(this, '--bg-color', p_bg); }
            if (p_bar) { ui.dom.CSS(this, '--bar-color', p_bar); }
        }
    }

    set progress(p_value) {
        let p = Math.max(Math.min(p_value, 1), 0);
        if (this._hideWhenComplete) { ui.dom.CSSClass(this, `complete`, p == 1); }
        ui.dom.CSS(this, `--progress`, `${p * 100}%`);
    }

}

module.exports = ProgressBar;
ui.Register(`nkmjs-progress-bar`, ProgressBar);