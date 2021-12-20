'use strict';

const collections = require(`@nkmjs/collections`);
const com = require(`@nkmjs/common`);

class APIDefinition extends com.pool.DisposableObjectEx {

    constructor(p_express) { 
        super(); 
        this._express = p_express;
    }

    _Init() {
        super._Init();

        this._activeHandlers = new collections.List();

        this._id = ``;
        this._route = `/`;
        this._handlerClass = null;
        this._running = false;

        this._Bind(this._Handle);

    }

    get id() { return this._id; }
    set id(p_value) { this._id = p_value; }

    get route() { return this._route; }
    set route(p_value) { this._route = p_value; }

    get handlerClass() { return this._handlerClass; }
    set handlerClass(p_value) { this._handlerClass = p_value; }

    set express(p_value) { this._express = p_value; }

    Start() {
        
        if (this._running) { return; }

        this._running = true;
        this._express.get(this._route, this._Handle);

    }

    Stop() {
        
        if (!this._running) { return; }

        this._running = false;

        let layers = this._express._router.stack;
        for (var i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (!layer.route) { continue; }
            if (layer.route.path == this._route) {
                layers.splice(i, 1);
                break;
            }
        }

        while (!this._activeHandlers.isEmpty) {
            this._activeHandlers.Pop().Cancel();
        }

    }

    _Handle(p_request, p_response) {        
        let newHandler = com.Rent(this._handlerClass);
        this._activeHandlers.Add(newHandler);
        newHandler.Watch(com.SIGNAL.RELEASED, this._OnHandlerReleased, this);
        newHandler._InternalHandle(p_request, p_response);
    }

    _OnHandlerReleased(p_handler) {
        this._activeHandlers.Remove(p_handler);
    }

    _Cleanup() {
        super._Cleanup();
        this.Stop();
    }

}

module.exports = APIDefinition;