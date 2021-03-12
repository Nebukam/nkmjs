'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { Catalog, CatalogItem } = require(`@nkmjs/data-core`);
const { UI, UI_FLAG, Shelf } = require(`@nkmjs/ui-core`);

const WorkspaceCellNav = require(`./workspace-cell-nav`);

class WorkspaceCell extends Shelf {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace-cell.css`]
    }, Shelf, ['css']);

    // ----> Init

    static __default_orientation = UI_FLAG.HORIZONTAL;

    _Init() {
        super._Init();

        this._navClass = WorkspaceCellNav;
        this._isCollapsable = false;
    }

    /**
     * Create a view & a nav item from a catalogItem
     * @param {CatalogHandler} p_handler 
     * @param {data.core.catalog.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_handler, p_item, p_mappedView) {

        if (!u.tils.isInstanceOf(p_item, CatalogItem)) {
            throw new Error(`non-catalog item added to workspace cell catalog.`);
        } else if (u.tils.isInstanceOf(p_item, Catalog)) {
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
UI.Register('nkmjs-workspace-cell', WorkspaceCell);