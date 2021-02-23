'use strict';

const { NFOS, SIGNAL, POOL } = require(`@nkmjs/common`);

const UI = require(`../ui`);
const UI_ID = require(`../ui-id`);
const UI_SIGNAL = require(`../ui-signal`);

const ExtExpand = require(`../extensions/ext-expand`);

const CatalogBuilder = require(`../helpers/catalog-builder`);
const TreeItem = require(`./tree-item`);
const TPLBodyExpand = require(`../templates/tpl-body-expand`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.TreeItem
 * @memberof ui.core.tree
 */
class TreeItemGroup extends TreeItem {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/tree/tree-group.css`]
    }, TreeItem, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._tplClass = TPLBodyExpand;

        this._extExpand = this._interactions.Add(ExtExpand);
        this._extExpand._toggled = false;

        this._extExpand.Watch(UI_SIGNAL.EXPANDED, this._Expand, this);
        this._extExpand.Watch(UI_SIGNAL.COLLAPSED, this._Collapse, this);

        this._builder = null;

        this._expandIcon = null;

    }

    _PostInit() {
        super._PostInit();
        this._SetupBuilder();
        this._extExpand.Setup(this, this._body, this._expandIcon.element);
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

    _SetupBuilder() {
        this._builder = POOL.Rent(CatalogBuilder);
        this._builder.owner = this;
        this._builder.host = this._body;
        this._builder._defaultItemClass = TreeItem;
        this._builder._defaultGroupClass = TreeItemGroup;
        this._builder.Watch(SIGNAL.ITEM_ADDED, this._OnBuilderItemAdded, this);
        this._builder.Watch(SIGNAL.ITEM_REMOVED, this._OnBuilderItemRemoved, this);
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

    _Render() {

        this._tplOptions = {
            [UI_ID.OWNER]: this,
            [UI_ID.ICON]: { autoHide: true },
            expandIcon: { htitle: `Expand` }
        };

        super._Render();
        this._icon.autoHide = true;
        this._toolbarCtnr = this._header;
        this.focusArea = this._header;

        this._dragActivator = this._header;
        this._dragFeedbackHost = this._header;

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
        if(!super.AltActivate(p_evt)){return false;}
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
        this._expandIcon.rotation = 90;
    }

    /**
     * @description TODO
     */
    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._data) { this._data.expanded = false; }
        this._builder.Disable();
        this._expandIcon.rotation = 0;
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

module.exports = TreeItemGroup;
UI.Register(`nkmjs-tree-item-group`, TreeItemGroup, `ul`);