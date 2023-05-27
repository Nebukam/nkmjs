'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.Widget;

class Tag extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/tag.css`]
    }, base, ['css']);

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

        ui.helpers.FlagEnum.Attach(this, ui.IDS.SIZE, ui.FLAGS.sizes);
        ui.helpers.FlagEnum.Attach(this, ui.IDS.FLAVOR, ui.FLAGS.flavorsExtended);

        this.constructor.__distribute.Attach(this);

    }

    set bgColor(p_value) { ui.dom.CSS(this, 'background-color', p_value ? p_value : null); }

    set textColor(p_value) { ui.dom.CSS(this, 'color', p_value ? p_value : null); }

    set maxWidth(p_value) {
        if (p_value) { this._label.ellipsis = true; }
        ui.dom.CSS(this, 'max-width', p_value ? p_value : null);
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