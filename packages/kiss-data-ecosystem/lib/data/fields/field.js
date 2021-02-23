'use strict';

const { DisposableObjectEx } = require(`@nkmjs/common`);

const _val_default = Symbol(`default`);
const _val_inherit = Symbol(`inherit`);

class Field extends DisposableObjectEx {
    constructor() { super(); }

    static get DEFAULT() { return _val_default; }
    static get INHERIT() { return _val_inherit; }

    static get _NFO_() {
        return {
            [COM_ID.ICON]: `%ICON%/KitCore/icon_field.svg`
        };
    }

    // A field setting definition is stored
    // inside the FieldSetting object, instead of inside the field instance
    // The instance is only used for control & data validation purposes.

    _Init() {
        super._Init();
        this._settings = null;
    }

    get settings() { return this._settings; }
    set settings(p_value) {
        if (this._settings === p_value) { return; }
        let oldSettings = this._settings;
        this._settings = p_value;
        this._OnSettingsChanged(oldSettings);
    }

    _OnSettingsChanged(p_oldSettings) {

    }

    _CleanUp() {
        this._settings = null;
        super._CleanUp();
    }

    toString() {
        if (!this._id) {
            return `[Field::?]`;
        } else {
            return `[Field::${this.constructor.name}]`;
        }
    }

}

module.exports = Field;