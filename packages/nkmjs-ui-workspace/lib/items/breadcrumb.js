'use strict';

const com = require("@nkmjs/common");
const { CSS } = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const BreadcrumbItem = require(`./breadcrumb-item`);

class Breadcrumb extends ui.helpers.Toolbar{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/breadcrum.css`]
    }, ui.helpers.Toolbar, ['css']);

    _Init(){
        super._Init();
        this._defaultButtonClass = BreadcrumbItem;
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            ':host': {
            },
            ':host(.vertical)': {
                'align-content': `flex-end`,
            },
            ':host(.horizontal)': {
                'align-content': `flex-end`,
            }
        }, super._Style());
    }

}

module.exports = Breadcrumb;
ui.Register('nkmjs-breadcrum', Breadcrumb);