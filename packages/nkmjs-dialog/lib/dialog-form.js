'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const DialogBox = require(`./dialog-box`);

class DialogForm extends DialogBox {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._formHandler = new ui.inputs.InputFormHandler();
        this._formHandler
            .Watch(ui.inputs.SIGNAL.FORM_INVALID, this._OnFormInvalid, this)
            .Watch(ui.inputs.SIGNAL.FORM_READY, this._OnFormReady, this);

        this._hasInput = false;

        this._submitMap = new collections.Dictionary();
        this._submitList = new collections.List();

        this._Bind(this._Submit);

    }

    // ----> DOM

    _Style() {

        return style.Extends({
            ':host': {

            }
        }, super._Style());

    }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);
        this._hasInput = (this._formHandler._inputList.count > 0);
        if (this._hasInput) { this._formHandler.ValidateForm(); }
    }


    _OnContentItemAdded(p_item, p_infos){

        if (u.isInstanceOf(p_item, ui.inputs.InputBase)) {

            p_item.inputId = p_infos.inputId;

            let validations = p_infos.validations;
            if (validations) {
                for (let i = 0, n = validations.length; i < n; i++) {
                    p_item.AddValidation(validations[i]);
                }
            }

            this._formHandler.Register(p_item);

        }

    }

    CreateHandle(p_options, p_class = null) {

        let handle = CreateHandle(p_options, p_class = null);

        if (u.tils.Get(p_options, `submit`, false)) {
            //TODO : Need to add a generic 'triggered' activation  signal
            //to close the dialog box. Otherwise, close by default.
            this._submitMap.Set(handle, p_options.submit);
            this._submitList.Add(handle);
            handle.Watch(ui.SIGNAL.TRIGGERED, this._Submit);
        }

        return handle;

    }

    // ----> Form handling

    _OnFormInvalid(p_handler) {
        this._submitList.ForEach((p_item) => { p_item.activable = false; });
    }

    _OnFormReady(p_handler) {
        this._submitList.ForEach((p_item) => { p_item.activable = true; });
    }

    // ---->

    _Submit(p_source) {
        let cb = this._submitMap.Get(p_source);
        u.Call(cb, this._formHandler.inputValues);
    }

    _Clear() {

        this._submitMap.Clear();
        this._submitList.Clear();
        this._formHandler.Clear();

        super._Clear();

    }

}

module.exports = DialogForm;