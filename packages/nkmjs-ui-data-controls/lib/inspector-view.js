/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * - provide a context for registering specific sub-inspectors
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const helpers = require(`./helpers`);
const ControlView = require("./control-view");

const base = ControlView;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlView
 * @memberof ui.datacontrols
 */
class InspectorView extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/inspector-view.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._editorObserver = new com.signals.Observer();
        this._editorObserver
            .Hook(ui.SIGNAL.DATA_CHANGED, this._Bind(this._OnEditorDataChanged));
        this._editorDataObserver = null;
        this._oldEditorData = null;
    }

    get editorObserver() { return this._editorObserver; }

    get editorDataObserver() {
        if (!this._editorDataObserver) {
            this._editorDataObserver = new com.signals.Observer();
            this._editorDataObserver.ObserveOnly(this._editor ? this._editor.data : null);
        }
    }

    _OnEditorChanged(p_oldEditor) {
        this._editorObserver.ObserveOnly(this._editor);
        if (this._editorDataObserver) { this._editorObserver.ObserveOnly(this._editor ? this._editor.data : null); }
        if (this._editor) {
            this._OnEditorDataChanged(this._editor.data, this._oldEditorData);
        } else {
            this._OnEditorDataChanged(null, this._oldEditorData);
        }
    }

    _OnEditorDataChanged(p_newData, p_oldData) {
        this._oldEditorData = p_newData;
        if (this._editorDataObserver) { this._editorDataObserver.ObserveOnly(p_newData); }
    }

    static _Style() {
        return style.Extends({
            ':host': {
                'box-sizing': 'border-box',
                'overflow-y': `auto`
            },
        }, base._Style());
    }

    _CleanUp(){
        super._CleanUp();
        this._oldEditorData = null;
    }

}

module.exports = InspectorView;
//ui.Register('nkmjs-inspector-view', InspectorView);