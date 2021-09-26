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

/**
 * @description A Controller interface based on ui.core.Widget
 * @class
 * @hideconstructor
 * @augments ui.core.Widget
 * @memberof ui.datacontrols
 */
class ControlWidget extends ui.Widget{
    constructor(){super();}

    static __clearBuilderOnRelease = false;
    static __useMetaObserver = false;

    _Init(){
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
    }

    _PostInit(){
        super._PostInit();
        this._ResetMetaPresentation();
    }

    //#region Context

    /**
     * @description Data context of the currently controlled data (can be that widget' data parent, holder, or else)
     * @type {ui.data.DataBlock}
     * @group Data
     */
    get context(){ return this._context; }
    set context(p_value){
        if(this._context === p_value){ return; }
        let oldValue = this._context;
        this._context = p_value;
        this._OnContextChanged(oldValue);
        this._builder.context = p_value;
    }

    /**
     * @access protected
     * @description Called whenever the current control widget' context has changed.
     * @param {ui.data.DataBlock} p_oldValue The value of this.context before its update (cleanup and tracking purposes)
     * @group Data 
     * @customtag override-me
     */
    _OnContextChanged( p_oldValue ){

    }

    //#endregion

    /**
     * @description The high-level editor in which this widget is used, if any.
     * This function recursively looks in the widget' parent until it finds one of Editor type, and returns it.
     * @type {ui.datacontrols.Editor}
     * @customtag read-only
     */
    get editor(){
        let p = this._parent;
        while(p != null){
            if(u.isInstanceOf(p, Editor)){return p;}
            p = p._parent;
        }
        return null;
    }

    //#region DOM

    _Style(){
        return style.Extends({
            ':host':{
            }
        }, super._Style());
    }

    _Render(){
        super._Render();
        let controlList = this.constructor.__controls;
        if(controlList){ this._builder.Build(controlList); }
    }

    //#endregion

    //#region Data

    _OnDataChanged(p_oldValue){
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

        this._builder.data = this._data;
    }

    /**
     * @access protected
     * @description Called whenever this controller' data is flaggued Dirty.
     * @group Data
     * @customtag override-me
     */
    _OnDataDirty(p_data){
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
        this.style.setProperty(META_IDS.P_PRES_COLOR.varname, this._metadata.Get(META_IDS.P_PRES_COLOR.path, `#000000`));
        this.style.setProperty(META_IDS.P_PRES_COLOR.varnameRGB, `0,0,0`);
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
    _Do(p_actionClass, p_operation){
        actions.CommandAction.Do(this, p_actionClass, p_operation);
    }

    _CleanUp(){
        if (this.constructor.__clearBuilderOnRelease) { this._builder.Clear(); }
        this.context = null;
        super._CleanUp();
    }

}

module.exports = ControlWidget;
//ui.Register(`nkmjs-control-widget`, ControlWidget);
