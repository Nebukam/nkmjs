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

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(ui.IDS.FLAVOR)
        .To(ui.IDS.SIZE)
        .To(ui.IDS.LABEL)
        .To(`htitle`)
        .To(ui.IDS.NAME, ui.IDS.LABEL)
        .To(`bgColor`)
        .To(`textColor`);

    _Init() {
        super._Init();

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    get size() { return this._sizeEnum.currentFlag; }
    set size(p_value) { this._sizeEnum.Set(p_value); }

    get flavor() { return this._flavorEnum.currentFlag; }
    set flavor(p_value) { this._flavorEnum.Set(p_value); }

    set bgColor(p_value) {
        if (!p_value) { this.style.removeProperty(`background-color`); }
        else { this.style.setProperty(`background-color`, p_value); }
    }

    set textColor(p_value) {
        if (!p_value) { this._label._element.style.removeProperty(`color`); }
        else { this._label._element.style.setProperty(`color`, p_value); }
    }

    set maxWidth(p_value) {
        if (!p_value) { this._label._element.style.removeProperty(`max-width`); }
        else {
            this._label._element.style.setProperty(`max-width`, p_value);
            this._label.ellipsis = true;
        }
    }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value) { this._label.Set(p_value); }

    _Render() {
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `${ui.IDS.LABEL} ${style.FONT_FLAG.TAG}` }, this), false);
    }

    _CleanUp() {
        this.maxWidth = null;
        this._label.ellipsis = false;
        super._CleanUp();
    }

}

module.exports = Tag;
ui.Register(`nkmjs-tag`, Tag);