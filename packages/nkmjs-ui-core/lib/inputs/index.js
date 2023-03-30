'use strict';

const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);
const CONTEXT = require(`../context`);

function __GetInput(p_type, p_context = null) {

    p_context = p_context || CONTEXT.INPUT;

    //Get the input key associated to a given data type
    // TYPE:INPUT = DTX
    let inputKey = com.BINDINGS.Get(CONTEXT.I_TYPE, p_type);
    //Get the class associated to the input key within the given context
    //Fallback to default INPUT context
    let inputClass = com.BINDINGS.Get(p_context, inputKey,
        com.BINDINGS.Get(CONTEXT.INPUT, inputKey));

    return inputClass;

}

module.exports = {

    SIGNAL: require(`./input-signal`),
    UNITS: require(`./units`),
    KEYS: require(`./keys`),

    InputHandler: require(`./input-handler`),
    InputBase: require(`./input-base`),
    InputField: require(`./input-field`),
    InputNumberBase: require(`./input-number-base`),
    InputTextBase: require(`./input-text-base`),
    InputFormHandler: require(`./input-form-handler`),
    InputListHandler: require(`./input-list-handler`),
    InputGroup: require(`./input-group`),
    InputCatalogBase: require(`./input-catalog-base`),

    MovableHandle: require(`./movable-handle`),

    /**
     * Returns the input class mapped to a specific type
     * @param {*} p_type 
     * @param {*} [p_context] 
     */
    GetInput: __GetInput,

    TryGetInput: (p_identifier = null, p_context = null, p_fallback = null) => {

        let descriptor = data.SIMPLEX.GetDescriptor(p_identifier);

        if (descriptor.inputType) { return descriptor.inputType; }

        if (!descriptor.valueType) { return p_fallback; }

        let inputClass = __GetInput(descriptor.valueType, p_context);

        return inputClass || p_fallback;

    }

}