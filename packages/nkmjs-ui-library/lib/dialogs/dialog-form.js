'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const dialog = require(`@nkmjs/dialog`);

const buttons = require(`../buttons`);

const base = dialog.DialogForm;

class DialogForm extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/dialogs/dialog-box.css`]
    }, base, ['css']);

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultFlavor = null;

    static __distribute = base.__distribute.Ext()
        .To(ui.IDS.ICON, null, ``)
        .To(ui.IDS.VARIANT);

    _Init() {
        super._Init();

        this._toolbarDefaultWidgetClass = buttons.Button;

        this._header = null;
        this._body = null;
        this._footer = null;
        this._title = null;
        this._icon = null;
    }

    // ----> DOM


    static _Style() {

        return style.Extends({
            ':host': {
                ...style.flex.column,
                'align-content': `stretch`,
                'align-items': `stretch`,
                'justify-content': `center`
            },
            '.header': {

            },
            '.footer': {
                ...style.flex.column,
                'align-content': `flex-end`,
                'align-items': `flex-end`,

                ...style.flexItem.fixed,
            },
            '.toolbar': {
                ...style.flexItem.fixed,
            },
            '.body': {
                'overflow-y': `auto`,
                'overflow-x': `hidden`,
                ...style.flexItem.fill,
            }

        }, base._Style());

    }

    _Render() {

        this._icon = new ui.manipulators.Icon(ui.dom.El('div', { class: `corner-icon` }, this._host), false, true);

        this._header = ui.dom.El(`div`, { class: `group header` }, this._host);
        this._body = ui.dom.El(`div`, { class: `group body` }, this._host);
        this._footer = ui.dom.El(`div`, { class: `group footer` }, this._host);

        this._toolbar = this.Attach(this._toolbarClass, `toolbar`, this._footer);
        this._toolbar._defaultWidgetClass = this._toolbarDefaultWidgetClass;
        this._toolbar.size = ui.FLAGS.SIZE_M;

        this._title = new ui.manipulators.Text(ui.dom.El(`span`, { class: `title ${style.FONT_FLAG.MEDIUM}` }, this._header), false);
        this._messageElement = null;

        this._contentWrapper = this._body;

    }

    get title() { return this._title; }
    set title(p_title) { this._title.Set(p_title); }

    get icon() { return this._icon; }
    set icon(p_icon) { this._icon.Set(p_icon); }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);
        if (!p_options.icon) {
            this._icon.Set((this.flavor || ``));
        }
    }

    _Clear() {
        super._Clear();

    }

}

module.exports = DialogForm;
ui.Register('nkmjs-dialog-form', DialogForm);