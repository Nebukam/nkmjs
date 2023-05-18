// Extendable Data block BASE editor
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const CTX = require(`../context`);
const MetaPropertyInspectorItem = require(`./item-meta-property`);

const base = MetaPropertyInspectorItem;

class MetaObjectInspectorItem extends base {
    constructor() { super(); }

    static __watchMidUpdate = true;

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        // TODO : Only do that on expansion
        if (this._data) { this._BuildPropertyInspectors(); }
        else { this._builder.Clear(); }
        // TODO : Watch for ADDED signal and if expanded, create a control.
    }

    _OnPropertyUpdated(p_meta, p_path, p_value, p_oldValue) {
        // Update input / display values accordingly
    }

    _OnPropertyMidUpdate(p_meta, p_path) {
        // Oh well ?
    }

    _BuildPropertyInspectors() {

        this._builder.Clear();

        let object = this.dataValue,
            basePath = u.isArray(this._metaPath) ? this._metaPath.join('.') : this._metaPath;

        for (var key in object) {

            let value = object[key],
                path = `${basePath}.${key}`,
                ctrlClass = com.GetBinding(CTX.META_INSPECTOR, path, null),
                ctrl = ctrlClass ? this._builder.Add(ctrlClass) : null;

            if (!ctrl) { continue; }

            ctrl.metaPath = path;
            ctrl.data = this._data;

        }

    }

}

module.exports = MetaObjectInspectorItem;