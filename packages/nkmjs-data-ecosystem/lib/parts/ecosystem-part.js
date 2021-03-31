const com = require(`@nkmjs/common`);
const data = require("@nkmjs/data-core");

class EcosystemPart extends com.pool.DisposableObjectEx{
    constructor(){
        super();
    }

    _Init(){
        super._Init();
        this._catalog = new data.catalogs.Catalog();
    }

    _CleanUp(){
        super._CleanUp();
        this._catalog.Clear();
    }

}

module.exports = EcosystemPart;
