'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const IDS = require(`./ids`);
const helpers = require(`./helpers`);
const META_IDS = require(`./meta-ids`);
const Editor = require(`./editor`);

const base = ui.views.View;

/**
 * @description A Controller interface based on ui.views.View
 * @class
 * @hideconstructor
 * @augments ui.core.views.View
 * @memberof ui.datacontrols
 */
class ControlView extends base {
    constructor() { super(); this._fullyInitialized = true; }

    static __clearBuilderOnRelease = false;
    static __controls = null;
    static __useMetaObserver = false;
    static __default_shortcutRequireFocus = true;

    static __updateDataOnSameSet = true;

    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate` })
        .To(`flagOn`, ui.helpers.flagOn)
        .To(`flagOff`, ui.helpers.flagOff)
        .To(`editor`)
        .To(`data`);

    _Init() {

        super._Init();

        this._forwardData = this._forwardData;
        this._forwardContext = new com.helpers.Setter(this, IDS.CONTEXT);
        this._forwardEditor = new com.helpers.Setter(this, IDS.EDITOR);

        let getEditor = () => { return this._releasing ? null : this._editor; };
        let getContext = () => { return this._releasing ? null : this._context; };

        this._forwardData.AddRelatives(this._forwardEditor, getEditor);
        this._forwardData.AddRelatives(`editor`, getEditor, true);

        this._forwardData.AddRelatives(this._forwardContext, getContext);
        this._forwardData.AddRelatives(`context`, getContext, true);

        this._forwardContext.AddRelatives(this._forwardEditor, getEditor);
        this._forwardContext.AddRelatives(`editor`, getEditor, true);

        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);

        this._contextObserver = new com.signals.Observer();

        this._builder = new helpers.ControlBuilder(this);
        this._forwardData.To(this._builder);
        this._forwardContext.To(this._builder);
        this._forwardEditor.To(this._builder);

        if (this.constructor.__useMetaPresentation) {
            this._metadataObserver = new data.helpers.MetadataObserver();
            this._metadataObserver.Hook(
                data.SIGNAL.META_MID_UPDATE,
                META_IDS.PRESENTATION,
                this._UpdateMetaPresentation, this);
            this._metadata = null;
        }

        this._editor = null;
        this._defaultModalContentOptions = () => { return { editor: this.editor, data: this._data, context: this._context } };

        
        this.constructor.__distribute.Attach(this);

    }

    _PostInit() {
        super._PostInit();
        this._ResetMetaPresentation();
    }

    /**
     * @type {com.helpers.Setter}
     */
    get forwardContext() { return this._forwardContext; }

    /**
     * @type {com.helpers.Setter}
     */
    get forwardEditor() { return this._forwardEditor; }

    /**
     * @description The high-level editor in which this widget is used, if any.
     * This function recursively looks in the widget' parent until it finds one of Editor type, and returns it.
     * @type {ui.datacontrols.Editor}
     */
    get editor() {

        if (this._editor) { return this._editor; }

        let p = this._parent;
        while (p != null) {
            p = p.editor;
            if (u.isInstanceOf(p, Editor)) { return p; }
            p = p ? p.parent : null;
        }
        return null;

    }
    set editor(p_value) {

        if (this._editor == p_value) { return; }

        let oldEditor = this._editor;
        this._editor = p_value;

        this._forwardEditor.Set(p_value);
        this._forwardContext._BatchSet(`editor`, p_value);
        this._forwardData._BatchSet(`editor`, p_value);

        this._OnEditorChanged?.(oldEditor);

    }

    //#region Options handling

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (!p_options) { return; }
    }

    //#endregion

    //#region Context

    /**
     * @description Data context of the currently controlled data (can be that widget' data parent, holder, or else)
     * @type {ui.data.DataBlock}
     * @group Data
     */
    get context() { return this._context; }
    set context(p_value) {

        if (this._context === p_value) { return; }

        let oldValue = this._context;
        this._context = p_value;
        this._forwardContext.Set(p_value);
        this._OnContextChanged(oldValue);

        this._contextObserver.ObserveOnly(this._context);

    }

    /**
     * @access protected
     * @description Called whenever the current control widget' context has changed.
     * @param {ui.data.DataBlock} p_oldValue The value of this.context before its update (cleanup and tracking purposes)
     * @group Data 
     * @customtag override-me
     */
    _OnContextChanged(p_oldValue) {

    }

    //#endregion

    //#region Display

    _OnDisplayGain() {
        super._OnDisplayGain();
        this._builder.DisplayGranted();
    }

    _OnDisplayLost() {
        super._OnDisplayLost();
        this._builder.DisplayLost();
    }

    //#endregion

    //#region DOM

    static _Style() {
        return style.Extends({
            ':host': {
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
        if (this._builder.host == this._builder._owner) { this._builder.host = this._buildHost || this._wrapper || this._host; }
        let controlList = this.constructor.__controls;
        if (controlList) { this._builder.Build(controlList); }
    }

    //#endregion

    //#region Data

    _OnDataChanged(p_oldValue) {

        super._OnDataChanged(p_oldValue);

        if (this._metadataObserver) {
            if (u.isInstanceOf(this._data, data.DataBlock)) {
                this._metadata = this._data.metadata;
                this._metadataObserver.target = this._metadata;
                this._UpdateMetaPresentation();
            }
            else {
                this._metadata = null;
                this._metadataObserver.target = null;
                this._ResetMetaPresentation();
            }
        }

    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        this._builder.RefreshConditionals();
    }

    /**
     * @access protected
     * @description Called whenever this controller' data is flaggued Dirty.
     * @group Data
     * @customtag override-me
     */
    _OnDataDirty(p_data) {
        this._OnDataUpdated(p_data); // <- Overkill much ?
    }

    //#endregion

    //#region Meta presentation

    /**
     * @access protected
     * @description Called to reset any user-set presentation params
     * @group Presentation
     */
    _ResetMetaPresentation() {
        ui.dom.CSS(this, {
            [META_IDS.P_PRES_COLOR.varname]: `#000000`,
            [META_IDS.P_PRES_COLOR.varnameRGB]: `0,0,0`,
            [META_IDS.P_PRES_WEIGHT.varname]: 0
        });
    }

    /**
     * @access protected
     * @description Called to force an update of any user-set presentation params
     * @group Presentation
     * @customtag override-me
     */
    _UpdateMetaPresentation() {

        let color = this._metadata.Get(META_IDS.P_PRES_COLOR.path, `#000000`);
        ui.dom.CSS(this, {
            [META_IDS.P_PRES_COLOR.varname]: color,
            [META_IDS.P_PRES_COLOR.varnameRGB]: style.colors.RGBA.HexToRGBString(color),
            [META_IDS.P_PRES_WEIGHT.varname]: this._metadata.Get(META_IDS.P_PRES_WEIGHT.path, 0)
        });
    }

    //#endregion

    /**
     * @access protected
     * @description Registers & executes an action.
     * @param {constructor} p_actionClass Action class to be executed
     * @param {object} p_op Action' operation parameters
     * @group Actions
     */
    _Do(p_actionClass, p_op) {
        actions.CommandAction.Do(this, p_actionClass, p_op);
    }

    _CleanUp() {

        if (this.constructor.__clearBuilderOnRelease) { this._builder.Clear(); }

        this.data = null;
        this.context = null;
        this.editor = null;

        super._CleanUp();

        this._forwardContext.Clear();
        this._forwardEditor.Clear();

    }

}

module.exports = ControlView;
//ui.Register(`nkmjs-control-view`, ControlView);
