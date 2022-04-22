'use strict';

const u = require("@nkmjs/utils");
const data = require("@nkmjs/data-core");
const ui = require("@nkmjs/ui-core");

const items = require(`./items`);
const InspectorView = require(`../inspector-view`);

const base = InspectorView;

class MetadataInspector extends base {
    constructor() { super(); }

    static __ppdata = (p_owner, p_data) =>{

        if (u.isInstanceOf(p_data, data.Metadata)) { return p_data; }

        let metadata = p_data.metadata;
        if (u.isInstanceOf(p_data, data.Metadata)) { return metadata; }

        return null;

    }

    _Init(){
        super._Init();
        this._dataObserver.Hook(data.SIGNAL.META_ADDED, this._OnMetaAdded, this);
        this._mainMetadataObserver = new data.helpers.MetadataObserver();

        this._dataPreProcessor = this.constructor.__ppdata;

    }

    _OnMetaAdded(p_metadata, p_path, p_element){

    }

}

module.exports = MetadataInspector;
ui.Register('nkmjs-metadata', MetadataInspector);