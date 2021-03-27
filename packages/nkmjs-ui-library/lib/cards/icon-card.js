
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
        this._Add(u.dom.El(`div`, { class: ui.IDS.HEADER }), { [ui.IDS.UID]: ui.IDS.HEADER });
        this._Add(u.dom.El(`div`, { class: `floating-${ui.IDS.ICON}` }), { [ui.IDS.UID]: ui.IDS.ICON, parent: ui.IDS.HEADER, fn: this.AsIconStatic });
        this._Add(u.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]: ui.IDS.BODY });
        this._Add(u.dom.El(`span`, { class: ui.IDS.TITLE }), { [ui.IDS.UID]: ui.IDS.TITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(u.dom.El(`span`, { class: ui.IDS.SUBTITLE }), { [ui.IDS.UID]: ui.IDS.SUBTITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(u.dom.El(`span`, { class: ui.IDS.LABEL }), { [ui.IDS.UID]: ui.IDS.LABEL, parent: ui.IDS.BODY, fn: this.AsText });
    }
}

class IconCard extends BaseCard {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/cards/icon-card.css`]
    }, BaseCard, ['css']);

    _Init() {
        super._Init();
        this._optionsHandler.Hook(`icon`);
    }

    // ----> DOM

    set icon(p_value) { this._frame[ui.IDS.ICON].Set(p_value); }

    static __cardTemplate = CardTemplate;
    static __cardOptions = {
        [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: `font-small` }
    };

    _Style() {
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

        }, super._Style());
    }

}

module.exports = IconCard;
ui.Register(`nkmjs-icon-card`, IconCard);