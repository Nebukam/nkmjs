const { U, UDOM } = require(`@nkmjs/utils`);
const uicore = require(`@nkmjs/ui-core`);
const { UI_ID, UI, UI_SIGNAL, ExtExpand, Toolbar, ToolButton, DOMTemplate, ExtMouse, UI_FLAG, MOUSE } = uicore;
const { TPLHeaderBodyFooter, TPLFacadeExpandTitle } = uicore.templates;

const InspectorItem = require(`./inspector-item`);

class InspectorGroup extends InspectorItem {
    constructor() { super(); this._staticContentDefault = this._staticContent; }

    _Init() {
        super._Init();

        this._extExpand = new ExtExpand();
        this._extExpand._isExpanded = false;
        this._extExpand.Watch(UI_SIGNAL.EXPANDED, this._Expand, this);
        this._extExpand.Watch(UI_SIGNAL.COLLAPSED, this._Collapse, this);

        this._header = null;
        this._expandOnHeaderAltActivation = U.Default(this._expandOnHeaderAltActivation, true);

        this._useGroupExpand = false;

        this._expandBtnClass = ToolButton;
        this._expandBtn = null;

        this._toolbarClass = Toolbar;
        this._toolbar = null;

        this._footer = null;

        this._staticContent = true; //Always build controllers
        this._alwaysExpanded = false; //Keep group expanded after release (static content only)

        this._interactions.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE_TWICE, this._Bind(this.AltActivate));

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

    _Style() {
        return U.Merge(super._Style(), {
            ':host': {
                //TODO : Implement orientation in styling
                position: `relative`,
                display: `flex`,
                'flex-flow': `column nowrap`,
                'align-content': `stretch`,
                'align-items': `stretch`,
                'margin': `5px`,
                'min-width': 0,
            },
            '.header': {
                position: `relative`,
                display: `flex`,
                'flex-flow': `row nowrap`,
                'align-content': `stretch`,
                'align-items': `stretch`,
                'justify-content': `space-between`,

                flex: `1 1 auto`,
                padding: `12px`,
            },
            '.expandIcon': { flex: `0 0 auto` },
            '.facade': {
                flex: `0 1 auto`,
            },
            '.toolbar': {
                transition: `all 0.3s ease`,
                flex: `0 0 auto`,
                opacity: 0,
            },
            ':host(.focused) .toolbar': {
                opacity: 1
            },
            '.body': {
                position: `relative`,
                display: `flex`,
                'flex-flow': `column nowrap`,
                'align-content': `stretch`,
                'align-items': `stretch`,

                flex: `1 1 auto`,
            },
            '.group': {
                'min-width': 0,
            },
            ':host(.collapsed) .body': {
                display: `none`,
            },
            ':host(.expanded) .body': {
                display: `flex`,
            },
        });
    }

    _Render() {

        DOMTemplate.Render(TPLHeaderBodyFooter, this, { [UI_ID.OWNER]: this });
        DOMTemplate.Render(TPLFacadeExpandTitle, this._header, {
            [UI_ID.OWNER]: this,
            expandIcon: { url: `%ICON%/icon_expand_arrow.svg`, htitle: `Expand` }
        });

        this._toolbar = this.Add(this._toolbarClass, `toolbar`, this._header);

        this._wrapper = this._body;

        if (this._useGroupExpand) {

            this._expandAllBtn = this._toolbar.CreateHandle({
                [UI_ID.ICON]: `%ICON%/icon_expand_all.svg`, text: `Expand All`,
                trigger: { thisArg: this, fn: this.ExpandAll },
            });

            this._collapseAllBtn = this._toolbar.CreateHandle({
                [UI_ID.ICON]: `%ICON%/icon_collapse_all.svg`, text: `Collapse All`,
                trigger: { thisArg: this, fn: this.CollapseAll },
            });

        }

        this.focusArea = this._header;

    }

    Activate(p_evt) {
        if (this._toolbar.focused) { return false; }
        return super.Activate(p_evt);
    }

    AltActivate(p_evt) {
        if (this._toolbar.focused) { return; }
        if (this._expandOnHeaderAltActivation) { this._extExpand.Toggle(); }
    }

    Expand() { this._extExpand.Expand(); }
    _Expand() {

        if (this._data && !this._staticContent) {
            this._BuildContent();
        }

        this._expandIcon.element.classList.remove(UI_FLAG.EXPANDED);
        this._toolbar.hidden = false;
    }

    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {

        if (this._data && !this._staticContent) {
            this._ClearContent();
        }

        this._expandIcon.element.classList.add(UI_FLAG.EXPANDED);
        this._toolbar.hidden = true;
    }

    ExpandAll() {
        this.Expand();
        let list = this._displayObjects;
        let child = null;
        for (let i = 0, n = list.length; i < n; i++) {
            child = list[i];
            if (`Expand` in child) { child.Expand(); }
        }
    }

    CollapseAll() {
        let list = this._displayObjects;
        let child = null;
        for (let i = 0, n = list.length; i < n; i++) {
            child = list[i];
            if (`Collapse` in child) { child.Collapse(); }
        }
    }

    _OnContextChanged() {
        let context = this._context;
        let list = this._displayObjects;
        let child = null;
        for (let i = 0, n = list.length; i < n; i++) {
            child = list[i];
            if (`context` in child) { child.context = context; }
        }
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
UI.Register(`nkmjs-inspector-group`, InspectorGroup);