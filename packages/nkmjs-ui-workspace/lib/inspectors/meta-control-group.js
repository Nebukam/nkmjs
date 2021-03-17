const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const InspectorGroup = require(`./inspector-group`);
const MetaControlItem = require(`./meta-control-item`);

let _expandedMetaPaths = new collections.Dictionary();

class MetaControlGroup extends InspectorGroup {
    constructor() { super(); }

    static TogglePathExpansion(p_path, p_toggle) {
        if (p_toggle) {
            _expandedMetaPaths.Set(p_path, true);
        } else {
            _expandedMetaPaths.Remove(p_path);
        }
    }

    static IsPathExpanded(p_path) {
        return _expandedMetaPaths.Get(p_path);
    }

    _Init() {
        this._ignoreMetaStyle = true;
        this.default_SelectOnActivation = false;
        super._Init();
        this._staticContent = false;
        this._metaPath = '';
        this._metaID = '';
        this._subCtrls = new Array(0);
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                margin: `5px`
            },
            '.header': {
                'justify-content': `center`,
                padding: `6px`
            },
            '.facade': { flex: `1 1 auto` },
        }, super._Style());
    }

    get metaPath() { return this._metaPath; }
    set metaPath(p_value) {
        this._metaPath = p_value;
    }

    get _metaKey() { return this._data ? `@${this._data.constructor}${this._metaPath}` : `@${this._metaPath}`; }

    get metaID() { return this._metaID; }
    set metaID(p_value) {
        this._metaID = p_value;
        this._facade.text = p_value;
    }

    _Expand() {
        super._Expand();
        MetaControlGroup.TogglePathExpansion(this._metaKey, true);
    }

    _Collapse() {
        if (this._data) {
            MetaControlGroup.TogglePathExpansion(this._metaKey, false);
        }
        super._Collapse();
    }

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);
        if (this._data) {
            let result = MetaControlGroup.IsPathExpanded(this._metaKey);
            if (result) {
                this.Expand();
            }
        }
    }

    _BuildContent() {
        super._BuildContent();

        let mData = this._data.metadata;
        let obj = u.tils.Empty(this._metaPath) ? mData._data : mData.Get(this._metaPath, null);

        if (obj) {
            if (u.tils.isObject(obj)) {
                for (let member in obj) {

                    let mPath = u.tils.Empty(this._metaPath) ? `${member}` : `${this._metaPath}.${member}`,
                        value = obj[member],
                        ctrlClass = com.BINDINGS.Get(
                            `${com.IDS.METAPREFIX}${mPath}`,
                            this._data.constructor,
                            u.tils.isObject(value) ? MetaControlGroup : MetaControlItem),
                        ctrl = this.Add(ctrlClass, `group`);

                    //if(!ctrl){continue;}

                    ctrl.metaID = member;
                    ctrl.metaPath = mPath;
                    ctrl.context = this._context;
                    ctrl.data = this._data;

                    this._subCtrls.push(ctrl);

                }
            } else { /* This should not happen */ }
        } else { /* Object is null */ }
    }

    _ClearContent() {
        while (this._subCtrls.length != 0) {
            this._subCtrls.pop().Release();
        }
    }

    _CleanUp() {
        this._metaPath = '';
        super._CleanUp();
    }

}

module.exports = MetaControlGroup;
ui.Register(`nkmjs-meta-control-group`, MetaControlGroup);