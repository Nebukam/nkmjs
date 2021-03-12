'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { FONT_FLAG } = require("@nkmjs/style");
const { UI, UI_FLAG, FlagEnum, Widget, manipulators, UI_ID } = require(`@nkmjs/ui-core`);


class Tag extends Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
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
        this._label = new manipulators.Text(u.dom.New(`span`, { class: `${UI_ID.LABEL} ${FONT_FLAG.TAG}` }, this), false);
    }

}

module.exports = Tag;
UI.Register(`nkmjs-tag`, Tag);