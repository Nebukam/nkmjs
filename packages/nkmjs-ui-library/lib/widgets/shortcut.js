'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const __KEYS = `keys`;

class ShortcutTemplate extends ui.DOMTemplate {
    constructor() { super(); }
    static _CreateTemplate() {
        this._Add(ui.dom.El(`div`, { class: `floating-${ui.IDS.ICON}` }), { [ui.IDS.UID]: ui.IDS.ICON, fn: this.AsIconStatic });
        this._Add(ui.dom.El(`span`, { class: __KEYS }), { [ui.IDS.UID]: __KEYS, fn: this.AsText });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.LABEL }), { [ui.IDS.UID]: ui.IDS.LABEL, fn: this.AsText });
    }
}

const base = ui.DisplayObject;
class Shortcut extends base {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`, `@/widgets/tag.css`] };

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`shortcut`);

    static __tplOptions = {
        [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: `font-small` }
    };

    _Init() {
        super._Init();
        this._shortcut = null;
        this.constructor.__distribute.Attach(this);
    }

    get htitle() { this.getAttribute(`title`); }
    set htitle(p_value) {
        if (!p_value) { this.removeAttribute(`title`); }
        else { this.setAttribute(`title`, p_value); }
    }

    set label(p_value) { this._tpl[ui.IDS.LABEL].Set(p_value); }

    get shortcut() { return this.this._shortcut; }
    set shortcut(p_value) {
        if (this._shortcut == p_value) { return; }
        let oldShortcut = this._shortcut;
        this._shortcut = p_value;
        if (oldShortcut) {
            oldShortcut
                .Unwatch(actions.SIGNAL.ENABLED, this._OnEnabled, this)
                .Unwatch(actions.SIGNAL.ENABLED, this._OnDisabled, this);
        }
        if (this._shortcut) {
            this._shortcut
                .Watch(actions.SIGNAL.ENABLED, this._OnEnabled, this)
                .Watch(actions.SIGNAL.ENABLED, this._OnDisabled, this);

            if (this._shortcut.isEnabled) { this._OnEnabled(); }
            else { this._OnDisabled(); }

            let nfos = this._shortcut.displayInfos;
            this.htitle = nfos.title;
            this.label = nfos.name;

            let keys = ``;
            for (let i = 0, n = this._shortcut._keys.length; i < n; i++) {
                let k = this._shortcut._keys[i];
                keys += `<span class="key">${k}</span>`;
            }
            this._tpl[__KEYS].Set(keys);


        } else {
            this._OnDisabled();
        }
    }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.flex.row,
            },
        }, base._Style());
    }

    _Render() {
        this._tpl = ui.DOMTemplate.Render(ShortcutTemplate, this, this.constructor.__tplOptions);
    }

    _OnEnabled() {
        this.visible = true;
    }

    _OnDisabled() {
        this.visible = false;
    }

    _CleanUp() {
        this.shortcut = null;
        super._CleanUp();
    }

}

module.exports = Shortcut;
ui.Register(`nkmjs-shortcut`, Shortcut);