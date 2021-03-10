'use strict';

const { NFOS } = require(`@nkmjs/common`);
const { FONT_FLAG } = require("@nkmjs/style");
const { UI, UI_FLAG, FlagEnum, Widget, TextManipulator, UI_ID } = require(`@nkmjs/ui-core`);
const { UDOM } = require("@nkmjs/utils");


class Tag extends Widget {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/items/tag.css`]
    }, Widget, ['css']);

    _Init() {
        super._Init();

        this._sizeEnum = new FlagEnum(UI_FLAG.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new FlagEnum(UI_FLAG.flavorsExtended, true);
        this._flavorEnum.Add(this);

    }

    set size(p_value) { this._sizeEnum.Set(p_value); }
    get size() { return this._sizeEnum.currentFlag; }

    set flavor(p_value) { this._flavorEnum.Set(p_value); }
    get flavor() { return this._flavorEnum.currentFlag; }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value) { this._label.Set(p_value); }

    _Render() {
        this._label = new TextManipulator(UDOM.New(`span`, { class: `${UI_ID.LABEL} ${FONT_FLAG.TAG}` }, this), false);
    }

}

module.exports = Tag;
UI.Register(`nkmjs-tag`, Tag);