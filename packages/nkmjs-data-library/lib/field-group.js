const data = require("@nkmjs/data-core");

class FieldGroup extends data.SimpleDataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._Reset();
    }

    get title() { return this._data.title; }
    set title(p_value) { this._data.title = p_value; }

    get comment() { return this._data.comment; }
    set comment(p_value) { this._data.comment = p_value; }

    get order() { return this._data.order; }
    set order(p_value) { this._data.order = p_value; }

    _Reset() {
        this._data.title = `untitled`;
        this._data.comment = ``;
        this._data.order = 0;
    }

    _CleanUp() {
        super._CleanUp();
        this._Reset();
    }

}