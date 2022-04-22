
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const style = require("@nkmjs/style");

const dom = require("../dom");
const buttons = require("../buttons");

const BaseCard = require(`./base-card`);

class CardTemplate extends ui.DOMTemplate {
    constructor() { super(); }
    static _CreateTemplate() {
        this._Add(ui.dom.El(`div`, { class: ui.IDS.HEADER }), { [ui.IDS.UID]: ui.IDS.HEADER });
        this._Add(ui.dom.El(`div`, { class: `floating-${ui.IDS.ICON}` }), { [ui.IDS.UID]: ui.IDS.ICON, parent: ui.IDS.HEADER, fn: this.AsIconStatic });
        this._Add(ui.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]: ui.IDS.BODY });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.TITLE }), { [ui.IDS.UID]: ui.IDS.TITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.SUBTITLE }), { [ui.IDS.UID]: ui.IDS.SUBTITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.LABEL }), { [ui.IDS.UID]: ui.IDS.LABEL, parent: ui.IDS.BODY, fn: this.AsText });
    }
}

const base = BaseCard;

class IconCard extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/cards/icon-card.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(ui.IDS.ICON);

    // ----> DOM

    set icon(p_value) { this._frame[ui.IDS.ICON].Set(p_value); }

    static __cardTemplate = CardTemplate;
    static __cardOptions = {
        [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: `font-small` }
    };

    static _Style() {
        return style.Extends({
            ':host': {
                'display': 'flex',
                'justify-content': `stretch`,
                'align-items': `stretch`,
            },

            '.header': {
                'flex': '0 1 auto',
                'display': 'flex',
                'justify-content': `center`,
                'align-items': `center`,
            },
            '.floating-icon': {
                'flex': '1 1 auto',
            },

        }, base._Style());
    }

}

module.exports = IconCard;
ui.Register(`nkmjs-icon-card`, IconCard);