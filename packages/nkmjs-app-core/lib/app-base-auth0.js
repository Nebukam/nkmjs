/**
 * Streamlined app kickstart constructor
 * - is provided with a few basic data from electron such as global paths
 * - attempts to load preferences
 *      - on fail : create preference file
 *      - on success : read preference file
 *          - load and deploy base kit dependencies
 * 
 * TODO : In electron, notify the main process when the URL is changing, so the app can be reloaded
 * in the state in was in, and re-open where things were left off.
 */
'use strict';

const com = require("@nkmjs/common");

/**
 * @typedef LayerDefinition
 * @property {function} cl Layer class constructor
 * @property {string} id Layer unique id. When created, will be assigned to this[id]
 * @property {function} [fn] Callback on layer creation (in order)
 * @property {function} [postFn] Callback on layer creation (in order, after )
 */

/*

    #1 - Create app instance
        -> App instance registers itself to environment
        -> App instance hook to environment readiness

    #2 - Set environment config (that will allow the app to bootstrap correctly)
        -> App is starting with a cleanly set environment

*/

class AppBase extends com.Observable {
    constructor() { super(); }

    _Init() {
        this._authStarted = false;
        this._authReady = false;
        super._Init();
    }

    /**
     * Checks if the app is ready to be displayed to the user
     * and call AppDisplay as soon as _IsReadyForDisplay returns true.
     */
    _InternalDisplayReadyCheck() {
        if (!this._IsAuthReady()) {
            com.WatchNextTick(this._InternalDisplayReadyCheck);
            return;
        }

        super._InternalDisplayReadyCheck();
    }

    /**
     * Return true by default. This is where you can test for server readyness and things like that.
     * @returns true if the app is ready for display, false otherwise
     */
    _IsAuthReady() {
        if (!this._authStarted) { this._StartAuthentication(); }
        return this._authReady;
    }

    _StartAuthentication(){
        // Go to login URL, then wait for deeplink.
    }

    //#region Electron & Node

    "#if DEFINE_NODE";

    _onDeepLink(p_evt, p_content) {
        super._onDeepLink(p_evt, p_content);
        const authorizationCode = parsedUrl.searchParams.get('code');
    }

    "#endif";


}

module.exports = AppBase;