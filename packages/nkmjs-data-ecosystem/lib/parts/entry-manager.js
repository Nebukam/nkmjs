const data = require("@nkmjs/data-core");

const EcosystemPart = require(`./ecosystem-part`);

class EntryManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._models = null;
    }

    get models() { return this._models; }
    set models(p_value) {

        if (this._models === p_value) { return; }

        let oldModels = this._models;
        this._models = p_value;

        if (oldModels) {
            // Unwatch signals
            this._models._factory
                .Unwatch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
                .Unwatch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);
        }

        if (this._models) {
            // watch signals
            this._models._factory
                .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
                .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);
        }

    }

    _OnModelRegistered(p_factory, p_model){
        // Create factory
    }

    _OnModelUnregistered(p_factory, p_model){
        
    }



}

module.exports = EntryManager;
