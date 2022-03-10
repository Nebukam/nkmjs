'use strict';

/*const nkm = require(`@nkmjs/core`);*/

class App extends nkm.app.AppBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        // Constructor, initialize things here.
    }

    AppReady() {
        super.AppReady();
        // App is ready, do magic here.

    }

    _IsReadyForDisplay(){
        // Will be called after AppReady, until it returns true.
        return true;
    }

    AppDisplay(){
        //Called as soon as _IsReadyForDisplay returns true, 
        //after the loading screen starts fading out        
    }

}

module.exports = App;