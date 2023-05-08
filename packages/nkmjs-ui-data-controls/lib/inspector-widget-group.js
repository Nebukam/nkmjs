/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * - provide a context for registering specific sub-inspectors
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const InspectorWidget = require("./inspector-widget");

const base = InspectorWidget;

/**
 * @description An InspectorWidgetGroup is an InspectorWidget designed to be used inside an InspectorView or an Editor.
 * As a 'group' component, it offers the ability to expand & collapse a list of controls
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.InspectorWidget
 * @memberof ui.datacontrols
 */
class InspectorWidgetGroup extends base {
    constructor() { super(); }

    static __controls = null;
    static __buildOnRender = false;
    static __clearBuilderOnRelease = true;
    static __widgetExpandData = false;
    static __clearToolbarOnRelease = false;

    _Init() {

        super._Init();

        this._pointer.Hook(ui.POINTER.KEYS.MOUSE_LEFT, ui.POINTER.KEYS.RELEASE_TWICE, this._Bind(this.AltActivate));

        this._contentBuilt = false;

        this._extExpand = this._extensions.Add(ui.extensions.Expand);
        this._extExpand._toggled = false;

        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

    }

    //#region DOM

    static _Style() {
        return style.Extends({
            ':host': {
                //'@': ['fade-in'],

                'position': `relative`,

                'display': `flex`,
                'flex-flow': `column nowrap`,
                'justify-content': 'flex-start',
                'align-items': `stretch`,

                'box-sizing': `border-box`,

            },
            ':host(.expanded)': { 'height': 'auto', },
            ':host(.expanded) .icon.expand': { 'transform': `rotate(90deg)` },

            '.header': {
                'box-sizing': `border-box`,

                'flex': '1 1 auto',
                'width': `100%`,

                'position': `relative`,
                'display': 'flex',
                'flex-flow': `row nowrap`,
                'align-items': `center`,
                'justify-items': `flex-start`,
            },

            '.toolbar': {
                'flex': '0 0 auto',
            },

            '.label': {
                'flex': '1 1 auto'
            },

            '.body': {
                'position': `relative`,
                'flex': '1 0 auto',
                'min-width': 0,
                'flex-flow': `column nowrap`,
            },

            ':host(.expanded) .body': { 'display': `flex` },
            ':host(:not(.expanded)) .body': { 'display': `none` },
            ':host(.expanded) .header': { 'margin-bottom': `5px` },

        }, base._Style());
    }

    _Render() {

        ui.DOMTemplate.Render(nkm.uilib.dom.BodyExpand, this, {
            [ui.IDS.OWNER]: this,
            //[ui.IDS.ICON]: { autoHide: true },
            expandIcon: { htitle: `Expand` }
        });

        this._wrapper = this._body;

        super._Render();

        this._toolbar = this.Attach(ui.WidgetBar, `toolbar`, this._header);

        //this.focusArea = this._header;

    }

    //#endregion

    //#region Expand/Collapse

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        if (this._data) {

            if (this._data.expanded) {
                this._extExpand.Expand(false);
            } else if (this._extExpand.isExpanded) {
                if (this.constructor.__widgetExpandData) { this._data.expanded = true; }
                else { this._extExpand.Collapse(); }
            }

        } else {
            this._extExpand.Collapse();
        }

    }

    /**
     * @description TODO
     */
    Expand() { this._extExpand.Expand(); }
    _Expand() {
        if (this._data) {
            this._data.expanded = true;
            this._BuildContent();
        }
    }

    _BuildContent() {
        if (this._contentBuilt) { return false; }
        if (!this.constructor.__clearBuilderOnRelease) { return false; }
        let controlList = this.constructor.__controls;
        if (controlList) { this._builder.Build(controlList); }
        this._contentBuilt = true;
        return true;
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._data) { this._data.expanded = false; }
        this._ClearContent();
    }

    _ClearContent() {
        if (!this.constructor.__clearBuilderOnRelease) { return false; }
        if (!this._contentBuilt) { return false; }
        this._builder.Clear();
        this._contentBuilt = false;
        return true;
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    AltActivate(p_evt) {
        if ((this._toolbar && this._toolbar.isFocused) || !this._header.matches(':hover')) { return; }
        this._extExpand.Toggle();
    }

    //#endregion

    _CleanUp() {
        if (this.constructor.__clearToolbarOnRelease) { this._toolbar.Clear(); }
        super._CleanUp();
        this.Collapse();
    }

}

module.exports = InspectorWidgetGroup;
 //ui.Register('nkmjs-inspector-widget-group', InspectorWidgetGroup);