const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

const InspectorItem = require(`./inspector-item`);

const base = InspectorItem;

class InspectorGroup extends base {
    constructor() { super(); this._staticContentDefault = this._staticContent; }

    static __expandOnAlt = true;

    _Init() {
        super._Init();

        this._extExpand = new ui.extensions.Expand();
        this._extExpand._isExpanded = false;
        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

        this._header = null;

        this._useGroupExpand = false;

        this._expandBtnClass = uilib.buttons.Tool;
        this._expandBtn = null;

        this._toolbarClass = ui.WidgetBar;
        this._toolbar = null;

        this._footer = null;

        this._staticContent = true; //Always build controllers
        this._alwaysExpanded = false; //Keep group expanded after release (static content only)

        this._pointer.Hook(ui.POINTER.KEYS.MOUSE_LEFT, ui.POINTER.KEYS.RELEASE_TWICE, this._Bind(this.AltActivate));

    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._wrapper, this._expandIcon.element);
    }

    // ----> DOM

    get staticContent() { return this._staticContent; }
    set staticContent(p_value) { this._staticContent = p_value; }

    get header() { return this._header; }
    get body() { return this._body; }
    get footer() { return this._footer; }

    static _Style() {
        return style.Extends({
            ':host': {
                //TODO : Implement orientation in styling
                ...style.flex.column,
                ...style.flex.stretch,
                'margin': `5px`,
            },
            '.header': {
                ...style.flex.row,
                ...style.flex.stretch,
                'justify-content': `space-between`,

                ...style.flexItem.fill,
                padding: `12px`,
            },
            '.expandIcon': { ...style.flexItem.fixed, },
            '.facade': {
                ...style.flexItem.shrink,
            },
            '.toolbar': {
                ...style.flexItem.fixed,
                opacity: 0,
            },
            ':host(.focused) .toolbar': {
                opacity: 1
            },
            '.body': {
                ...style.flex.column,
                ...style.flex.stretch,

                ...style.flexItem.fill,
            },
            '.group': {
                ...style.rules.zeroMin.width,
            },
            ':host(.collapsed) .body': {
                ...style.rules.display.none,
            },
            ':host(.expanded) .body': {
                ...style.rules.display.flex,
            },
        }, base._Style());
    }

    _Render() {

        ui.Render(uilib.dom.HeaderBodyFooter, this, { [ui.IDS.OWNER]: this });
        ui.Render(uilib.dom.FacadeExpandTitle, this._header, {
            [ui.IDS.OWNER]: this,
            expandIcon: { url: `%ICON%/icon_expand_arrow.svg`, htitle: `Expand` }
        });

        this._toolbar = this.Attach(this._toolbarClass, `toolbar`, this._header);

        this._wrapper = this._body;

        if (this._useGroupExpand) {

            this._expandAllBtn = this._toolbar.CreateHandle({
                [ui.IDS.ICON]: `%ICON%/icon_expand_all.svg`, text: `Expand All`,
                trigger: { thisArg: this, fn: this.ExpandAll },
            });

            this._collapseAllBtn = this._toolbar.CreateHandle({
                [ui.IDS.ICON]: `%ICON%/icon_collapse_all.svg`, text: `Collapse All`,
                trigger: { thisArg: this, fn: this.CollapseAll },
            });

        }

        this.focusArea = this._header;

    }

    Activate(p_evt) {
        if (this._toolbar.isFocused) { return false; }
        return super.Activate(p_evt);
    }

    AltActivate(p_evt) {
        if (this._toolbar.isFocused) { return; }
        if (this.constructor.__expandOnAlt) { this._extExpand.Toggle(); }
    }

    Expand() { this._extExpand.Expand(); }
    _Expand() {

        if (this._data && !this._staticContent) {
            this._BuildContent();
        }

        ui.dom.CSSClass(this._expandIcon.element, ui.FLAGS.EXPANDED, false);
        this._toolbar.hidden = false;
    }

    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._data && !this._staticContent) { this._ClearContent(); }
        ui.dom.CSSClass(this._expandIcon.element, ui.FLAGS.EXPANDED);
        this._toolbar.hidden = true;
    }

    ExpandAll() {
        this.Expand();
        for (const d of this._displayObjects) { d.Expand?.(); };
    }

    CollapseAll() {
        for (const d of this._displayObjects) { d.Collapse?.(); };
    }

    _OnContextChanged() {
        for (const d of this._displayObjects) { d.context = this._context; };
    }

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);
        this._ClearContent();

        if (this._data) {
            if (this._staticContent) {
                this._BuildContent();
            } else {
                if (this._extExpand.isExpanded) {
                    this._BuildContent();
                } else if (this._data.expanded) {
                    this._extExpand.Expand();
                }
            }
            if (this._alwaysExpanded) { this._extExpand.Expand(false); }
        } else {
            if (!this._alwaysExpanded) { this._extExpand.Collapse(); }
        }
    }

    _BuildContent() {

    }

    _ClearContent() {

    }

    _CleanUp() {
        this._toolbar.Focus(false);
        super._CleanUp();

        if (!this._alwaysExpanded) { this._extExpand.Collapse(); }

        this._extExpand.activator = this._expandBtn;
        this._staticContent = this._staticContentDefault;
    }

}

module.exports = InspectorGroup;
ui.Register(`nkmjs-inspector-group`, InspectorGroup);