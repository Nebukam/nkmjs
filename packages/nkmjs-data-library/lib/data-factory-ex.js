'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const data = nkm.data;

const SIGNAL = require(`./signal`);

class DataFactoryEx extends data.DataFactory {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnItemBaseChanged);
    }

    _OnItemRegistered(p_repertoire, p_item) {
        super._OnItemRegistered(p_repertoire, p_item);
        p_item.Watch(SIGNAL.BASE_CHANGED, this._OnItemBaseChanged);
        if (p_item.base) {
            this._OnItemBaseChanged(p_item, null);
        }
    }

    _OnItemUnregistered(p_repertoire, p_item) {
        super._OnItemUnregistered(p_repertoire, p_item);
        p_item.Unwatch(SIGNAL.BASE_CHANGED, this._OnItemBaseChanged);
    }

    _OnItemBaseChanged(p_item, p_oldBase) {
        // This ensures that items are roughly ordered from low to high inheritance
        // Hence ecosystem bundle can safely read & write models/entries in order without
        // having to worry about slowdown from unresolved references during deserialization.
        // Definitely a naive trick, but does the job very well.
        if (p_item.base) { this._itemRep._itemList.MoveAfter(p_item, p_item.base); }
        else { this._itemRep._itemList.Move(p_item, 0); }
    }
}

module.exports = DataFactoryEx;