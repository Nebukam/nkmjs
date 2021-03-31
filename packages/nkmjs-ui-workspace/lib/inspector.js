/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const Control = require(`./control`);

class Inspector extends Control {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._inspectors = [];
    }

    _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'flex-flow': `column`,
                'align-content': `stretch`,
                'align-items': `stretch`,
                'background-color': `rgba(0,0,0,0.0)`, //'background-color':`rgba(0,0,0,0.1)`,
            },
        }, super._Style());
    }

    AddInspector(p_cl, p_cssSelector = null) {
        return this._RegisterInspector(
            this.Add(p_cl, p_cssSelector ? `group ${p_cssSelector}` : `group`));
    }

    _RegisterInspector(p_inspector) {
        if (this._inspectors.includes(p_inspector)) { return; }

        this._inspectors.push(p_inspector);
        return p_inspector;
    }

    _OnDataChanged(p_oldData) {

        super._OnDataChanged(p_oldData);

        for (let i = 0, n = this._inspectors.length; i < n; i++) {
            let inspector = this._inspectors[i];
            inspector.context = this._context;
            inspector.data = this._data;
        }

        if (!this._data && !u.tils.Void(this._context)) {
            // --> Why ?
            this.data = this._context;
        }

    }

}

module.exports = Inspector;
ui.Register('nkmjs-inspector', Inspector);