
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const style = require("@nkmjs/style");

const dom = require("../dom");
const buttons = require("../buttons");

const base = ui.WidgetItem;

class BaseCard extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    static __cardTemplate = null;
    static __cardOptions = {};

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultSize = ui.FLAGS.SIZE_M;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultFlavor = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultVariant = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultHeaderPlacement = ui.FLAGS.TOP;

    static __distribute = base.__distribute.Ext()
        .To(`header-placement`,
            (p_target, p_value) => {
                p_target.mediaPlacement = p_value;
                p_target.orientation = ui.FLAGS.Orientation(p_value, true);
            }, null, `__defaultHeaderPlacement`)
        .To(ui.IDS.VARIANT)
        .To(ui.IDS.TITLE, null, ``)
        .To(ui.IDS.SUBTITLE, null, ``)
        .To(ui.IDS.LABEL, null, ``)
        .To(ui.IDS.SIZE)
        .To(`actions`);

    _Init() {
        super._Init();

        this._actions = null;
        this._handles = null;

        ui.helpers.FlagEnum.Attach(this, ui.IDS.VARIANT, ui.FLAGS.variants);
        ui.helpers.FlagEnum.Attach(this, ui.IDS.SIZE, ui.FLAGS.sizes);
        ui.helpers.FlagEnum.Attach(this, `mediaPlacement`, ui.FLAGS.placementSimplified, `header`);
        ui.helpers.FlagEnum.Attach(this, `orientation`, ui.FLAGS.orientations);

    }

    _PostInit() {
        super._PostInit();
        this.size = this.constructor.__defaultSize;
        this.flavor = this.constructor.__defaultFlavor;
        this.variant = this.constructor.__defaultVariant;
    }

    // ----> DOM

    set title(p_value) { this._frame[ui.IDS.TITLE].Set(p_value); }
    set subtitle(p_value) { this._frame[ui.IDS.SUBTITLE].Set(p_value); }
    set label(p_value) { this._frame[ui.IDS.LABEL].Set(p_value); }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.flex.stretch,
            },

            '.header': {
                ...style.flexItem.shrink,
                'min-height': '100px',
                'min-width': '100px',
            },
            '.body': {
                ...style.flex.column,
                ...style.flexItem.fill,
                //'justify-content': `flex-start`,
                //'align-items': `stretch`,
            },

            //Vertical
            ':host(.header-top)': { ...style.flex.column, },
            ':host(.header-bottom)': { ...style.flex.columnReverse, },
            ':host(.vertical)': {},
            ':host(.vertical) .header': {},

            //Horizontal
            ':host(.header-left)': { ...style.flex.row, },
            ':host(.header-right)': { ...style.flex.rowReverse, },
            ':host(.horizontal)': {},
            ':host(.horizontal) .header': {},

        }, base._Style());
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