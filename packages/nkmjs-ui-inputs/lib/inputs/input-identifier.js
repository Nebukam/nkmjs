'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);
const { CSS } = require("@nkmjs/style");


const ERR_SPACE = { type: com.FLAGS.ERROR, message: `No space allowed.` };
const ERR_NUM = { type: com.FLAGS.ERROR, message: `Must starts with <strong>A-Z, a-z</strong> or <strong>_</strong>` };
const ERR_EMPTY = { type: com.FLAGS.ERROR, message: `Cannot be empty` };
const ERR_ILLEGAL_CHARS = { type: com.FLAGS.ERROR, message: `Can only contains the following characters : <strong>A-Z, a-z, _, 0-9</strong>` };

class InputIdentifier extends InputField {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._issues = new Array(0);
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;

        this._label = null;

    }

    // ----> DOM

    get label(){ return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    _Style() {
        return CSS.Extends({
            ':host': {
                display: `flex`,
                'flex-flow': `column nowrap`,
                'align-items': `stretch`,
                'align-content': `stretch`,
            },
            '.field': {
                flex: `1 1 auto`,
                width: `auto`
            }
        }, super._Style());
    }

    _Render() {
        this._inputField = u.dom.New(`input`, { class: 'field', type: 'search' });
        this._label = new ui.manipulators.Text(u.dom.New(`p`, { class: 'error' }, this));
    }

    _OnInputErrors() {
        super._OnInputErrors();
        this._label.Set(this._ConcatErrors(com.FLAGS.ERROR, '<br/>'));
    }

    _ClearFeedbacks() {
        super._ClearFeedbacks();
        this._label.Set(null);
    }

    _ValidateChangedValue(p_value) {
        super._ValidateChangedValue(p_value);
        let e = false;
        if (!u.tils.ValidIdentifier(p_value)) {
            if (u.tils.Empty(p_value)) {
                this._PushError(ERR_EMPTY);
            } else {
                if (u.tils.StartWithNumber(p_value)) {
                    this._PushError(ERR_NUM); e = true;
                }

                if (u.tils.ContainsAnySpace(p_value)) {
                    this._PushError(ERR_SPACE); e = true;
                }

                if (!e) { //If none of the above, assume illegal chars.
                    this._PushError(ERR_ILLEGAL_CHARS);
                }
            }
        }
    }

}

module.exports = InputIdentifier;
ui.Register(`nkmjs-input-identifier`, InputIdentifier);