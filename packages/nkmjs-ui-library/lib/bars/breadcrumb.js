'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const BreadcrumbItem = require(`./breadcrumb-item`);

const base = ui.WidgetBar;

class Breadcrumb extends base{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        css: [`@/lists/breadcrum.css`]
    }, base, ['css']);

    static __defaultWidgetClass = BreadcrumbItem;

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
            },
            ':host(.vertical)': {
                'align-content': `flex-end`,
            },
            ':host(.horizontal)': {
                'align-content': `flex-end`,
            }
        }, base._Style());
    }

}

module.exports = Breadcrumb;
ui.Register('nkmjs-breadcrum', Breadcrumb);