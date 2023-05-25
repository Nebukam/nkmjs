'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const env = require(`@nkmjs/environment`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const dom = require(`../dom`);

const base = ui.WidgetItem;

class Tab extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/tab.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(ui.IDS.NAME, `label`)
        .To(ui.IDS.ICON)
        .To(ui.IDS.STATIC, (p_target, p_value) => {
            p_target._isStaticTab = p_value;
            if (p_target._closeBtn.element) {
                if (p_value) {
                    p_target._closeBtn.element.style.display = `none`;
                } else {
                    delete p_target._closeBtn.element.style.display;
                }
            }
        });

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this.RequestClose);

        this._isStaticTab = false;

        this._closeBtn = this._pointer.Add(ui.extensions.Pointer);
        this._closeBtn.Hook(ui.POINTER.KEYS.MOUSE_LEFT, ui.POINTER.KEYS.RELEASE, this.RequestClose);

        this._pointer.Hook(ui.POINTER.KEYS.MOUSE_MIDDLE, ui.POINTER.KEYS.RELEASE, this.RequestClose);

    }

    // ----> DOM

    /**
     * @returns {ui.core.manipulators.Icon}
     */
    get icon() { return this._icon; }
    /**
     * @param {*} p_value
     */
    set icon(p_value) { this._icon.Set(p_value); }

    /**
     * @returns {ui.core.manipulators.Text}
     */
    get label() { return this._label; }
    /**
     * @param {string} p_value
     */
    set label(p_value) {
        this._label.Set(p_value);
        this.htitle = p_value;
    }

    /**
     * @returns {ui.core.manipulators.Icon}
     */
    get closeIcon() { return this._closeIcon; }
    /**
     * @param {*} p_value
     */
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    static _Style() {

        return style.Extends({

            ':host': {
                ...style.rules.pos.rel,
                ...style.rules.flex.row.nowrap,
                'align-items': `center`,
                'align-content': `stretch`
            }

        }, base._Style());

    }

    _Render() {

        ui.Render(dom.FacadeLabelClose, this, {
            [ui.IDS.OWNER]: this,
            closeIcon: { htitle: `Close` }
        });

        if (!env.isTouchEnabled) {
            this._closeIcon.element.style.opacity = 0; // ???
        }

        this.focusArea = this;
        this._closeBtn.element = this._closeIcon.element;

    }

    //

    Activate(p_evt) {
        if (this._closeBtn.isMouseOver) { return false; }
        return super.Activate(p_evt);
    }

    //

    _HighlightGain() {
        if (!env.isTouchEnabled) { ui.dom.CSS(this._closeIcon.element, 'opacity'); }
    }

    _HighlightLost() {
        if (!env.isTouchEnabled) {
            this._closeIcon.element.style.opacity = 0;
        }
    }

    RequestClose() {
        if (!this._isActivable || this._isStaticTab) { return; }
        this.Broadcast(ui.SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> DATA    

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
    }

    _OnItemDataUpdated(p_data) {
        super._OnItemDataUpdated(p_data);
        this._UpdateInfos();
    }

    _UpdateInfos() {
        super._UpdateInfos();
        let iData = this.itemData;
        if (this._label.TryReplace(iData)) { this.htitle = iData.id.name; }
        this._icon.TryReplace(iData);
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = Tab;
ui.Register(`nkmjs-tab`, Tab);