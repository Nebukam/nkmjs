'use strict';

const com = require("@nkmjs/common");
const { CSS } = require(`@nkmjs/style`);
const { UI, Toolbar } = require(`@nkmjs/ui-core`);

const BreadcrumbItem = require(`./breadcrumb-item`);

class Breadcrumb extends Toolbar{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/breadcrum.css`]
    }, Toolbar, ['css']);

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
UI.Register('nkmjs-breadcrum', Breadcrumb);