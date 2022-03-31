'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const SIGNAL = require(`../signal`);
const extensions = require(`../extensions`);
const DOMStreamer = require(`../helpers/dom-streamer`);

const CatalogFolderBuilder = require(`./catalog-folder-builder`);
const FolderItem = require(`./folder-item`);

/**
 * @description Similar to item-group, a folder separates Catalog list from CatalogItems
 * and uses a DOM Streamer to handle items.
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListItem
 * @memberof ui.core.tree
 */
class Folder extends FolderItem {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, FolderItem, ['css']);

    static __itemHeight = 24;

    static __defaultItemClass = FolderItem;
    static __defaultDirClass = this;

    // ----> Init

    _Init() {

        super._Init();

        this._extExpand = this._extensions.Add(extensions.Expand);
        this._extExpand._toggled = false;

        this._extExpand
            .Watch(SIGNAL.EXPANDED, this._Expand, this)
            .Watch(SIGNAL.COLLAPSED, this._Collapse, this);

        this._streamerWrapper = null;
        this._streamerLayoutInfos = {
            itemSlots: 1,
            itemSize: this.constructor.__itemHeight,
            itemCount: 0,
            fixedSize: true
        };

        this.style.setProperty(`--folder-size`, `${this.constructor.__itemHeight}px`);

        this._builder = com.Rent(CatalogFolderBuilder);
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

        this._itemStreamer = this.Attach(DOMStreamer, `item group streamer`, this._streamerWrapper);
        this._itemStreamer.options = {
            layout: { ...this._streamerLayoutInfos }
        };

        this._builder.itemStreamer = this._itemStreamer;
    }

    get defaultItemClass() { return this._builder._defaultItemClass; }
    set defaultItemClass(p_value) { this._builder._defaultItemClass = p_value || this.constructor.__defaultItemClass; }

    get defaultDirClass() { return this._builder._defaultDirClass; }
    set defaultDirClass(p_value) { this._builder._defaultDirClass = p_value || this.constructor.__defaultDirClass; }

    _SetupBuilder(p_catalogBuilder) {

    }

    set depth(p_value) {

        super.depth = p_value;

        let depthPlusOne = p_value + 1,
            keys = this._builder._map.keys;

        for (let i = 0, n = keys.length; i < n; i++) {
            this._builder._map.get(keys[i]).depth = depthPlusOne;
        }

    }

    // ----> DOM

    //TODO : Body must break flex row
    _Style() {
        return {
            ':host': {
                'padding': 0,
                'margin': 0,

                '--folder-size': `${this.constructor.__itemHeight}px`,
                '--half-indent': `calc(var(--folder-indent) / 2)`,


                'position': `relative`,

                'display': `flex`,
                'flex-flow': `column nowrap`,
                'justify-content': 'flex-start',
                'align-items': `stretch`,

                'box-sizing': `border-box`,

                'height': `var(--folder-size)`,
                'min-height': `var(--folder-size)`,

                '--indent': `calc(var(--depth) * var(--folder-indent))`,

            },

            ':host(.expanded)': {
                'height': 'auto',
            },

            '.header': {
                'position': `relative`,
                'flex': '0 0 auto',

                'box-sizing': `border-box`,
                'height': `var(--folder-size)`,
                
                'min-height': `var(--folder-size)`,
                'padding-left': `var(--indent, 0px)`,

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
            ':host(.expanded) .streamer': {
                'height': `100%`,
                'order': `99999999 !important`
            },

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
            this._itemStreamer._RefreshLayoutInfos();
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

module.exports = Folder;