const data = require("@nkmjs/data-core");

const EcosystemPart = require(`./ecosystem-part`);

class ModelManager extends EcosystemPart {
    constructor() { super(); }

    _Init(){
        super._Init();

        this._factory = new data.DataFactory();
    }

    get factory(){ return this._factory; }

}

module.exports = ModelManager;
