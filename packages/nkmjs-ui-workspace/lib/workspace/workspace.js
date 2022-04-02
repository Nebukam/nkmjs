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

    // ----> Init

    static __default_placeholderViewClass = null;

    _Init() {

        super._Init();

        this._cellDefaultClass = WorkspaceCell;
        this._placeholderViewClass = null;
        this._placeholderView = null;

        this._cells = new collections.List();
        this._isEmpty = true;
        this._flags.Add(this, ui.FLAGS.EMPTY);

        this._catalogHandler = new data.catalogs.CatalogHandler();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCellCatalogAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCellCatalogRemoved, this);

        this._gridController = new ui.manipulators.Grid(this, [1, 1]);

        this._cellObserver = new com.signals.Observer();
        this._cellObserver
            .Hook(ui.SIGNAL.DISPLAY_REQUESTED, this._OnCellDisplayRequested, this)
            .Hook(ui.SIGNAL.EMPTY, this._OnCellEmpty, this)
            .Hook(ui.SIGNAL.NON_EMPTY, this._OnCellNonEmpty, this);

    }

    _PostInit() {
        super._PostInit();
        this._OnWorkspacefEmpty();
    }

    get gridController() { return this._gridController; }

    /**
     * @type {data.core.catalogs.Catalog}
     */
    get catalog() { return this._catalogHandler.catalog; }
    set catalog(p_value) { this._catalogHandler.catalog = p_value; }

    get isEmpty() { return this._isEmpty; }

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

    _Render() {
        super._Render();
        let placholderViewClass = (this._placholderViewClass || this.constructor.__default_placeholderViewClass);
        if (placholderViewClass) {
            this._placeholderView = this.Attach(placholderViewClass, `cell`);
            this._placeholderView.visible = true;
        }
    }

    // ----> Catalog Management

    _OnCellCatalogAdded(p_handler, p_item) {

        if (!u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            throw new Error(`non-catalog item added to workspace catalog : ${p_item}.`);
        }

        let cellClass = p_item.GetOption(`cellClass`, this._cellDefaultClass),
            cell = this.Attach(cellClass, `cell`);

        p_handler.Set(p_item, cell);

        if (p_item.data) {
            p_item.data.Watch(com.SIGNAL.RELEASED, this._OnItemDataReleased, this);
        }
        //TODO : Listen to the data in case of release
        //if the data is released, then close associated catalog items
        //NOTE : Why would a cell be associated with a data item?

        this._OnCellCreated(p_item, cell);

    }

    _OnCellCreated(p_item, p_cell) {

        this._cells.Add(p_cell);
        this._cellObserver.Observe(p_cell);

        p_cell.catalog = p_item;

        this._UpdateWorkspaceEmptyState();
    }

    _OnItemDataReleased(p_data) {
        let localCatalog = this.catalog;

        if (!localCatalog) { return; }

        let dataHolders = localCatalog.FindDataHolders(p_item.data);
        for (let i = 0, n = dataHolders.length; i < n; i++) {
            dataHolders[i].Release();
        }

        if (dataHolders && dataHolders.length > 0) {
            this._UpdateWorkspaceEmptyState();
        }

    }

    _OnCellCatalogRemoved(p_handler, p_item, p_binding) {

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
        this._cells.Remove(p_cell);
        this._cellObserver.Unobserve(p_cell);
        this._UpdateWorkspaceEmptyState();
    }

    _OnCellDisplayRequested(p_view) { }

    _OnCellEmpty(p_cell) { this._UpdateWorkspaceEmptyState(); }

    _OnCellNonEmpty(p_cell) { this._UpdateWorkspaceEmptyState(); }

    /**
     * 
     * @param {*} p_options
     */
    Host(p_item) {

        let localCatalog = this._FetchCatalog();

        if (u.isInstanceOf(p_item, data.catalogs.CatalogItem)) {
            // Attempting to host an existing catalog item.
            localCatalog.Add(p_item);
            return p_item;
        }

        // Need to create a new item from `p_item` as options
        let view = null,
            viewClass = u.tils.Get(p_item, [ui.IDS.VIEW_CLASS], null),
            dataHolders = localCatalog.FindDataHolders(p_item.data);

        for (let i = 0, n = dataHolders.length; i < n; i++) {

            let item = dataHolders[i],
                view = item.GetOption([ui.IDS.VIEW], null);

            if (view && u.isInstanceOf(view, viewClass)) {
                view.RequestDisplay();
                return item;
            }

        }

        let item = localCatalog.Register(p_item);

        // TODO : Find cell associated to catalog and request focus on newly created view
        //        let view = this._catalogHandler.Get(item);
        //        view.RequestDisplay();

        return item;

    }

    _FetchCatalog() {

        // Fetch cell catalog

        let localCatalog = this.catalog;

        if (!localCatalog) {
            // No local catalog exists for this workspace. Create one.
            let wCat = com.Rent(data.catalogs.Catalog); // TODO : Look into this. The "workspace"-level catalog should be stored somewhere?
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

    //

    _UpdateWorkspaceEmptyState() {

        let isEmpty = true;

        if (this._cells.isEmpty) {
            isEmpty = true;
        } else {
            for (let i = 0, n = this._cells.count; i < n; i++) {
                let cell = this._cells.At(i);
                if (!cell.isEmpty) {
                    isEmpty = false;
                    cell.visible = true;
                } else {
                    cell.visible = false;
                }
            }
        }

        if (this._isEmpty === isEmpty) { return; }
        if (isEmpty) { this._OnWorkspacefEmpty(); }
        else { this._OnWorkspaceNonEmpty(); }

    }

    /**
     * @access protected
     * @description TODO
     */
    _OnWorkspacefEmpty() {
        this._isEmpty = true;
        this._flags.Set(ui.FLAGS.EMPTY, true);
        this.Broadcast(ui.SIGNAL.EMPTY, this);
        if (this._placeholderView) { this._placeholderView.visible = true; }
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_view 
     */
    _OnWorkspaceNonEmpty(p_view) {
        this._isEmpty = false;
        this._flags.Set(ui.FLAGS.EMPTY, false);
        this.Broadcast(ui.SIGNAL.NON_EMPTY, this);
        if (this._placeholderView) { this._placeholderView.visible = false; }
    }


    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = Workspace;
ui.Register('nkmjs-workspace', Workspace);