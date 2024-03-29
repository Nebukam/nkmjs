const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const data = require(`@nkmjs/data-core`);

const InspectorItem = require(`./inspector-item`);

const base = InspectorItem;

class MetaControlItem extends Inspec__BASE__torItem {
    constructor() { super(); }

    static __defaultSelectOnActivation = false;
    static __ignoreMetaStyle = true;

    _Init() {

        super._Init();

        this._metaPath = '';
        this._metaID = '';

        this._inputClass = ui.inputs.InputField;
        this._input = null;

        this._label = null;

    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                margin: `5px`,
                padding: `6px`,
                ...style.flex.columns,
                ...style.flex.stretch,
            },
            '.facade': {
                ...style.flexItem.fill,
                'margin-top': `-5px`,
                'margin-bottom': `0px`
            },
            '.control': {
                ...style.flexItem.fill,
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: ui.IDS.LABEL }, this._host));
    }

    get metaPath() { return this._metaPath; }
    set metaPath(p_value) {
        this._metaPath = p_value;
    }

    get metaID() { return this._metaID; }
    set metaID(p_value) {
        this._metaID = p_value;
        this._facade.text = p_value;
    }

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);

        if (this._input) {
            this._input.Release();
            this._input = null;
        }

        if (!this._data) { return; }

        let mData = u.isInstanceOf(this._data, data.Metadata) ? this._data : this._data.metadata;
        let obj = mData.Get(this._metaPath, null);

        if (u.tils.Void(obj)) { return; }

        this._input = this.Attach(this._inputClass, `control`);
        this._OnInputCreated(this._input);
        this._input.Watch(ui.inputs.SIGNAL.VALUE_SUBMITTED, this._OnInputValueCommited, this);
        this._input.currentValue = obj;

    }

    _OnInputCreated(p_input) {

    }

    _OnInputValueCommited(p_input, p_changedValue) {

        let mData = u.isInstanceOf(this._data, data.Metadata) ? this._data : this._data.metadata;
        let mPath = this._metaPath;

        this._Do(data.ops.actions.ActionMetadataSet, {
            target: mData,
            path: mPath,
            value: p_changedValue
        });

        this._input.currentValue = mData.Get(mPath, undefined);

    }

    _CleanUp() {
        this._metaPath = '';
        super._CleanUp();
    }

}

module.exports = MetaControlItem;
ui.Register(`nkmjs-meta-control-item`, MetaControlItem);