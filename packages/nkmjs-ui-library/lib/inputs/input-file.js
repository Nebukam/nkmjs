'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const env = require(`@nkmjs/environment`);
const style = require('@nkmjs/style');
const ui = require(`@nkmjs/ui-core`);

const InputPath = require(`./input-path`);

class InputFile extends InputPath {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._onPickerChange);
        this._Bind(this._Picked);

        // TODO : Handle web-based pick !
        // TODO : Add support for drag'n drop

        this._openType = 'openFile';
        this._picker = null;

        this._dropExt = this._pointer.Add(ui.extensions.Drop);
        this._dropExt.Hook({
            check: { fn: this._Bind(this._CheckDrop) },
            drop: { fn: this._Bind(this._Drop) },
            dropCandidate:{ fn:this._Bind(this._ToggleDropCandidate) }
        });

    }

    _PostInit() {
        super._PostInit();
        this._dropExt.Setup(this);
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            '.input-btn': {
                flex: `1 1 auto`
            },
            ':host(.allow-drop)':{
                'background-color':`#00ff00`
            }
        }, super._Style());
    }

    _Render() {
        super._Render();

        if (env.isNodeEnabled) {
            this._picker = this.Add(ui.WidgetButton, `input-btn`);
            this._picker.options = {
                [com.IDS.ICON]: `%ICON%/icon_more.svg`,
                trigger: { fn: this._Pick, thisArg: this },
                variant: ui.FLAGS.FRAME
            };

            this._sizeEnum.Add(this._picker);

        } else {
            this._picker = u.dom.El(`input`, { class: 'input-btn', type: 'file' }, this._host);
            this._picker.addEventListener(`change`, this._onPickerChange);
        }

        /*
        this._picker = UDOM.New(`input`, {class:'input-btn', type:'file'}, this._host);
        this._picker.addEventListener(`change`, this._onPickerChange );
        */
    }

    _Pick() {
        if (env.isNodeEnabled) {
            actions.RELAY.ShowOpenDialog({
                defaultPath: this._currentValue ? this._currentValue : ``,
                properties: [this._openType]
            }).then(this._Picked);
        }
    }

    _Picked(p_value) {
        let val = p_value.filePaths[0];
        if (val === undefined) { return; }
        this.changedValue = p_value.filePaths[0];
    }

    _onPickerChange(p_evt) {
        console.log(this._picker.value);
        console.log(p_evt);
    }

    // Drop

    _ToggleDropCandidate(p_toggle){
        if(p_toggle){
            this.style.setProperty(`border`, `1px solid red`);
        }else{
            this.style.removeProperty(`border`);
        }        
    }

    _CheckDrop(p_data) {
        if(u.isString(p_data)){
            return true;
        }else if(u.isInstanceOf(p_data, DataTransfer)){
            return true;
        }
        return false;
    }

    _Drop(p_data) {
        if(u.isString(p_data)){
            this.currentValue = p_data;
        }if(u.isInstanceOf(p_data, DataTransfer)){
            return true;
        }
    }

}

module.exports = InputFile;
ui.Register(`nkmjs-input-file`, InputFile);