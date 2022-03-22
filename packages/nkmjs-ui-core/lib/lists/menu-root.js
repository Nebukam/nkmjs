'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

const SIGNAL = require(`../signal`);
const extensions = require(`../extensions`);
const CatalogBuilder = require(`../helpers/catalog-builder`);

const FLAGS = require(`../flags`);


const WidgetBar = require(`../widget-bar`);
const WidgetItem = require("../widget-item");
const MenuItem = require(`./menu-item`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class MenuRoot extends WidgetBar {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, WidgetBar, ['css']);

    static __defaultItemClass = MenuItem;
    static __default_orientation = FLAGS.VERTICAL;

    // ----> Init

    _Init() {
        //TODO : Something similar to widget bar.
        super._Init();

        this._defaultItemClass = null;
        this._handleObserver
            .Hook(SIGNAL.SELECTION_GAIN, this._OnHandleSelectionGain, this)
            .Hook(SIGNAL.SELECTION_LOST, this._OnHandleSelectionLost, this);

        this._InitSelectionStack();
        this._selectionStack.allowMultiple = false;

        this._distribute.To(`items`);

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
    _Style() {
        return {
            ':host': {

                'position': `relative`,
                'display': `flex`,
                'flex-flow': `column nowrap`,
                'justify-content': 'flex-start',

            },

            '.item': {
                flex: `1 1 auto`,
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

    _OnHandleSelectionGain(p_handle) {
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

    _CleanUp() {
        this.defaultItemClass = null;
        super._CleanUp();
    }



}

module.exports = MenuRoot;