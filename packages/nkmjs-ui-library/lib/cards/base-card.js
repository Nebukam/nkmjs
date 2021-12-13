
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const style = require("@nkmjs/style");

const dom = require("../dom");
const buttons = require("../buttons");

class BaseCard extends ui.WidgetItem {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, ui.WidgetItem, ['css']);

    static __cardTemplate = null;
    static __cardOptions = {};

    static __default_headerPlacement = ui.FLAGS.TOP;

    _Init() {
        super._Init();

        this._actions = null;
        this._handles = null;

        this._orientation = new ui.helpers.FlagEnum(ui.FLAGS.orientations, true);
        this._orientation.Add(this);

        this._variantEnum = new ui.helpers.FlagEnum(ui.FLAGS.variants, true);
        this._variantEnum.Add(this);

        this._mediaPlacement = new ui.helpers.FlagEnum(ui.FLAGS.placementSimplified, true, `header`);
        this._mediaPlacement.Add(this);

        this._optionsHandler.Hook(`header-placement`,
            (p_value) => {
                this._mediaPlacement.Set(p_value);
                this._orientation.Set(ui.FLAGS.Orientation(p_value, true));
            }, this.constructor.__default_headerPlacement);
        this._optionsHandler.Hook(`variant`, (p_value) => { this._variantEnum.Set(p_value); });
        this._optionsHandler.Hook(ui.IDS.TITLE, null, ``);
        this._optionsHandler.Hook(ui.IDS.SUBTITLE, null, ``);
        this._optionsHandler.Hook(ui.IDS.LABEL, null, ``);
        this._optionsHandler.Hook(`actions`);

    }

    // ----> DOM

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

            '.header': {
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
            ':host(.header-top)': { 'flex-flow': 'column nowrap', },
            ':host(.header-bottom)': { 'flex-flow': 'column-reverse nowrap' },
            ':host(.vertical)': {},
            ':host(.vertical) .header': {},

            //Horizontal
            ':host(.header-left)': { 'flex-flow': 'row nowrap', },
            ':host(.header-right)': { 'flex-flow': 'row-reverse nowrap', },
            ':host(.horizontal)': {},
            ':host(.horizontal) .header': {},

        }, super._Style());
    }

    _Render() {
        super._Render();
        this.focusArea = this;
        this._frame = ui.DOMTemplate.Render(this.constructor.__cardTemplate, this, this.constructor.__cardOptions);
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

        } else if (this._toolbar) {
            this._toolbar.Release();
            this._toolbar = null;
            this._handles.length = 0;
        }

    }

}

module.exports = BaseCard;