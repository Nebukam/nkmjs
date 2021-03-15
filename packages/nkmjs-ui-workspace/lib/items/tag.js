'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const { FONT_FLAG } = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);


class Tag extends ui.Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/tag.css`]
    }, ui.Widget, ['css']);

    _Init() {
        super._Init();

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavorsExtended, true);
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
        this._label = new ui.manipulators.Text(u.dom.New(`span`, { class: `${ui.IDS.LABEL} ${FONT_FLAG.TAG}` }, this), false);
    }

}

module.exports = Tag;
ui.Register(`nkmjs-tag`, Tag);