'use strict';

const { UI, Widget } = require(`@nkmjs/ui-core`);

class StatusBar extends Widget{
    constructor(){super();}
}

module.exports = StatusBar;
UI.Register(`nkmjs-status-bar`, StatusBar);