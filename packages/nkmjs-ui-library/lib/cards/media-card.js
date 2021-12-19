
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
        this._Add(ui.dom.El(`div`, { class: ui.IDS.HEADER }), { [ui.IDS.UID]: ui.IDS.HEADER, fn: this.AsBackgroundStatic });
        this._Add(ui.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]: ui.IDS.BODY });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.TITLE }), { [ui.IDS.UID]: ui.IDS.TITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.SUBTITLE }), { [ui.IDS.UID]: ui.IDS.SUBTITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(ui.dom.El(`span`, { class: ui.IDS.LABEL }), { [ui.IDS.UID]: ui.IDS.LABEL, parent: ui.IDS.BODY, fn: this.AsText });
    }
}

class MediaCard extends BaseCard {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/cards/media-card.css`]
    }, BaseCard, ['css']);

    _Init() {
        super._Init();
        this._optionsHandler.Hook(`media`);
    }

    // ----> DOM

    set media(p_value) { this._frame[ui.IDS.HEADER].Set(p_value); }
    set mediaDirect(p_value) { this._frame[ui.IDS.HEADER].Set(p_value, true); }

    static __cardTemplate = CardTemplate;
    static __cardOptions = {
        [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: `font-small` }
    };

}

module.exports = MediaCard;
ui.Register(`nkmjs-media-card`, MediaCard);