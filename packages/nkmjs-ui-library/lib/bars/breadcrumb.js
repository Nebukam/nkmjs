'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const BreadcrumbItem = require(`./breadcrumb-item`);

class Breadcrumb extends ui.WidgetBar{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        css: [`@/lists/breadcrum.css`]
    }, ui.WidgetBar, ['css']);

    _Init(){
        super._Init();
        this._defaultWidgetClass = BreadcrumbItem;
    }

    // ----> DOM

    _Style() {
        return style.Extends({
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