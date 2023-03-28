'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const operations = require(`../operations`);
const commands = operations.commands;

const __flag_inherited = `inherited`;

const ControlWidget = require(`../control-widget`);

class ValueControl extends ControlWidget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/property-control.css`]
    }, base, ['css']);

    static __usePaintCallback = true;

    static __ppdata = (p_owner, p_data) => {
        if (!p_data) { return null; }
        if (p_owner._dataMemberId) { return p_data[p_owner._dataMemberId]; }
        return p_data;
    };

    static __distribute = base.__distribute.Ext()
        .To(`descriptorId`, null, null)
        .To(`dataMemberId`, null, null)
        .To(`inputOnly`, null, false)
        .To(`onSubmit`, `_onSubmitFn`, null)
        .To(`invertInputOrder`, null, false)
        .To(`directHidden`, `_directHidden`, false)
        .To(`directSet`, `_directSet`, false)
        .To(`command`, null, commands.SetProperty);

    _Init() {
        super._Init();
        this._fallbackData = null;
        this._descriptor = null;
        this._input = null;
        this._directSet = false;
        this._directHidden = false;
        this._dataMemberId = null;
        this._valueType = null;

        this._Bind(this._OnValueSubmit);

        this._flags.Add(this, __flag_inherited);

        this._onSubmitFn = null;
        this._inherited = false;
        this._inputOnly = false;

        this._dataPreProcessor = this.constructor.__ppdata;
        this._inputOrder = 1;
    }

    _PostInit() {
        super._PostInit();
        //this.focusArea = this;
    }

    static _Style() {
        return style.Extends({
            ':host': {
                //'@': ['fade-in'],
                'position': 'relative',
                'display': 'flex',
                'flex-flow': 'row nowrap',
                'align-items': 'center',
                'flex': '1 1 auto',

                'margin': '0 2px 5px 2px',
            },
            ':host(.selected)': {
                'background-color': 'rgba(127,127,127,0.25)'
            },
            ':host(.input-first) .input-field': { 'flex': '0 0 auto' },
            ':host(.input-first) .label': { 'margin-left': '10px' },
            ':host(.inherited) .input-field, :host(.inherited) .label': {
                //'pointer-events': 'none !important',
                'opacity': '0.8'
            },
            '.label': {
                'white-space': 'nowrap',
                'flex': '1 1 50%'
            },
            '.label:not(:first-child)': {
                'margin-left': `4px`
            },
            ':host(.false) .label': {
                'text-decoration': 'line-through var(--col-error-dark)',
            },
            '.label::after': {
                'content': '"🛈"',
                //'position':'absolute',
                'margin-left': '3px',
                //'margin-top':'-3px',
                'font-size': '12px',
                'opacity': '0.5'
            },
            '.input-field': {
                'flex': '1 1 50%'
            },
            '.nullify': {
                //'width': '30px',
                'margin-right': '4px',
                //'margin-left': '-4px'
            },
        }, base._Style());
    }

    _Render() {
        super._Render();

        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `label` }, this._host), false, false);
        this._label.ellipsis = true;

        this._nullifyBtn = this.Attach(ui.GetClass(`nkmjs-tool-button`), `nullify`, this._host);
        this._nullifyBtn.options = {
            size: ui.FLAGS.SIZE_XS, trigger: { fn: this._Bind(this._NullifyValue) },
            htitle: `Link to Family Metrics.`,
            icon: `link`
        }

    }

    set dataMemberId(p_value) {
        this._dataMemberId = p_value;
    }

    set invertInputOrder(p_value) {

        if (p_value) {
            this._label._element.style.order = `1`;
            this._inputOrder = 0;
            this.classList.add(`input-first`);
        } else {
            this._label._element.style.order = `0`;
            this._inputOrder = 1;
            this.classList.remove(`input-first`);
        }

        if (this._input) { this._input.order = this._inputOrder; }
    }

    set inputOnly(p_value) {
        this._inputOnly = p_value;
        if (p_value) { this._label._element.style.display = `none`; }
        else { this._label._element.style.removeProperty(`display`); }
    }

    get descriptorId() { return this._descriptor.id; }
    set descriptorId(p_id) {

        this._descriptor = data.GetDescriptor(p_id);

        if (this._input) {
            this._input.order = null;
            this._input.Release();
            this._input = null;
        }

        if (!p_id) { return; }

        this._label._element.setAttribute(`title`, this._descriptor.desc);
        this._label.Set(this._descriptor.label || this._descriptor.id);

        this._input = this.Attach(this._GetInputClass(), `input-field`);
        this._input.options = {
            size: ui.FLAGS.SIZE_S,
            onSubmit: { fn: this._OnValueSubmit },
            ...this._descriptor.inputOptions
        };

        this._input.setAttribute(`title`, this._descriptor.desc);

        this._input.order = this._inputOrder;

    }

    set isNullable(p_value) {
        this._isNullable = p_value;
        this._nullifyBtn.visible = p_value;
    }

    get localValueObj() {
        return this._data._values[this._descriptor.id];
    }

    get localValue() {
        if (!this._data) { return null; }
        return this._data.Get(this._descriptor.id);
    }

    get resolvedValue() {
        if (!this._data) { return null; }
        return this._data.Resolve(this._descriptor.id);
    }

    set command(p_value) {
        this._cmd = p_value;
    }

    set placeholderValue(p_value) {
        this._input.placeholderValue = p_value;
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        if (this._data) {
            let dataObj = this.localValueObj;
            this.isNullable = dataObj ? (`nullable` in dataObj) : false;
            this._valueType = data.SIMPLEX.GetValueType(this._descriptor.id);
        } else {
            this.isNullable = false;
            this._valueType = null;
        }

        if (this._directSet && this._directHidden) { this.visible = false; }
        else { this.visible = true; }

    }

    _OnDataUpdated(p_data) {

        super._OnDataUpdated(p_data);

        this._inherited = this._isNullable ? this.localValueObj.value == null : false;

        this._flags.Set(__flag_inherited, this._inherited);

        if (this._inherited) {
            this._input.currentValue = null;
            if (this.resolvedValue != null) { this._input.placeholderValue = this.resolvedValue; }
            this._nullifyBtn.icon = `font`;
            this._nullifyBtn.disabled = true;
        } else {
            this._input.currentValue = this.localValue;
            this._nullifyBtn.icon = `link`;
            this._nullifyBtn.disabled = false;
        }

        if (this.localValueObj.value == null &&
            (this._descriptor.inputOptions && this._descriptor.inputOptions.nullPlaceholder)) {
            this._input.placeholderValue = this._descriptor.inputOptions.nullPlaceholder;
        }

        // Red strikethrough on boolean input

        if (u.isInstanceOf(this._valueType, data.TYPES.BOOLEAN)
            && !this._input.currentValue) { this.classList.add(`false`); }
        else { this.classList.remove(`false`); }

    }

    _OnValueSubmit(p_input, p_value) {

        if (this._releasing || this._released || !this._data) { return; }

        if (this._directSet) {
            this._data.Set(this._descriptor.id, p_value);
            return;
        }

        if (this._onSubmitFn) {
            this._onSubmitFn(this, this._descriptor.id, p_value);
        } else if (this._cmd) {
            this._cmd.emitter = this;
            this._cmd.inputValue = p_value;
            this._cmd.Execute();
        } else {
            this._data.Set(this._descriptor.id, p_value);
        }
    }

    _NullifyValue(p_input) {

        let valueObj = this.localValueObj;

        if (this._directSet) {
            valueObj.value = null;
            this._data.CommitValueUpdate(this._descriptor.id, valueObj, null, false);
            return;
        }

        if (valueObj.value == null) { return; }

        commands.SetProperty.emitter = this;
        commands.SetProperty.inputValue = null;
        commands.SetProperty.Execute();

    }

    _GetInputClass() {
        if (this._descriptor.inputType) { return this._descriptor.inputType; }
        return ui.inputs.GetInput(this._descriptor.valueType, this.constructor);
    }

    _CleanUp() {

        this.descriptorId = null;

        this._onSubmitFn = null;
        this._cmd = null;

        this._fallbackData = null;
        this._descriptor = null;
        this._directHidden = false;
        this._directSet = false;

        this._flags.Set(__flag_inherited, false);

        this._onSubmitFn = null;
        this._inherited = false;
        this._inputOnly = false;

        this._inputOrder = 1;

        this._dataMemberId = null;

        super._CleanUp();
    }

}

module.exports = ValueControl;
ui.Register(`nkmjs-property-control`, ValueControl);