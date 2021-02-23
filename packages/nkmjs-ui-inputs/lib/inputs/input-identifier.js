'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { COMMON_FLAG } = require(`@nkmjs/common`);
const { UI, ImageManipulator } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);
const { CSS } = require("@nkmjs/style");


const ERR_SPACE = { type: COMMON_FLAG.ERROR, message: `No space allowed.` };
const ERR_NUM = { type: COMMON_FLAG.ERROR, message: `Must starts with <strong>A-Z, a-z</strong> or <strong>_</strong>` };
const ERR_EMPTY = { type: COMMON_FLAG.ERROR, message: `Cannot be empty` };
const ERR_ILLEGAL_CHARS = { type: COMMON_FLAG.ERROR, message: `Can only contains the following characters : <strong>A-Z, a-z, _, 0-9</strong>` };

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
        this._inputField = UDOM.New(`input`, { class: 'field', type: 'search' });
        this._label = new ImageManipulator(UDOM.New(`p`, { class: 'error' }, this));
    }

    _OnInputErrors() {
        super._OnInputErrors();
        this._label.Set(this._ConcatErrors(COMMON_FLAG.ERROR, '<br/>'));
    }

    _ClearFeedbacks() {
        super._ClearFeedbacks();
        this._label.Set(null);
    }

    _ValidateChangedValue(p_value) {
        super._ValidateChangedValue(p_value);
        let e = false;
        if (!U.ValidIdentifier(p_value)) {
            if (U.Empty(p_value)) {
                this._PushError(ERR_EMPTY);
            } else {
                if (U.StartWithNumber(p_value)) {
                    this._PushError(ERR_NUM); e = true;
                }

                if (U.ContainsAnySpace(p_value)) {
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
UI.Register(`nkmjs-input-identifier`, InputIdentifier);