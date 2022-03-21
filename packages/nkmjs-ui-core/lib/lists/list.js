'use strict';

const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);
const extensions = require(`../extensions`);
const CatalogBuilder = require(`../helpers/catalog-builder`);

const ListItem = require(`./list-item`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class List extends ListItem {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, ListItem, ['css']);
    static __defaultOrder = 0;

    static __defaultItemClass = ListItem;
    static __defaultDirClass = this;

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
        this._builder._defaultItemClass = this.constructor.__defaultItemClass;
        this._builder._defaultDirClass = this.constructor.__defaultDirClass;
        this._builder
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnBuilderItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnBuilderItemRemoved, this);

        this.forwardData.To(this._builder, { mapping: `catalog` });

    }

    _PostInit() {
        super._PostInit();
        this._SetupBuilder(this._builder);
    }

    get defaultItemClass() { return this._builder._defaultItemClass; }
    set defaultItemClass(p_value) { this._builder._defaultItemClass = p_value || this.constructor.__defaultItemClass; }

    get defaultDirClass() { return this._builder._defaultDirClass; }
    set defaultDirClass(p_value) { this._builder._defaultDirClass = p_value || this.constructor.__defaultDirClass; }

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

        if (this._data) {
            if (this._data.expanded) {
                this._extExpand.Expand();
            } else if (this._extExpand.isExpanded) {
                this._data.expanded = true;
            }

        } else {
            this._extExpand.Collapse();
        }

    }

    // ----> ListItem Management

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
        this.defaultItemClass = null;
        this.defaultDirClass = null;
        super._CleanUp();
        this.Collapse();
    }



}

module.exports = List;