/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * - provide a context for registering specific sub-inspectors
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const InspectorWidget = require("./inspector-widget");

/**
 * @description An InspectorWidgetGroup is an InspectorWidget designed to be used inside an InspectorView or an Editor.
 * As a 'group' component, it offers the ability to expand & collapse a list of controls
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.InspectorWidget
 * @memberof ui.datacontrols
 */
class InspectorWidgetGroup extends InspectorWidget {
    constructor() { super(); }

    static __controls = null;
    static __clearBuilderOnRelease = false;

    _Init() {

        super._Init();

        this._extExpand = this._extensions.Add(extensions.Expand);
        this._extExpand._toggled = false;

        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

    }

    //#region DOM

    _Style() {
        return style.Extends({
            ':host': {

            },
        }, super._Style());
    }

    //#endregion

    //#region Expand/Collapse

    /**
     * @description TODO
     */
    Expand() { this._extExpand.Expand(); }
    _Expand() {
        this._BuildContent();
    }

    _BuildContent(){
        let controlList = this.constructor.__controls;
        if (controlList) { this._builder.Build(controlList); }
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        this._ClearContent();
    }

    _ClearContent(){
        this._builder.Clear();
    }

    //#endregion

}

module.exports = InspectorWidgetGroup;
 //ui.Register('nkmjs-inspector-widget-group', InspectorWidgetGroup);