'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const dom = require(`../dom`);
const Tool = require(`../buttons/button-tool`);

const base = ui.Widget;

class Foldout extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/foldout.css`]
    }, base, ['css']);

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(ui.IDS.LABEL)
        .To(ui.IDS.ICON)
        .To(`htitle`)
        .To(`handles`)
        .To(ui.IDS.NAME, ui.IDS.LABEL)
        .To(ui.IDS.TITLE, ui.IDS.LABEL)
        .To(`expanded`, null, false)
        .To(`prefId`);

    _Init() {
        super._Init();

        this._pointer.Hook(ui.POINTER.KEYS.MOUSE_LEFT, ui.POINTER.KEYS.RELEASE_TWICE, this._Bind(this.AltActivate));

        this._extExpand = this._extensions.Add(ui.extensions.Expand);
        this._extExpand._toggled = false;

        this._prefId = null;

        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

        this.focusArea = this;

    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._body, this._expandIcon.element);
    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

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

    //TODO : Body must break flex row
    static _Style() {
        return {
            ':host': {
                ...style.rules.pos.rel,
                ...style.rules.flex.row.wrap,
                'justify-content': 'flex-start',
                'align-items': `stretch`,
                'box-sizing': `border-box`
            },

            ':host(.expanded)': { 'height': 'auto', },
            ':host(.expanded) .icon.expand': { 'transform': `rotate(90deg)` },
            '.header': {
                ...style.rules.pos.rel,
                ...style.rules.flex.row.centerNowrap,

                'box-sizing': `border-box`,

                ...style.rules.item.fill,
                'width': `100%`,
                'justify-items': `flex-start`,
            },
            '.toolbar': {
                ...style.rules.item.fixed,
            },

            '.label': {
                ...style.rules.item.fill,
            },

            '.body': {
                ...style.rules.pos.rel,
                ...style.rules.flex.row.wrap,
                ...nkm.style.rules.gap.small,

                ...style.rules.item.grow,
                'max-width': `100%`,

                ...style.rules.display.none,
            },
            ':host(.expanded) .body': { ...style.rules.display.flex, },
            ':host(.expanded) .header': { 'margin-bottom': `5px` },
            '.foldout-item': {
                ...style.rules.item.fill,
                'margin': '0',
            },
            '.foldout-item.full': { 'flex': '1 1 100%', },
            '.foldout-item.large': { 'flex': '1 1 75%', },
            '.foldout-item.medium': { 'flex': '1 1 45%', },
            '.foldout-item.small': { 'flex': '1 1 25%', },
            '.foldout-item.vsmall': { 'flex': '1 1 15%', },
            '.fixed': { 'flex-grow': '0', 'flex-shrink': '0', }
        };
    }

    _Render() {

        ui.DOMTemplate.Render(dom.BodyExpand, this, {
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
            defaultWidgetClass: Tool,
        };

        this._wrapper = this._body;

        //this.focusArea = this._header;

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
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._prefId) { this.expanded = nkm.env.prefs.Set(`ui.foldout.${this._prefId}.expanded`, false); }
    }

    _CleanUp() {
        this._prefId = null;
        this._toolbar.Clear();
        this.expanded = false;
        super._CleanUp();
    }

}

module.exports = Foldout;
ui.Register(`nkmjs-foldout`, Foldout);