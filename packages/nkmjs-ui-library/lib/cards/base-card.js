
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

    /**
     * @description TODO
     * @type {string}
     */
    static __default_size = ui.FLAGS.SIZE_M;

    /**
     * @description TODO
     * @type {string}
     */
    static __default_flavor = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __default_variant = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __default_headerPlacement = ui.FLAGS.TOP;

    _Init() {
        super._Init();

        this._actions = null;
        this._handles = null;

        this._variantEnum = new ui.helpers.FlagEnum(ui.FLAGS.variants, true);
        this._variantEnum.Add(this);

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._mediaPlacement = new ui.helpers.FlagEnum(ui.FLAGS.placementSimplified, true, `header`);
        this._mediaPlacement.Add(this);

        this._orientation = new ui.helpers.FlagEnum(ui.FLAGS.orientations, true);
        this._orientation.Add(this);

        this._distribute
            .To(`header-placement`,
                (p_value) => {
                    this._mediaPlacement.Set(p_value);
                    this._orientation.Set(ui.FLAGS.Orientation(p_value, true));
                }, this.constructor.__default_headerPlacement)
            .To(ui.IDS.VARIANT)
            .To(ui.IDS.TITLE, null, ``)
            .To(ui.IDS.SUBTITLE, null, ``)
            .To(ui.IDS.LABEL, null, ``)
            .To(ui.IDS.SIZE)
            .To(`actions`);

    }

    _PostInit() {
        super._PostInit();
        this._sizeEnum.Set(this.constructor.__default_size);
        this._flavorEnum.Set(this.constructor.__default_flavor);
        this._variantEnum.Set(this.constructor.__default_variant);
    }

    // ----> DOM

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set variant(p_value) { this._variantEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     */
    get variant() { return this._variantEnum.currentFlag; }

    /**
    * @description TODO
    * @type {ui.core.helpers.FlagEnum}
    * @customtag read-only
    * @group Styling
    */
    get size() { return this._sizeEnum.currentFlag; }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     * @group Styling
     */
    set size(p_value) { this._sizeEnum.Set(p_value); }


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
                'min-width': 0,
                'min-height': 0,
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
                this._toolbar = this.Attach(ui.WidgetBar, `toolbar`, this._frame[ui.IDS.BODY]);
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