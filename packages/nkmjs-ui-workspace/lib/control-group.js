'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

const Control = require(`./control.js`);

const base = Control;

/**
 * 
 *  *----------------------*
 *  | + []Title     [][][] |
 *  *----------------------*
 * 
 */
class ControlGroup extends base {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._extExpand = new ui.extensions.Expand();
        this._extExpand._isExpanded = false;
        this._extExpand
            .Watch(ui.SIGNAL.EXPANDED, this._Expand, this)
            .Watch(ui.SIGNAL.COLLAPSED, this._Collapse, this);

        this._header = null;
        this._expandBtn = null;
        this._icon = null;
        this._label = null;

        this._toolbarClass = ui.WidgetBar;
        this._toolbar = null;

        this._itemWrapper = null;

    }

    _PostInit() {
        super._PostInit();
        this._extExpand.Setup(this, this._itemWrapper, this._expandBtn);
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {

            },
            '.header': {
                ...style.flex.rows,
                ...style.flex.align.center.cross,
                'align-content': `stretch`,
                'padding': `4px`,
                'box-sizing': `border-box`,

                ...style.flexItem.shrink,
            },
            '.toggle': { ...style.flexItem.fixed, },
            '.facade': { ...style.flexItem.fill, },
            '.toolbar': { ...style.flexItem.fixed, },

            '.content': {

            },
            '.content.expanded': {
                ...style.rules.display.flex,
            },
            '.content.collapsed': {
                ...style.rules.display.none,
            }
        }, base._Style());
    }

    _Render() {

        this._header = ui.dom.El(`div`, { class: `header` }, this._host);

        this._expandBtn = this.Attach(uilib.buttons.Tool, `toggle`, this._header);
        this._icon = new ui.manipulators.Icon(ui.dom.El(`div`, { class: `icon` }, this._header));
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `label` }, this._header));
        this._toolbar = this.Attach(this._toolbarClass, `toolbar`, this._header);

        this._expandBtn.icon = '%ICON%/icon_expand_arrow.svg';
        this._expandBtn.scale = 0.75;

        this._itemWrapper = ui.dom.El(`div`, { class: `content` }, this._host);

        this.focusArea = this._header;

    }

    Expand() { this._extExpand.Expand(); }
    _Expand() {
        if (this._data) { this._data.expanded = true; }
        this._expandBtn.rotation = 90;
    }

    Collapse() { this._extExpand.Collapse(); }
    _Collapse() {
        if (this._data) { this._data.expanded = false; }
        this._expandBtn.rotation = 0;
    }

    Activate(p_evt) {
        if (this._expandBtn.focused) { return false; }
        return super.Activate(p_evt);
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = ControlGroup;
ui.Register(`nkmjs-control-group`, ControlGroup);
