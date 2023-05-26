'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);

const IDS = require(`../ids`);
const SIGNAL = require(`../signal`);
const extensions = require(`../extensions`);
const dom = require(`../utils-dom`);
const CatalogBuilder = require(`../helpers/catalog-builder`);

const ListItem = require(`./list-item`);

const base = ListItem;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class List extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);
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

        this.forwardData.To(this._builder, { set: `catalog` });

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
    static _Style() {
        return {
            ':host': {

                ...style.rules.pos.rel,
                ...style.flex.column.nowrap,

                'padding': 0,
                'margin': 0,
                '--half-indent': `calc(var(--tree-indent) / 2)`,

                
                'justify-content': 'flex-start',
                'align-items': `stretch`,

                'box-sizing': `border-box`,
                //'padding-left': `var(--indent, 0px)`,

                'height': `var(--tree-size)`,
                'min-height': `var(--tree-size)`,

                '--indent': `calc(var(--depth) * var(--tree-indent))`,

            },

            ':host(.expanded)': {
                'height': 'auto',
            },

            '.header': {
                ...style.rules.pos.rel,
                ...style.flexItem.fixed,

                'box-sizing': `border-box`,
                'height': `var(--tree-size)`,
                'min-height': `var(--tree-size)`,
                'padding-left': `var(--indent, 0px)`,

            },

            '.body': {
                ...style.rules.pos.rel,
                ...style.flexItem.grow,

                'display': `none`,
                'flex-flow': `column nowrap`,
                'justify-content': 'flex-start',
                'align-items': `stretch`,

                'min-width': 0,
            },
            ':host(.expanded) .body': { ...style.rules.display.flex, },

            '.item': {
                ...style.flexItem.fill,
            }
        };
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    Activate(p_evt) {
        if (this._toolbar && this._toolbar.isFocused) { return; }
        super.Activate(p_evt);
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    AltActivate(p_evt) {
        if (this._toolbar && this._toolbar.isFocused) { return; }
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
        dom.CSSClass(p_widget, IDS.ITEM);
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
        dom.CSSClass(p_widget, IDS.ITEM, false);
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