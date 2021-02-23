'use strict';

module.exports = {

    INPUT_SIGNAL: require(`./lib/input-signal`),
    InputBase: require(`./lib/input-base`),
    InputField: require(`./lib/input-field`),

    InputFormHandler: require(`./lib/input-form-handler`),
    InputGroup: require(`./lib/input-group`),

    // Inputs

    InputText: require(`./lib/inputs/input-text`),
    InputIdentifier: require(`./lib/inputs/input-identifier`),
    InputTextarea: require(`./lib/inputs/input-textarea`),
    InputBoolean: require(`./lib/inputs/input-boolean`),
    InputNumber: require(`./lib/inputs/input-number`),
    InputColor: require(`./lib/inputs/input-color`),
    InputPath: require(`./lib/inputs/input-path`),
    InputFile: require(`./lib/inputs/input-file`),
    InputDirectory: require(`./lib/inputs/input-directory`),
    InputList: require(`./lib/inputs/input-list`),

}