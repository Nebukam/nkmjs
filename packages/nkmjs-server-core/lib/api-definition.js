'use strict';

const col = require(`@nkmjs/collections`);
const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);
const handlers = require(`./handlers`);

const STATUSES = require("./status-codes");
const FLAGS = require("./flags");

class APIDefinition extends com.Observable {

    constructor(p_express, p_app) {
        super();
        this._app = p_app;
        this._express = p_express;
    }

    _Init() {

        super._Init();

        this._activeHandlers = [];

        this._options = null;
        this._id = ``;
        this._route = `/`;
        this._handlerClass = null;
        this._running = false;
        this._method = null;

        this._Bind(this._Handle);

    }

    get id() { return this._id; }
    set id(p_value) { this._id = p_value; }

    get method() { return this._method; }
    set method(p_value) { this._method = p_value; }

    get route() { return this._route; }
    set route(p_value) { this._route = p_value; }

    get handlerClass() { return this._handlerClass; }
    set handlerClass(p_value) { this._handlerClass = p_value; }

    get requireAuth() { return this._requireAuth; }
    set requireAuth(p_value) { this._requireAuth = p_value; }

    get options() { return this._options; }
    set options(p_value) { this._options = p_value; }

    set express(p_value) { this._express = p_value; }

    get callback() { return this._options.callback; }

    Get(p_id) {
        if (!this._options || !(p_id in this._options)) { return null; }
        return this._options[p_id];
    }

    /**
     * 
     * @returns 
     */
    Start() {

        if (this._running) { return; }

        this._running = true;
        if (!this._handlerClass) { this._handlerClass = handlers.Fn; }

        let
            method = this._method || this._handlerClass.__METHOD,
            r = this._route,
            h = this._Handle;

        this._method = method;

        if (this._requireAuth) {
            switch (method) {
                case FLAGS.POST: this._express.post(r, this._requireAuth(), h); break;
                case FLAGS.GET: this._express.get(r, this._requireAuth(), h); break;
                case FLAGS.POST_AND_GET: this._express.post(r, this._requireAuth(), h).get(r, this._requireAuth(), h); break;
            }
        } else {
            switch (method) {
                case FLAGS.POST: this._express.post(r, h); break;
                case FLAGS.GET: this._express.get(r, h); break;
                case FLAGS.POST_AND_GET: this._express.post(r, h).get(r, h); break;
            }
        }

        console.log(`${this._app.baseURL}${this._route} · · · ( ${this.id} @ ${this._handlerClass.name} )`);

    }

    /**
     * 
     * @returns 
     */
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

        while (this._activeHandlers.length) {
            this._activeHandlers.pop().Abort();
        }

    }

    /**
     * 
     * @param {*} p_req 
     * @param {*} p_res 
     */
    _Handle(p_req, p_res) {

        console.log(`>>> ${p_req.method} ${p_req.url} @ ${this._handlerClass.name} | ${this.id}`);

        if (this.requireAuth &&
            !nkm.main.IsAuthenticated(p_req)) {
            return this.SendError(STATUSES.UNAUTHORIZED);
        }

        if (this._method == FLAGS.POST && !p_req.body) {
            return this.SendError(STATUSES.BAD_REQUEST);
        }

        let newHandler = com.Rent(this._handlerClass);
        newHandler.def = this;
        this._activeHandlers.Add(newHandler);
        newHandler.Watch(com.SIGNAL.RELEASED, this._OnHandlerReleased, this);
        newHandler._InternalHandle(p_req, p_res);

    }

    /**
     * 
     * @param {*} p_handler 
     */
    _OnHandlerReleased(p_handler) {
        this._activeHandlers.Remove(p_handler);
    }

    /**
     * 
     * @param {*} p_req 
     * @param {*} p_status 
     * @returns 
     */
    SendError(p_req, p_status) {
        p_req.status(p_status.code);
        p_req.send({ error: p_status.msg });
        return;
    }

    _CleanUp() {
        this._method = null;
        super._CleanUp();
        this.Stop();
    }

}

module.exports = APIDefinition;