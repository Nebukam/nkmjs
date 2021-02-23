'use strict';

const { U } = require(`@nkmjs/utils`);
const { Dictionary } = require(`@nkmjs/collections`);
const { UI, LayerContainer } = require(`@nkmjs/ui-core`);
const { ACTION_REQUEST } = require(`@nkmjs/actions`);
const { DIALOG_SIGNAL, DialogInfos } = require(`@nkmjs/dialog`);

const DialogLayer = require(`./dialog-layer.js`);
const { CSS } = require("@nkmjs/style");

class DialogHandler extends LayerContainer {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._RegisterLocalRequestHandler(ACTION_REQUEST.DIALOG, this.HandleDialogRequest);
        this._layerMap = new Dictionary();
    }

    _PostInit() {
        super._PostInit();
        this.visible = false;
    }

    _Style() {
        let s = CSS.Extends({
            ':host': {
                'pointer-events': 'none',
            },
            '.layer': {
                'pointer-events': 'auto',
            }
        }, super._Style());
        s[`.${this._layerClassName}`]['pointer-events'] = 'auto';
        return s;
    }

    HandleDialogRequest(p_request) {

        this.BringToFront();

        this.visible = true;

        let dialogInfos = p_request.GetOption(`data`, null);

        if (!dialogInfos) {
            throw new Error(`Cannot build dialog from empty DialogInfos`);
        }

        let newLayer = this.Add(DialogLayer);
        newLayer.data = dialogInfos;

        dialogInfos.Watch(DIALOG_SIGNAL.CONSUMED, this._OnDialogConsumed, this);
        this._layerMap.Set(dialogInfos, newLayer);

        p_request.HandleSuccess(this);

    }

    _OnDialogConsumed(p_infos) {
        let layer = this._layerMap.Get(p_infos);
        this._layerMap.Remove(p_infos);
        layer.Release();
    }

    _CleanUp() {
        super._CleanUp();
        this.visible = false;
    }

}

module.exports = DialogHandler;
UI.Register(`nkmjs-dialog-handler`, DialogHandler);