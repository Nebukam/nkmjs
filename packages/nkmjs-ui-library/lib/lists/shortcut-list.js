'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const Shortcut = require(`../widgets/shortcut`);

const base = ui.DisplayObjectContainer;
class ShortcutList extends base {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`, `@/lists/shortcut-list.css`] };

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`shortcuts`);


    _Init() {
        super._Init();
        this._shortcuts = null;
    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    get shortcuts() { return this.this._shortcut; }
    set shortcuts(p_value) {


        if (this._shortcuts != null) { this.DetachAll(); }

        this._shortcuts = p_value;

        if (this._shortcuts) {

            for (let i = 0, n = this._shortcuts._keystrokes.length; i < n; i++) {
                let
                    ks = this._shortcuts._keystrokes[i],
                    sc = this.Attach(Shortcut, `shortcut`);

                sc.shortcut = ks;
            }

        }
    }

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.flex.row,
            },
        }, base._Style());
    }

    _CleanUp() {
        this.shortcut = null;
        super._CleanUp();
    }

}

module.exports = ShortcutList;
ui.Register(`nkmjs-shortcuts`, ShortcutList);