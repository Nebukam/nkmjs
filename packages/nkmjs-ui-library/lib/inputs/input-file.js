'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const env = require(`@nkmjs/environment`);
const style = require('@nkmjs/style');
const ui = require(`@nkmjs/ui-core`);

const buttons = require(`../buttons`);

const InputPath = require(`./input-path`);

const base = InputPath;

class InputFile extends base {
    constructor() { super(); }

    static __distribute = base.__distribute.Ext()
        .To(`multiSelection`, null, false);

    _Init() {

        super._Init();

        this._Bind(this._onPickerChange);
        this._Bind(this._OnPicked);

        // TODO : Handle web-based pick !
        // TODO : Add support for drag'n drop

        this._openType = 'openFile';
        this._picker = null;
        this._iconID = `document-search`;

        this._dropExt = this._pointer.Add(ui.extensions.Drop);
        this._dropExt.Hook({
            check: { fn: this._Bind(this._CheckDrop) },
            drop: { fn: this._Bind(this._Drop) },
            dropCandidate: { fn: this._Bind(this._ToggleDropCandidate) }
        });

        this._multiSelection = false;

    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            '.input-btn': {
                ...style.flexItem.fill,
            },
            ':host(.allow-drop)': {
                'background-color': `#00ff00`
            }
        }, base._Style());
    }

    _Render() {
        super._Render();

        if (env.isNodeEnabled) {

            this._picker = this.Attach(buttons.Tool, `input-btn`);
            this._picker.options = {
                [com.IDS.ICON]: this._iconID,
                trigger: { fn: this._Pick, thisArg: this },
                variant: ui.FLAGS.MINIMAL
            };

            this._sizeEnum.Add(this._picker);

        } else {
            this._picker = ui.dom.El(`input`, { class: 'input-btn', type: 'file' }, this._host);
            this._picker.addEventListener(`change`, this._onPickerChange);
        }

        /*
        this._picker = UDOM.New(`input`, {class:'input-btn', type:'file'}, this._host);
        this._picker.addEventListener(`change`, this._onPickerChange );
        */
    }

    get multiSelection() { return this._multiSelection; }
    set multiSelection(p_value) { this._multiSelection = p_value; }

    _GrabValue() {
        let values = this._inputField.value.split(`,`);
        for (let i = 0; i < values.length; i++) { values[i] = values[i].trim(); }
        return values;
    }

    _Pick() {
        if (env.isNodeEnabled) {
            actions.RELAY.ShowOpenDialog({
                defaultPath: this._currentValue ? this._currentValue : ``,
                properties: this._multiSelection ? [this._openType, 'multiSelections'] : [this._openType]
            }, this._OnPicked);
        }
    }

    _OnPicked(p_response) {
        if (p_response.canceled || !p_response.filePaths) { return; }
        let val = p_response.filePaths.join(`, `);
        this.changedValue = p_response.filePaths;
    }

    _onPickerChange(p_evt) {
        console.log(this._picker.value);
        console.log(p_evt);
    }

    // Drop

    _ToggleDropCandidate(p_toggle) {
        ui.dom.CSS(this, 'border', p_toggle ? `1px solid red` : null);
    }

    _CheckDrop(p_data) {
        if (u.isString(p_data)) {
            return true;
        } else if (u.isInstanceOf(p_data, DataTransfer)) {
            return true;
        }
        return false;
    }

    _Drop(p_data) {
        if (u.isString(p_data)) {
            this.currentValue = p_data;
        } if (u.isInstanceOf(p_data, DataTransfer)) {
            return true;
        }
    }

}

module.exports = InputFile;
ui.Register(`nkmjs-input-file`, InputFile);