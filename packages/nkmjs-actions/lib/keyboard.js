'use strict';

const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const KEYS = require(`./keyboard-keys`);

class KEYBOARD extends com.Observable {
    constructor() { super(); }

    get KEYS() { return KEYS; }

    _Init() {
        super._Init();
        this._keystrokes = new collections.List();
        this._activeKeystrokes = new collections.List();
        this._activeChain = [];
    }

    _Register(p_keystroke) {
        this._keystrokes.Add(p_keystroke);
        this._activeKeystrokes.Add(p_keystroke);
    }

    _Unregister(p_keystroke) {
        this._keystrokes.Remove(p_keystroke);
        this._activeKeystrokes.Remove(p_keystroke);
    }

    _Push(p_keyCode) {
        if (this._activeChain.includes(p_keyCode)) { return; }
        this._activeChain.push(p_keyCode);
        return this._UpdateActiveKeystrokes();
    }

    _Pull(p_keyCode) {
        let index = this._activeChain.indexOf(p_keyCode);
        if (index == -1) { return; }
        this._activeChain.splice(index, 1);
        this._BuildActiveKeystrokes();
    }

    _BuildActiveKeystrokes() {

        let an = this._activeKeystrokes.count;

        for (let i = 0; i < an; i++) {
            this._activeKeystrokes.At(i).Deactivate();
        }

        this._activeKeystrokes.Clear();
        let n = this._keystrokes.count;
        for (let i = 0; i < n; i++) {

            let k = this._keystrokes.At(i),
                match = k.GetMatch(this._activeChain);

            if (match >= 0) { this._activeKeystrokes.Unshift(k); } // FILO

        }

    }

    _UpdateActiveKeystrokes() {

        if (this._activeKeystrokes.count == 0) { this._BuildActiveKeystrokes(); }

        for (let i = 0; i < this._activeKeystrokes.count; i++) {

            let k = this._activeKeystrokes.At(i),
                match = k.GetMatch(this._activeChain);

            if (match < 0) { this._activeKeystrokes.Remove(k); i--; }
            else if (match == 1) {
                let consumed = k.Activate();
                if (consumed && !k.silent) { return true; }
            }

        }

        return false;

    }

}

module.exports = new KEYBOARD();