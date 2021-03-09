'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS, SIGNAL } = require(`@nkmjs/common`);
const { CatalogItem } = require(`@nkmjs/data-core`);

const UI_ID = require(`../ui-id`);
const UI = require(`../ui`);
const UI_SIGNAL = require(`../ui-signal`);
const UI_FLAG = require(`../ui-flag`);

const View = require(`./view`);
const CatalogViewBuilder = require("../helpers/catalog-view-builder");
const FlagEnum = require(`../helpers/flag-enum`);
const ShelfNav = require(`./shelf-nav`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Drawer extends View {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/views/drawer.css`]
    }, View, ['css']);

    // ----> Init

    static __default_orientation = UI_FLAG.VERTICAL;

    _Init() {
        super._Init();

        this._empty = true;

    }

    _PostInit() {

        super._PostInit();

    }


    // ----> DOM

    _Render() {
        super._Render();
    }


    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = Drawer;
UI.Register('nkmjs-drawer', Drawer);
