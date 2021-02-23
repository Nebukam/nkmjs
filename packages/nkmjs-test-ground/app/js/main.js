'use strict';

const nkmjs = require(`@nkmjs/core`);

class App extends nkmjs.app.AppBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        // Constructor, initialize things here.

    }

    AppReady() {
        super.AppReady();
        // App is ready, do magic here.

    }

}

module.exports = App;