const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const SIGNAL = require(`./input-signal`);

class InputListHandler extends com.pool.DisposableObjectEx {
    constructor(p_owner) {
        super();
        this._owner = p_owner;
        this._inputs = [];
        this._map = new collections.Dictionary();
        this._Bind(this._OnInputSubmit);
        this._Bind(this._OnInputChanged);
        this._Bind(this._OnInputError);
    }

    Build(p_list) {

        /*

            {
                cl:inputClass,
                member:'member',
                onChange:{ fn },
                onSubmit:{ fn },
                onError:{ fn }, 
                validations:[ { fn }, fn ],
                validation:{ fn },
                sanitizations:[ { fn }, fn ],
                sanitization:{ fn }
                value:*
            }

        */

        for (let i = 0, n = p_list.length; i < n; i++) {
            let config = p_list[i],
                input = this._owner.Add(config.cl);

            if (config.member) { this._owner[config.member] = input; }
            if (config.value) { input.currentValue = config.value; }

            // Validations

            if (config.validations) {
                for (let v = 0, vn = config.validations.length; v < vn; v++) {
                    input.AddValidation(config.validations[v]);
                }
            }

            if (config.validation) { input.AddValidation(config.validation); }

            // Sanitization

            if (config.sanitizations) {
                for (let s = 0, sn = config.sanitizations.length; s < sn; s++) {
                    input.AddSanitization(config.sanitizations[s]);
                }
            }
            
            if (config.sanitization) { input.AddSanitization(config.sanitization); }

            this._inputs.push(input);
            this._map.Set(input, config);

            input._handler
                .Watch(SIGNAL.VALUE_SUBMITTED, this._OnInputSubmit)
                .Watch(com.SIGNAL.VALUE_CHANGED, this._OnInputChanged)
                .Watch(SIGNAL.INPUT_ERROR, this._OnInputError);
        }

    }

    Clear() {
        for (let i = 0, n = this._inputs.length; i < n; i++) { this._inputs[i].Release(); }
        this._inputs.length = 0;
        this._map.Clear();
    }

    _OnInputSubmit(p_input, p_newValue) {
        let config = this._map.Get(p_input);
        if (config.onSubmit) {
            if (config.onSubmit.thisArg) { config.onSubmit.call(config.onSubmit.thisArg, p_input, p_newValue); }
            else { config.onSubmit(p_input, p_newValue); }
        }
    }

    _OnInputChanged(p_input, p_newValue) {
        let config = this._map.Get(p_input);
        if (config.onChange) {
            if (config.onChange.thisArg) { config.onChange.call(config.onChange.thisArg, p_input, p_newValue); }
            else { config.onChange(p_input, p_newValue); }
        }
    }

    _OnInputError(p_input, p_errors) {
        let config = this._map.Get(p_input);
        if (config.onError) {
            if (config.onError.thisArg) { config.onError.call(config.onError.thisArg, p_input, p_newValue); }
            else { config.onError(p_input, p_newValue); }
        }
    }

    _CleanUp() {
        super._CleanUp();
        this.Clear();
    }

}

module.exports = InputListHandler;