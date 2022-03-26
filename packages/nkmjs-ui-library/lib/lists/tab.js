'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const env = require(`@nkmjs/environment`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const dom = require(`../dom`);

class Tab extends ui.WidgetItem {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/tab.css`]
    }, ui.WidgetItem, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this._CloseRequest);

        this._isStaticTab = false;

        this._closeBtn = this._pointer.Add(ui.extensions.Pointer);
        this._closeBtn.Hook(ui.POINTER.MOUSE_LEFT, ui.POINTER.RELEASE, this._CloseRequest);

        this._pointer.Hook(ui.POINTER.MOUSE_MIDDLE, ui.POINTER.RELEASE, this._CloseRequest);

        this._distribute
            .To(ui.IDS.NAME, `label`)
            .To(ui.IDS.ICON)
            .To(ui.IDS.STATIC, (p_value) => {
                this._isStaticTab = p_value;
                if (this._closeBtn.element) {
                    if (p_value) {
                        this._closeBtn.element.style.display = `none`;
                    } else {
                        delete this._closeBtn.element.style.display;
                    }
                }
            });

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

    _Style() {

        return style.Extends({

            ':host': {
                'position': `relative`,

                'display': `flex`,
                'flex-flow': `row nowrap`,
                'align-items': `center`,
                'align-content': `stretch`
            }

        }, super._Style());

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
        if (!env.isTouchEnabled) {
            this._closeIcon.element.style.removeProperty(`opacity`);
        }
    }

    _HighlightLost() {
        if (!env.isTouchEnabled) {
            this._closeIcon.element.style.opacity = 0;
        }
    }

    _CloseRequest() {
        if (!this._isActivable || this._isStaticTab) { return; }
        this._Broadcast(ui.SIGNAL.CLOSE_REQUESTED, this);
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