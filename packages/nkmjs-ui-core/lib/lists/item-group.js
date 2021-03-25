'use strict';

const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);
const extensions = require(`../extensions`);
const CatalogBuilder = require(`../helpers/catalog-builder`);

const Item = require(`./item`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class ItemGroup extends Item {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, Item, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._extExpand = this._extensions.Add(extensions.Expand);
        this._extExpand._toggled = false;

        this._extExpand
            .Watch(SIGNAL.EXPANDED, this._Expand, this)
            .Watch(SIGNAL.COLLAPSED, this._Collapse, this);

        this._builder = com.Rent(CatalogBuilder);
        this._builder.owner = this;
        this._builder._defaultItemClass = Item;
        this._builder._defaultGroupClass = ItemGroup;
        this._builder
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnBuilderItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnBuilderItemRemoved, this);

    }

    _PostInit() {
        super._PostInit();
        this._SetupBuilder(this._builder);
        this.order = 0;
    }

    set depth(p_value) {

        super.depth = p_value;

        let depthPlusOne = p_value + 1,
            keys = this._builder._map.keys;

        for (let i = 0, n = keys.length; i < n; i++) {
            this._builder._map.get(keys[i]).depth = depthPlusOne;
        }

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
                'align-items': `stretch`,

            },

            ':host(.expanded)': {
                'height': 'auto',
            },

            '.header': {
                'position': `relative`,
                'flex': '0 0 auto',
            },

            '.body': {
                'position': `relative`,
                'flex': '1 0 auto',

                'display': `none`,
                'flex-flow': `column nowrap`,
                'justify-content': 'flex-start',
                'align-items': `stretch`,

                'min-width': 0,
            },
            ':host(.expanded) .body': { 'display': `flex` },

            '.item': {
                flex: `1 1 auto`,
            }
        };
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    Activate(p_evt) {
        if (this._toolbar && this._toolbar.focused) { return; }
        super.Activate(p_evt);
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    AltActivate(p_evt) {
        if (this._toolbar && this._toolbar.focused) { return; }
        if (!super.AltActivate(p_evt)) { return false; }
        this._extExpand.Toggle();
    }

    /**
     * @description TODO
     */
    Expand() { this._extExpand.Expand(); }
    _Expand() {
        if (this._data) {
            this._data.expanded = true;
            this._builder.Enable();
        }
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._data) { this._data.expanded = false; }
        this._builder.Disable();
    }

    _OnDataChanged(p_oldData) {
        
        super._OnDataChanged(p_oldData);

        //Ensure content is cleared before updating builder's data
        this._builder.catalog = this._data;

        if (this._data) {
            if (this._extExpand.isExpanded) {
                this._data.expanded = true;
            }
        } else {
            this._extExpand.Collapse();
        }

    }

    // ----> Item Management

    /**
     * @access protected
     * @description TODO
     * @param {*} p_builder 
     * @param {*} p_item 
     * @param {*} p_widget 
     */
    _OnBuilderItemAdded(p_builder, p_item, p_widget) {
        p_widget.classList.add(`item`);
        p_widget.depth = this._depth + 1;
        //Re-order items ?
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_builder 
     * @param {*} p_item 
     * @param {*} p_widget 
     */
    _OnBuilderItemRemoved(p_builder, p_item, p_widget) {
        p_widget.classList.remove(`item`);
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
        this.Collapse();
    }



}

module.exports = ItemGroup;