'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);

const WorkspaceCell = require(`./workspace-cell`);

class Workspace extends ui.views.View {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace.css`]
    }, ui.views.View, ['css']);

    _Init() {

        super._Init();

        this._cellDefaultClass = WorkspaceCell;

        this._cells = new collections.List();

        this._catalogHandler = new data.catalogs.CatalogHandler();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);

    }

    /**
     * @type {data.core.catalogs.Catalog}
     */
    get catalog() { return this._catalogHandler.catalog; }
    set catalog(p_value) { this._catalogHandler.catalog = p_value; }

    // ----> Rendering

    _Style() {

        return {
            ':host': {
                position: `relative`,
                display: `flex`,
            },
            '.navigation': {
                position: `relative`,
                flex: `1 1 auto`,
                outline: `1px rgba(0,255,0,0.5) solid`,
                'outline-offset': `-1px`,
            },
            '.cell': {
                position: `relative`
            }
        };

    }

    _OnCatalogItemAdded(p_handler, p_item) {

        if (!u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            throw new Error(`non-catalog item added to workspace catalog : ${p_item}.`);
        }

        let cellClass = p_item.GetOption(`cellClass`, this._cellDefaultClass),
            cell = this.Add(cellClass, `cell`);

        p_handler.Set(p_item, cell);

        if (p_item.data) {
            p_item.data.Watch(com.SIGNAL.RELEASED, this._OnItemDataReleased, this);
        }
        //TODO : Listen to the data in case of release
        //if the data is released, then close associated catalog items

        this._OnCellCreated(p_item, cell);

    }

    _OnCellCreated(p_item, p_cell) {
        this._cells.Add(p_item);
        p_cell.Watch(ui.SIGNAL.FOCUS_REQUESTED, this._OnCellRequestFocus, this);
        p_cell.catalog = p_item;
    }

    _OnItemDataReleased(p_data) {
        let localCatalog = this.catalog;

        if (!localCatalog) { return; }

        let dataHolders = localCatalog.FindDataHolders(p_item.data);
        for (let i = 0, n = dataHolders.length; i < n; i++) {
            dataHolders[i].Release();
        }
    }

    _OnCatalogItemRemoved(p_handler, p_item, p_binding) {

        if (p_item.data) { p_item.data.Unwatch(com.SIGNAL.RELEASED, this._OnItemDataReleased, this); }

        if (p_binding) {
            this._OnCellRemoved(p_item, p_binding);
            if (p_binding.parent === this) {
                // Only release if the workspace is still the parent. 
                p_binding.Release();
            }
        }
    }

    _OnCellRemoved(p_item, p_cell) {
        this._cells.Remove(p_item);
        p_cell.Unwatch(ui.SIGNAL.FOCUS_REQUESTED, this._OnCellRequestFocus, this);
    }

    _OnCellRequestFocus(p_view) {

    }

    /**
     * 
     * @param {*} p_options
     */
    Host(p_item) {

        let localCatalog = this._FetchCatalog();


        if (u.isInstanceOf(p_item, data.catalogs.CatalogItem)) {
            // Attempting to host an existing catalog item.
            localCatalog.Add(p_item);
            return;
        }

        // Need to create a new item from `p_item` as options
        let view = null,
            viewType = p_item.GetOption(`viewType`, null),
            dataHolders = localCatalog.FindDataHolders(p_item.data);

        for (let i = 0, n = dataHolders.length; i < n; i++) {
            let view = dataHolders[i].GetOption(`viewType`, null);
            if (view && u.isInstanceOf(view, viewType)) {
                view.RequestDisplay();
                return;
            }
        }

        let item = localCatalog.Register(p_item);
        // TODO : Find cell associated to catalog and request focus on newly created view
        //        let view = this._catalogHandler.Get(item);
        //        view.RequestDisplay();

    }

    _FetchCatalog() {

        // Fetch cell catalog

        let localCatalog = this.catalog;

        if (!localCatalog) {
            // No local catalog exists for this workspace. Create one.
            let wCat = com.Rent(data.catalogs.Catalog);
            localCatalog = wCat.GetOrCreateCatalog({ name: 'RootCell' });
            this.catalog = wCat;
        } else {
            // TODO : Find the active cell's catalog
            // For now just grab the first available catalog.
            let cat = null;
            let n = localCatalog.count;
            let i = 0;
            while (cat === null || i < n) {
                cat = localCatalog.At(i);
                if (!u.isInstanceOf(cat, data.catalogs.Catalog)) { cat = null; } // Get rid of non-catalog items
                i++;
            }
            if (!cat) {
                localCatalog = localCatalog.GetOrCreateCatalog({ name: 'RootCell' });
            } else {
                localCatalog = cat;
            }
        }

        return localCatalog;

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = Workspace;
ui.Register('nkmjs-workspace', Workspace);