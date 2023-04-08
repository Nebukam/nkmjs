'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);
const actions = require("@nkmjs/actions");
const data = require("@nkmjs/data-core");
const collections = require("@nkmjs/collections");

const __slider = `slider`;
const _flag_noArrows = `no-arrows`;
var __uid = 0;

const ButtonEx = require(`../buttons/button-ex`);

const base = ui.inputs.InputCatalogBase;

class InputSelectInline extends base {
    constructor() { super(); }

    static __inputProperties = {};
    static __defaultScrollable = false;

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/widget-bar.css`]
    }, ui.WidgetBar, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`showLabel`, null, false)
        .To(`showIcon`, null, true);

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = true;
        this._handler._changeOnInput = true;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

        this._selectedOption = null;

        this._Bind(this._OnOptionToggle);

        this._showIcon = true;
        this._showLabel = false;

    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `center`,
                'min-height': `28px !important` //min height for input field
            },
            '.field': {
                display: 'none',
                flex: `1 1 auto`,
                'min-width': 0,
                'height': 'var(--size)',
                'min-height': `28px !important` //min height for input field

            }
        }, base._Style());
    }

    _Render() {

    }

    set showIcon(p_value) { this._showIcon = p_value; }
    set showLabel(p_value) { this._showLabel = p_value; }

    _HandleItem(p_item) {
        // Implementation detail
        let control = null;

        if (this._useCatalogsAsGroup && p_item.isDir) {
            // Implementation detail, might prove trickier than it seems
            throw new Error(`not implemented`);
        } else {
            control = this.Attach(ButtonEx, 'item inline');
            control.options = {
                toggle: { fn: this._OnOptionToggle, arg: com.FLAGS.SELF }
            };
            control.data = p_item;

            if (this._showIcon) { control.icon = p_item.options; }
            if (this._showLabel) { control.label = p_item.options; }
            control.htitle = p_item.name;
            control.size = this._sizeEnum.currentFlag;

        }

        return control;
    }

    _CleanItem(p_item, p_control) {
        p_control.Release();
    }

    _GrabValue() {
        return this._handler.changedValue;
    }

    _UpdatePreview() {
        //find which option should be selected
        let control = this._catalogHandler.Get(this.inputKeyItem);

        if (this._selectedOption) {
            this._selectedOption.Toggle(false);
            this._selectedOption = null;
        }

        if (control) {
            this._selectedOption = control;
            this._selectedOption.Toggle(true);
        }

    }

    _OnOptionToggle(p_input) {
        this._handler.changedValue = this._KeyValue(p_input.data);
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = InputSelectInline;
ui.Register(`nkmjs-input-select-inline`, InputSelectInline);