/**
 * Select a choice amongst a list of available options.
 * Actually this is merely a popup trigger and data forwarder.
 * Leverage tree item browser or create a browser that only display one folder at a time with a breadcrum
 */

'use strict';

const ui = require(`@nkmjs/ui-core`);
const style = require("@nkmjs/style");


class InputList extends ui.inputs.InputBase {
    constructor() { super(); }


    // ----> DOM

    _Style() {
        return style.Extends({
            '.field': {
            }
        }, super._Style());
    }

    _Render() {

    }

}

module.exports = InputList;
ui.Register(`nkmjs-input-list`, InputList);