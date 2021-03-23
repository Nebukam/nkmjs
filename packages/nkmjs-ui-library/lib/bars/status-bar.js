'use strict';

const ui = require(`@nkmjs/ui-core`);

class StatusBar extends ui.Widget{
    constructor(){super();}
}

module.exports = StatusBar;
ui.Register(`nkmjs-status-bar`, StatusBar);