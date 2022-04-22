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

    static _Style() {
        return style.Extends({
            ':host': {
                'position': 'relative',
                'height': 'var(--size)',
                'min-height': 'var(--size)',
                'max-height': 'var(--size)',
                'background-color': 'rgba(var(--flavor-color-dark-rgb), 0.1)',
            },
            '.bar': {
                'position': `absolute`,
                'width': 'var(--progress, 0%)',
                'height': '100%',
                'background-color': 'var(--flavor-color)',
            }
        }, base._Style());
    }

    _Render() { this._bar = ui.El(`div`, { class: `bar` }, this._host); }

    set progress(p_value) {
        let p = Math.max(Math.min(p_value, 1), 0);
        if (this._hideWhenComplete) { if (p == 1) { p = 0; } }
        this.style.setProperty(`--progress`, `${p * 100}%`)
    }

}

module.exports = ProgressBar;
ui.Register(`nkmjs-progress-bar`, ProgressBar);