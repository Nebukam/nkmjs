'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

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
    constructor() { super(); }

    static __clearBuilderOnRelease = false;
    static __controls = null;
    static __useMetaObserver = false;
    static __default_shortcutRequireFocus = true;

    static __updateDataOnSameSet = true;

    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate` })
        .To(`flagOn`, (p_target, p_value) => { p_value.forEach((flag) => { p_target._flags.Set(flag, true) }); })
        .To(`flagOff`, (p_target, p_value) => { p_value.forEach((flag) => { p_target._flags.Set(flag, false) }); })
        .To(`editor`)
        .To(`data`);

    _Init() {
        super._Init();

        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);
        this._builder = new helpers.ControlBuilder(this);

        if (this.constructor.__useMetaPresentation) {
            this._metadataObserver = new data.helpers.MetadataObserver();
            this._metadataObserver.Hook(
                data.SIGNAL.META_MID_UPDATE,
                META_IDS.PRESENTATION,
                this._UpdateMetaPresentation, this);
            this._metadata = null;
        }

        this._contextObserver = new com.signals.Observer();

        this._editor = null;

        this._ForwardToBuilder();

        this._forwardContext = null;
        this._forwardEditor = null;

        this._defaultModalContentOptions = () => { return { editor: this.editor, data: this._data, context: this._context } };

    }

    _ForwardToBuilder() { this.forwardData.To(this._builder); }

    _PostInit() {
        super._PostInit();
        this._ResetMetaPresentation();
    }

    get forwardContext() {
        if (!this._forwardContext) { this._forwardContext = new ui.helpers.DataForward(this); }
        return this._forwardContext;
    }

    get forwardEditor() {
        if (!this._forwardEditor) { this._forwardEditor = new ui.helpers.DataForward(this); }
        return this._forwardEditor;
    }

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
        this._builder.editor = p_value;
        if (this._forwardEditor) { this._forwardEditor._BatchSet(`editor`, p_value); }
        if (`_OnEditorChanged` in this) { this._OnEditorChanged(oldEditor); }
    }

    //#region Options handling

    /**
     * @description TODO
     * @type {object}
     */
    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    /**
     * @description TODO
     * @type {object}
     */
    set altOptions(p_value) { this.constructor.__distribute.UpdateNoDefaults(this, p_value, null, false, false); }

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
        this._OnContextChanged(oldValue);
        this._builder.context = p_value;
        if (this._forwardContext) { this._forwardContext._BatchSet(`context`, p_value); }
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

    //#region Commands

    /**
     * 
     * @param {object} p_commandOptions 
     * @param {*} [p_commandOptions.id]
     * 
     * @param {object} p_modalOptions 
     * @param {class|object} p_modalOptions.content
     * @param {function} [p_modalOptions.contentOptionsGetter]
     * @param {boolean} [p_modalOptions.anchorToEmitter]
     * @param {string} [p_modalOptions.placement]
     * @param {object} [p_modalOptions.margins]
     * 
     * @returns {Command}
     * 
     */
    _CmdModal(p_commandOptions, p_modalOptions) {

        p_commandOptions.id = p_commandOptions.id || p_modalOptions.content || null;

        let cmd = this._commands.Create(ui.commands.Modal, p_commandOptions);

        p_modalOptions.contentOptionsGetter = p_modalOptions.contentOptionsGetter || this._defaultModalContentOptions;
        p_modalOptions.anchorToEmitter = p_modalOptions.anchorToEmitter || true;
        p_modalOptions.placement = p_modalOptions.placement || ui.ANCHORING.BOTTOM_LEFT;

        cmd.options = p_modalOptions;

        return cmd;
    }

    _CmdMenu(p_commandOptions, p_modalOptions) {
        //TODO : same as modal ?
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
        this.style.setProperty(META_IDS.P_PRES_COLOR.varname, `#000000`);
        this.style.setProperty(META_IDS.P_PRES_COLOR.varnameRGB, `0,0,0`);
        this.style.setProperty(META_IDS.P_PRES_WEIGHT.varname, 0);
    }

    /**
     * @access protected
     * @description Called to force an update of any user-set presentation params
     * @group Presentation
     * @customtag override-me
     */
    _UpdateMetaPresentation() {

        let color = this._metadata.Get(META_IDS.P_PRES_COLOR.path, `#000000`);

        this.style.setProperty(META_IDS.P_PRES_COLOR.varname, color);
        this.style.setProperty(META_IDS.P_PRES_COLOR.varnameRGB, style.colors.RGBA.HexToRGBString(color));
        this.style.setProperty(META_IDS.P_PRES_WEIGHT.varname, this._metadata.Get(META_IDS.P_PRES_WEIGHT.path, 0));
    }

    //#endregion

    /**
     * @access protected
     * @description Registers & executes an action.
     * @param {constructor} p_actionClass Action class to be executed
     * @param {object} p_operation Action' operation parameters
     * @group Actions
     */
    _Do(p_actionClass, p_operation) {
        actions.CommandAction.Do(this, p_actionClass, p_operation);
    }

    _CleanUp() {
        if (this.constructor.__clearBuilderOnRelease) { this._builder.Clear(); }
        this.context = null;
        this.editor = null;
        super._CleanUp();
    }

}

module.exports = ControlView;
//ui.Register(`nkmjs-control-view`, ControlView);
