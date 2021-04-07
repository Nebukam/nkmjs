const data = require("@nkmjs/data-core");

class FieldGroup extends data.SimpleDataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._Reset();
    }

    get title() { return this._data.title; }
    set title(p_value) { this._data.title = p_value; }

    get description(){ return this._data.description; }
    set description(p_value){ this._data.description = p_value; }

    _Reset(){
        this._data.title = `untitled`;
        this._data.description = ``;
    }

    _CleanUp(){
        super._CleanUp();
        this._Reset();
    }

}