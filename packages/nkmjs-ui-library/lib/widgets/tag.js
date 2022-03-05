'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);


class Tag extends ui.Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/tag.css`]
    }, ui.Widget, ['css']);

    _Init() {
        super._Init();

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._optionsHandler = new com.helpers.OptionsHandler();
        this._optionsHandler.Setup(this);

        this._optionsHandler
            .Hook(ui.IDS.FLAVOR)
            .Hook(ui.IDS.SIZE)
            .Hook(ui.IDS.LABEL)
            .Hook(ui.IDS.NAME, ui.IDS.LABEL)
            .Hook(`bgColor`);

    }

    set options(p_value){ this._optionsHandler.Process(this, p_value); }

    get size() { return this._sizeEnum.currentFlag; }
    set size(p_value) { this._sizeEnum.Set(p_value); }

    get flavor() { return this._flavorEnum.currentFlag; }
    set flavor(p_value) { this._flavorEnum.Set(p_value); }

    set bgColor(p_value) {
        if (!p_value) { this.style.removeProperty(`background-color`); }
        else { this.style.setProperty(`background-color`, p_value); }
    }


    // ----> DOM

    get label() { return this._label; }
    set label(p_value) { this._label.Set(p_value); }

    _Render() {
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `${ui.IDS.LABEL} ${style.FONT_FLAG.TAG}` }, this), false);
    }

}

module.exports = Tag;
ui.Register(`nkmjs-tag`, Tag);