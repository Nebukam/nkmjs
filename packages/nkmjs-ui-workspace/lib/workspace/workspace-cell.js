'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

const WorkspaceCellNav = require(`./workspace-cell-nav`);

const base = uilib.views.Shelf;

class WorkspaceCell extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace-cell.css`]
    }, base, ['css']);

    // ----> Init

    static __defaultOrientation = ui.FLAGS.HORIZONTAL;
    static __default_fixedSize = false;
    static __default_collapsable = false;

    _Init() {
        super._Init();
        this._navClass = WorkspaceCellNav;
    }

    // ----> Catalog Management

    /**
     * Create a view & a nav item from a catalogItem
     * @param {CatalogHandler} p_handler 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_handler, p_item, p_mappedView) {

        if (!u.isInstanceOf(p_item, data.catalogs.CatalogItem)) {
            throw new Error(`non-catalog item added to workspace cell catalog.`);
        } else if (u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            throw new Error(`Full catalog item added to workspace cell catalog.`);
        }

        let view = super._OnCatalogItemAdded(p_handler, p_item, p_mappedView);
        view.RequestDisplay();
        
        return view;

    }

}

module.exports = WorkspaceCell;
ui.Register('nkmjs-workspace-cell', WorkspaceCell);