const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);

class UnresolvedReference extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._uri = null;
        this._dataList = new collections.DictionaryList();
    }

    set uri(p_value) { this._uri = p_value; }
    get uri(){ return this._uri; }

    Add(p_data, p_infos) {
        this._dataList.Set(p_data, p_infos);
    }

    Resolve(p_reference) {
        let keys = this._dataList.keys;

        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i],
                infos = this._dataList.Get(key);
            this._ResolveInfos(key, infos, p_reference);                
        }
        this.Broadcast(SIGNAL.REFERENCE_SOLVED, this, keys);
        this.Release();
    }

    _ResolveInfos(p_data, p_infos, p_reference){

        if(p_infos.set){
            p_data[p_infos.set] = p_reference;
        }else if(p_infos.fn){
            if(p_infos.thisArg){
                p_infos.fn.call(p_infos.thisArg, p_reference);
                p_infos.fn = null;
                p_infos.thisArg = null;
            }else{
                p_infos.fn(p_reference);
                p_infos.fn = null;
            }
        }

    }

    _CleanUp() {
        this._uri = null;
        this._dataList.Clear();
        super._CleanUp();
    }
}

module.exports = UnresolvedReference;