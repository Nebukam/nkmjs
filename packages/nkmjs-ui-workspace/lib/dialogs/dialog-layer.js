'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { UI, Layer } = require(`@nkmjs/ui-core`);
const { DialogInfos } = require(`@nkmjs/dialog`);

const DialogBox = require(`./dialog-box.js`);


class DialogLayer extends Layer {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._background = null;
        this._msgBox = null;

    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            ':host': {
                display: `flex`,
                'flex-flow': `row`,
                'align-content': `center`,
                'align-items': `center`,
                'justify-content': `center`,
            },
            '.bg': {
                position: `absolute`,
                top: `0px`,
                left: `0px`,
                width: `100%`,
                height: `100%`,
                'background-color': `rgba(23,23,23,0.3)`,
                'backdrop-filter': `blur(5px)`,
            },
            '.box': {
                flex: `1 1 auto`,
                'max-width': `500px`,
            }
        }, super._Style());
    }

    _Render() {
        this._background = UDOM.New(`div`, { class: `bg` }, this._host);
    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);
        //TODO : Check if DialogInfos has a preferred dialogBox class set
        if (this._msgBox) {
            this._msgBox.Release();
            this._msgBox = null;
        }

        if (!this._data) { return; }

        let nfos = this._data;

        if (!U.isInstanceOf(nfos, DialogInfos)) {
            throw new Error(`DialogLayer expect data of type DialogInfos, got ${this._data.constructor.name} instead.`);
        }

        let boxClass = (nfos.dialogClass || DialogBox);
        this._msgBox = this.Add(boxClass, 'box');
        this._msgBox.data = nfos;

    }

}

module.exports = DialogLayer;
UI.Register('nkmjs-dialog-view', DialogLayer);