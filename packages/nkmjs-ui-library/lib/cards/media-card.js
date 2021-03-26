
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const style = require("@nkmjs/style");

const dom = require("../dom");
const buttons = require("../buttons");

const __media = `media`;

class CardTemplate extends ui.DOMTemplate {
    constructor() { super(); }
    static _CreateTemplate() {
        this._Add(u.dom.El(`div`, { class: __media }), { [ui.IDS.UID]: __media, fn: this.AsBackgroundStatic });
        this._Add(u.dom.El(`div`, { class: ui.IDS.BODY }), { [ui.IDS.UID]: ui.IDS.BODY });
        this._Add(u.dom.El(`span`, { class: ui.IDS.TITLE }), { [ui.IDS.UID]: ui.IDS.TITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(u.dom.El(`span`, { class: ui.IDS.SUBTITLE }), { [ui.IDS.UID]: ui.IDS.SUBTITLE, parent: ui.IDS.BODY, fn: this.AsText });
        this._Add(u.dom.El(`span`, { class: ui.IDS.LABEL }), { [ui.IDS.UID]: ui.IDS.LABEL, parent: ui.IDS.BODY, fn: this.AsText });
    }
}

class MediaCard extends ui.WidgetItem {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/cards/media-card.css`]
    }, ui.WidgetItem, ['css']);

    _Init() {
        super._Init();

        this._actions = null;
        this._handles = null;

        this._orientation = new ui.helpers.FlagEnum(ui.FLAGS.orientations, true);
        this._orientation.Add(this);

        this._variantEnum = new ui.helpers.FlagEnum(ui.FLAGS.variants, true);
        this._variantEnum.Add(this);

        this._mediaPlacement = new ui.helpers.FlagEnum(ui.FLAGS.placementSimplified, true, `media`);
        this._mediaPlacement.Add(this);

        this._optionsHandler.Hook(`media-placement`,
            (p_value) => {
                this._mediaPlacement.Set(p_value);
                this._orientation.Set(ui.FLAGS.Orientation(p_value, true));
            }, ui.FLAGS.TOP);
        this._optionsHandler.Hook(`variant`, (p_value) => { this._variantEnum.Set(p_value); });
        this._optionsHandler.Hook(__media);
        this._optionsHandler.Hook(ui.IDS.TITLE, null, ``);
        this._optionsHandler.Hook(ui.IDS.SUBTITLE, null, ``);
        this._optionsHandler.Hook(ui.IDS.LABEL, null, ``);
        this._optionsHandler.Hook(`actions`);

    }

    // ----> DOM

    set media(p_value) { this._frame[__media].Set(p_value); }

    set title(p_value) { this._frame[ui.IDS.TITLE].Set(p_value); }
    set subtitle(p_value) { this._frame[ui.IDS.SUBTITLE].Set(p_value); }
    set label(p_value) { this._frame[ui.IDS.LABEL].Set(p_value); }

    _Style() {
        return style.Extends({
            ':host': {
                'display': 'flex',
                'justify-content': `stretch`,
                'align-items': `stretch`,
            },

            '.media': {
                'flex': '0 1 auto',
                'min-height': '100px',
                'min-width': '100px',
            },
            '.body': {
                'flex': '1 1 auto',

                'display': 'flex',
                'flex-flow': 'column nowrap',
                //'justify-content': `flex-start`,
                //'align-items': `stretch`,
            },

            //Vertical
            ':host(.media-top)': { 'flex-flow': 'column nowrap', },
            ':host(.media-bottom)': { 'flex-flow': 'column-reverse nowrap' },
            ':host(.vertical)': { },
            ':host(.vertical) .media': {},

            //Horizontal
            ':host(.media-left)': { 'flex-flow': 'row nowrap', },
            ':host(.media-right)': { 'flex-flow': 'row-reverse nowrap', },
            ':host(.horizontal)': { },
            ':host(.horizontal) .media': {},

        }, super._Style());
    }

    _Render() {
        super._Render();
        this._frame = ui.DOMTemplate.Render(CardTemplate, this, {
            [ui.IDS.LABEL]: { [ui.IDS.CSS_CL]: `font-small` }
        });
    }

    // ----> Actions

    set actions(p_value) {

        if (this._actions == p_value) { return; }

        let oldActions = this._actions;
        this._actions = p_value;

        if (oldActions && this._toolbar) {
            this._toolbar.Clear();
            this._handles.length = 0;
        }

        if (this._actions) {
            if (!this._toolbar) {
                this._toolbar = this.Add(ui.WidgetBar, `toolbar`, this._frame[ui.IDS.BODY]);
                this._toolbar._defaultWidgetClass = buttons.Button;
            }
            this._handles = this._toolbar.CreateHandles(...this._actions);
            console.log(`ACTIOOOOON`);
        } else if (this._toolbar) {
            this._toolbar.Release();
            this._toolbar = null;
            this._handles.length = 0;
        }

    }
}

module.exports = MediaCard;
ui.Register(`nkmjs-media-card`, MediaCard);