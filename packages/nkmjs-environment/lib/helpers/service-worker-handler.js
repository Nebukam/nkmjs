const com = require("@nkmjs/common");
const SW_SIGNAL = require("../sw-signal");

class ServiceWorkerHandler extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._name = '';
        this._registration = null;
        this._installedWorker = null;
        this._newWorker = null;

        this._Bind(this._OnRegistered);
        this._Bind(this._OnInstalledWorkerStateChange);
        this._Bind(this._OnNewWorkerStateChange);
        this._Bind(this._OnRegistrationError);
        this._Bind(this._OnUpdateFound);
        this._Bind(this._OnInstalledWorkerMessage);
        this._Bind(this._OnNewWorkerMessage);
        this._Bind(this._OnMessage);
    }

    /**
     * Returns true if the navigator
     * @param {*} p_name 
     * @returns 
     */
    Register(p_name) {

        this._name = p_name;
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', this._OnMessage);
            navigator.serviceWorker.register(this._name)
                .then(this._OnRegistered)
                .catch(this._OnRegistrationError);
            return true;
        } else {
            return false;
        }

    }

    _OnRegistrationError(p_err) {
        console.log(`_OnRegistrationError(${p_err})`, p_err);
        this._Broadcast(SW_SIGNAL.SW_REGISTRATION_ERROR, this, p_err);
    }

    _OnRegistered(p_registration) {

        console.log(`_OnRegistered(${p_registration})`, p_registration);
        this._Broadcast(SW_SIGNAL.SW_REGISTERED, this);

        this._registration = p_registration;

        console.log(`Active : `, this._registration.active);
        console.log(`Installing : `, this._registration.installing);

        this._installedWorker = this._registration.active;

        if (this._installedWorker) {
            this._installedWorker.onstatechange = this._OnInstalledWorkerStateChange;
            this._installedWorker.addEventListener('message', this._OnInstalledWorkerMessage);
            this._Ready();
        }

        this._newWorker = this._registration.installing;
        if (this._newWorker) {
            this._newWorker.addEventListener('message', this._OnNewWorkerMessage);
            this._newWorker.onstatechange = this._OnNewWorkerStateChange;
        }

        this._registration.onupdatefound = this._OnUpdateFound;

    }

    _OnUpdateFound(){
        
        console.log(`_OnUpdateFound`);

        if (this._newWorker) {
            this._newWorker.removeEventListener('message', this._OnNewWorkerMessage);
            this._newWorker.onstatechange = null;
        }

        this._newWorker = this._registration.installing;

        if (this._newWorker) {
            this._newWorker.addEventListener('message', this._Bind(this._OnNewWorkerMessage));
            this._newWorker.onstatechange = this._OnNewWorkerStateChange;
        }

    }

    _OnInstalledWorkerStateChange(p_evt) {
        this._installedWorkerState = this._installedWorker.state;
    }

    _OnNewWorkerStateChange(p_evt) {
        // `installed` > `activating` > `activated`
        this._newWorkerState = this._newWorker.state;
        if (this._newWorkerState === `activated`) {
            if (this._installedWorker) {
                this._Broadcast(SW_SIGNAL.SW_UPDATE_AVAILABLE, this);
            } else {
                this._installedWorker = this._newWorker;
                this._Ready();
            }
        }

    }

    _OnInstalledWorkerMessage(p_evt) {
        console.log(`_OnInstalledWorkerMessage(${p_evt})`, p_evt);
        this._Broadcast(SW_SIGNAL.SW_MESSAGE, this, p_evt.data);
    }

    _OnNewWorkerMessage(p_evt) {
        console.log(`_OnNewWorkerMessage(${p_evt})`, p_evt);
        this._Broadcast(SW_SIGNAL.SW_MESSAGE, this, p_evt.data);
    }

    _OnMessage(p_evt) {
        console.log(`_OnMessage(${p_evt})`, p_evt);
        this._Broadcast(SW_SIGNAL.SW_MESSAGE, this, p_evt.data);
    }

    Send(p_data) {
        console.log(`Send ${p_data} to this._installedWorker = ${this._installedWorker}`, p_data);
        this._installedWorker.postMessage(p_data);
    }

    //

    _Ready() {
        //this.Send({command:`YOLO`});
        this._Broadcast(SW_SIGNAL.SW_READY, this);
    }

}

module.exports = ServiceWorkerHandler;