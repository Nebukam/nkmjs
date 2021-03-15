'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);

const WorkspaceCellNav = require(`./workspace-cell-nav`);

class WorkspaceCell extends ui.views.Shelf {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace-cell.css`]
    }, ui.views.Shelf, ['css']);

    // ----> Init

    static __default_orientation = ui.FLAGS.HORIZONTAL;

    _Init() {
        super._Init();

        this._navClass = WorkspaceCellNav;
        this._isCollapsable = false;
    }

    /**
     * Create a view & a nav item from a catalogItem
     * @param {CatalogHandler} p_handler 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_handler, p_item, p_mappedView) {

        if (!u.tils.isInstanceOf(p_item, data.catalogs.CatalogItem)) {
            throw new Error(`non-catalog item added to workspace cell catalog.`);
        } else if (u.tils.isInstanceOf(p_item, data.catalogs.Catalog)) {
            throw new Error(`Full catalog item added to workspace cell catalog.`);
        }

        return super._OnCatalogItemAdded(p_handler, p_item, p_mappedView);
    }

    _OnViewAdded(p_item, p_control, p_view) {

        super._OnViewAdded(p_item, p_control, p_view);
        p_view.RequestDisplay();

    }

}

module.exports = WorkspaceCell;
ui.Register('nkmjs-workspace-cell', WorkspaceCell);