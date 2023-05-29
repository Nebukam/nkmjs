'use strict';

const u = require("@nkmjs/utils");
const col = require("@nkmjs/collections");
const actions = require("@nkmjs/actions");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);

const View = require(`./view`);

const base = View;

class Flow extends base {
    constructor() { super(); }

    _Init(){
        super._Init();
        this._chain = [];
        this._currentView = null;
    }

    Next(p_view){
        // Push new view in chain and set as current
    }

    Previous(){
        // Release current view, set last in chain as current
    }

    _OnCurrentViewRequestClose(p_view){
        if(this._currentView === p_view){ this.Previous(); }
    }

}

module.exports = Flow;