'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const helpers = require(`../helpers`);

const WidgetBar = require(`../widget-bar`);
const MenuItem = require(`./menu-item`);

const base = WidgetBar;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class MenuRoot extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    static __defaultItemClass = MenuItem;
    static __defaultOrientation = FLAGS.VERTICAL;
    static __distribute = base.__distribute.Ext()
        .To(`items`);

    // ----> Init

    _Init() {
        //TODO : Something similar to widget bar.
        super._Init();

        this._defaultItemClass = null;
        this._handleObserver
            .Hook(SIGNAL.SEL_GAIN, this._OnHandleSelectionGain, this)
            .Hook(SIGNAL.SEL_LOST, this._OnHandleSelectionLost, this);

            helpers.HostSelStack(this, false, false);

        this._modal = null;

    }

    _PostInit() {
        super._PostInit();
        this._SetupBuilder(this._builder);
    }

    get modal() { return this._modal; }
    set modal(p_value) {
        this._modal = p_value;
    }

    get defaultItemClass() { return this._defaultItemClass; }
    set defaultItemClass(p_value) { this._defaultItemClass = p_value || this.constructor.__defaultItemClass; }

    set items(p_value) {
        this.Clear();
        let itemList = u.isFunc(p_value) ? p_value() : p_value;

        console.log(itemList);
        this.CreateHandles(...itemList);
    }

    _SetupBuilder(p_catalogBuilder) {

    }

    // ----> DOM

    //TODO : Body must break flex row
    static _Style() {
        return {
            ':host': {

                ...style.rules.pos.rel,
                ...style.flex.column.nowrap,
                'justify-content': 'flex-start',

            },

            '.item': {
                ...style.flexItem.fill,
            }
        };
    }

    // ----> Handles Management

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {function} p_class 
     */
    _OnHandleCreated(p_handle) {
        p_handle.rootMenu = this;
    }

    _OnHandleSelectionGain(p_handle, p_firstSelect = false) {
        let options = this._optionsMap.get(p_handle);
        if (p_handle.isDir) {

        } else {
            // Trigger & close ?
        }
    }

    _OnHandleSelectionLost(p_handle) {
        let options = this._optionsMap.get(p_handle);
        if (p_handle.isDir) {

        }
    }

    //#region Selection

    get selStackOverride() { return this._selStackOverride; }
    set selStackOverride(p_value) { this._selStackOverride = p_value; }

    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {
        if (this._selStackOverride) { return this._selStackOverride; }
        if (this._selStack) { return this._selStack; }
        else { return super.selectionStack; }
    }

    //#endregion

    _CleanUp() {
        this.defaultItemClass = null;
        if (this._selStackOverride) { this.selStackOverride = null; }
        if (this._selStack) { this._selStack.Clear(); }
        super._CleanUp();
    }



}

module.exports = MenuRoot;