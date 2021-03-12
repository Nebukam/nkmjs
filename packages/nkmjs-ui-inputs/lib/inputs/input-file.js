'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const { ENV } = require(`@nkmjs/environment`);
const { CSS } = require('@nkmjs/style');
const { UI, ToolButton, UI_FLAG } = require(`@nkmjs/ui-core`);

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
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            '.input-btn': {
                flex: `1 1 auto`
            }
        }, super._Style());
        /*
        //This is for the default file picker
        return CSS.Extends({
            '.input-btn':{
                flex:`1 0 30px`,
                'max-width':`30px`
            },
            '.input-btn::-webkit-file-upload-button': {
                visibility: `hidden`
            },
            '.input-btn::before': {
                content: '"..."',
                'box-sizing':`border-box`, 
                display: `inline-block`,
                'border-radius': `3px`,
                padding: `5px 10px`,
                outline: `none`,
                'white-space': `nowrap`,
                '-webkit-user-select': `none`,
                cursor: `pointer`,
                'height':`100%`,
                'width':`30px`,
                'background-color':this.GEC(UI.elBG, UI.sIDLE)
            },
            '.input-btn:hover::before':{
                'background-color':this.GEC(UI.elBG, UI.sFOCUS)
            },
            '.input-btn:active::before':{
                'background-color':this.GEC(UI.elBG, UI.sSELECT)
            }
        }, super._Style());
        */
    }

    _Render() {
        super._Render();

        if (ENV.FEATURES.isNodeEnabled) {
            this._picker = this.Add(ToolButton, `input-btn`);
            this._picker.options = {
                [com.COM_ID.ICON]: `%ICON%/icon_more.svg`,
                trigger: { fn: this._Pick, thisArg: this },
                variant: UI_FLAG.FRAME
            };

            this._sizeEnum.Add(this._picker);

        } else {
            this._picker = u.dom.New(`input`, { class: 'input-btn', type: 'file' }, this._host);
            this._picker.addEventListener(`change`, this._onPickerChange);
        }

        /*
        this._picker = UDOM.New(`input`, {class:'input-btn', type:'file'}, this._host);
        this._picker.addEventListener(`change`, this._onPickerChange );
        */
    }

    _Pick() {
        if (ENV.FEATURES.isNodeEnabled) {
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

}

module.exports = InputFile;
UI.Register(`nkmjs-input-file`, InputFile);