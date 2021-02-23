'use strict';

const { U } = require(`@nkmjs/utils`);
const { NFOS } = require(`@nkmjs/common`);
const { Catalog, CatalogItem } = require(`@nkmjs/data-core`);
const { UI, UI_FLAG, Drawer } = require(`@nkmjs/ui-core`);

const WorkspaceCellNav = require(`./workspace-cell-nav`);

class WorkspaceCell extends Drawer {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/views/workspace-cell.css`]
    }, Drawer, ['css']);

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

        if (!U.isInstanceOf(p_item, CatalogItem)) {
            throw new Error(`non-catalog item added to workspace cell catalog.`);
        } else if (U.isInstanceOf(p_item, Catalog)) {
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