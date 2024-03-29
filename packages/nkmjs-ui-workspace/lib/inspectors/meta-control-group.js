const u = require("@nkmjs/utils");
const col = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const InspectorGroup = require(`./inspector-group`);
const MetaControlItem = require(`./meta-control-item`);

const base = InspectorGroup;
let _expandedMetaPaths = new Set();

class MetaControlGroup extends base {
    constructor() { super(); }

    static __defaultSelectOnActivation = false;
    static __ignoreMetaStyle = true;

    static TogglePathExpansion(p_path, p_toggle) {
        if (p_toggle) { _expandedMetaPaths.add(p_path); }
        else { _expandedMetaPaths.delete(p_path); }
    }

    static IsPathExpanded(p_path) { return _expandedMetaPaths.has(p_path); }

    _Init() {
        super._Init();
        this._staticContent = false;
        this._metaPath = '';
        this._metaID = '';
        this._subCtrls = [];
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                margin: `5px`
            },
            '.header': {
                'justify-content': `center`,
                padding: `6px`
            },
            '.facade': { ...style.flexItem.fill, },
        }, base._Style());
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
            if (u.isObject(obj)) {
                for (let member in obj) {

                    let mPath = u.tils.Empty(this._metaPath) ? `${member}` : `${this._metaPath}.${member}`,
                        value = obj[member],
                        ctrlClass = com.GetBinding(
                            `${com.IDS.METAPREFIX}${mPath}`,
                            this._data.constructor,
                            u.isObject(value) ? MetaControlGroup : MetaControlItem),
                        ctrl = this.Attach(ctrlClass, `group`);

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