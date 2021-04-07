const DataBlock = require(`./data-block`);

class SimpleDataBlock extends DataBlock{
    constructor(){super();}

    _Init(){
        super._Init();
        this._data = {};
    }

    _CleanUp(){
        super._CleanUp();
        this._data = {};
    }

}

module.exports = SimpleDataBlock;