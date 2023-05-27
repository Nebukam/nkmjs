'use struct';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const ControlBuilder = require(`./helpers/control-builder`);

const base = require(`./control-view`);
class ControlFoldout extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/foldout.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(ui.IDS.LABEL)
        .To(ui.IDS.ICON)
        .To(`htitle`)
        .To(`handles`)
        .To(ui.IDS.NAME, ui.IDS.LABEL)
        .To(ui.IDS.TITLE, ui.IDS.LABEL)
        .To(`expanded`, null, false)
        .To(`prefId`)
        .To(ui.IDS.FLAVOR)
        .To(ui.IDS.VARIANT)
        .To(`builderOptions`)
        .To(`controls`);

    static __builderOptions = null;
    static __buildOnExpand = false;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultVariant = null;

    _Init() {
        super._Init();

        this._pointer.Hook(ui.POINTER.KEYS.MOUSE_LEFT, ui.POINTER.KEYS.RELEASE_TWICE, this._Bind(this.AltActivate));

        this._extExpand = this._extensions.Add(ui.extensions.Expand);
        this._extExpand._toggled = false;

        this._prefId = null;
        this._tempControls = null;

        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

        ui.helpers.FlagEnum.Attach(this, ui.IDS.FLAVOR, ui.FLAGS.flavorsExtended);
        ui.helpers.FlagEnum.Attach(this, ui.IDS.VARIANT, ui.FLAGS.variants);

        this.focusArea = this;

        if (this.constructor.__builderOptions) { this._builder.options = this.constructor.__builderOptions; }

    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._body, this._expandIcon.element);
        this._builder.host = this._body;
        this._builder.defaultCSS = `item`;
        this._rendered = true;
    }

    get builder() { return this._builder; }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value) { this._label.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._icon.Set(p_value); }

    get expanded() { return this._extExpand.isExpanded; }
    set expanded(p_value) {
        if (p_value) { this.Expand(); }
        else { this.Collapse(); }
    }

    get prefId() { return this._prefId; }
    set prefId(p_value) {
        this._prefId = p_value;
        if (this._prefId) { this.expanded = nkm.env.prefs.GetOrSet(`ui.foldout.${this._prefId}.expanded`, this.expanded); }
    }

    set handles(p_handles) { this._toolbar.CreateHandles(...p_handles); }

    set controls(p_value) {

        this._builder.Clear();
        this._instanceControls = p_value;

        if (p_value) {
            this._dynamicBuilder = true;
            if (this.constructor.__buildOnExpand) {
                if (this.expanded) { this._builder.Build(p_value); }
            } else {
                this._builder.Build(p_value);
            }
        }

    }

    set builderOptions(p_value) { this._builder.options = p_value; }

    static _Style() {
        return {
            ':host': {
                ...style.flex.rows,
                'justify-content': 'flex-start',
                'align-items': `stretch`,
                'box-sizing': `border-box`
            },

            ':host(.expanded)': { 'height': 'auto', },
            ':host(.expanded) .icon.expand': { 'transform': `rotate(90deg)` },
            '.header': {
                ...style.flex.row,
                ...style.flex.align.center.all,

                'box-sizing': `border-box`,

                ...style.flexItem.fill,
                'width': `100%`,
                'justify-items': `flex-start`,
            },
            '.toolbar': {
                ...style.flexItem.fixed,
            },

            '.label': {
                ...style.flexItem.fill,
            },

            '.body': {
                ...style.flex.rows,
                ...nkm.style.rules.gap.small,

                ...style.flexItem.grow,
                'max-width': `100%`,

                ...style.rules.display.none,
            },
            ':host(.expanded) .body': { ...style.rules.display.flex, },
            '.body div': {
                ...style.flexItem.fill,
            },
            ...style.flexItem.items.prefix(`.body`),
        };
    }

    _Render() {

        ui.DOMTemplate.Render(nkm.uilib.dom.BodyExpand, this, {
            [ui.IDS.OWNER]: this,
            //[ui.IDS.ICON]: { autoHide: true },
            expandIcon: { htitle: `Expand` }
        });

        
        this._icon.autoHide = true;
        this._label.ellipsis = true;

        this._toolbar = this.Attach(ui.WidgetBar, `toolbar`, this._header);
        this._toolbar.options = {
            size: ui.FLAGS.SIZE_S,
            inline: true,
            defaultWidgetClass: nkm.uilib.buttons.Tool,
        };

        this._wrapper = this._body;

        if (!this.constructor.__buildOnExpand) {
            //  this._builder.Build(this.constructor.__controls || this._instanceControls);
            super._Render();
        }

        //this.focusArea = this._header;
    }

    _OnChildAttached(p_displayObject, p_index) {
        super._OnChildAttached?.(p_displayObject, p_index);
        if (this._rendered) { ui.dom.CSSClass(p_displayObject, 'item'); }
    }

    get body() { return this._body; }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    AltActivate(p_evt) {
        if ((this._toolbar && this._toolbar.isFocused) || !this._header.matches(':hover')) { return; }
        this._extExpand.Toggle();
    }

    /**
     * @description TODO
     */
    Expand() { this._extExpand.Expand(); }
    _Expand() {
        if (this._prefId) { this.expanded = nkm.env.prefs.Set(`ui.foldout.${this._prefId}.expanded`, true); }
        if (this.constructor.__buildOnExpand) {
            this._builder.Build(this.constructor.__controls || this._instanceControls);
        }
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._prefId) { this.expanded = nkm.env.prefs.Set(`ui.foldout.${this._prefId}.expanded`, false); }
        if (this.constructor.__buildOnExpand) { this._builder.Clear(); }
    }

    _CleanUp() {
        if (this._instanceControls) {
            this._builder.Clear();
            this._instanceControls = null;
        }

        this._prefId = null;
        this._toolbar.Clear();
        this.expanded = false;
        this._dynamicBuilder = false;

        super._CleanUp();
    }

}

module.exports = ControlFoldout;
ui.Register(`nkmjs-control-foldout`, ControlFoldout);