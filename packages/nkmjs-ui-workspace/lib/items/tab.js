'use strict';

const com = require("@nkmjs/common");
const { ENV } = require(`@nkmjs/environment`);
const { CSS } = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const templates = require(`../templates`);

class Tab extends ui.CatalogWidget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/tab.css`]
    }, ui.Widget, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this._CloseRequest);

        this._closeBtn = this._interactions.Add(ui.extensions.Mouse);
        this._closeBtn.Hook(ui.MOUSE.BTN_LEFT, ui.MOUSE.RELEASE, this._CloseRequest);
        this._interactions.Hook(ui.MOUSE.BTN_MIDDLE, ui.MOUSE.RELEASE, this._CloseRequest);

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
    set label(p_value) { this._label.Set(p_value); }

    /**
     * @returns {ui.core.manipulators.Icon}
     */
    get closeIcon() { return this._closeIcon; }
    /**
     * @param {*} p_value
     */
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    _Style() {

        return CSS.Extends({

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
        ui.DOMTemplate.Render(templates.FacadeTab, this, {
            [ui.IDS.OWNER]: this,
            closeIcon: { htitle: `Close` }
        });

        if (!ENV.FEATURES.isTouchEnabled) {
            this._closeIcon.element.style.opacity = 0;
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
        if (!ENV.FEATURES.isTouchEnabled) {
            this._closeIcon.element.style.removeProperty(`opacity`);
        }
    }

    _HighlightLost() {
        if (!ENV.FEATURES.isTouchEnabled) {
            this._closeIcon.element.style.opacity = 0;
        }
    }

    _CloseRequest() {
        if (!this._isActivable) { return; }
        this._Broadcast(ui.SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> DATA    

    _UpdateInfos() {
        if (this._itemData) {
            this._flavorEnum.Set(this._itemData.isDirty ? com.FLAGS.WARNING : null);
            if (!this._label.Set(this._itemData)) { this._label.Set(this._data.options); }
            if (!this._icon.Set(this._itemData)) { this._icon.Set(this._data.options); }
        } else {
            this._flavorEnum.Set(null);
            this._label.Set(this._data.options);
            this._icon.Set(this._data.options);
        }
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = Tab;
ui.Register(`nkmjs-tab`, Tab);