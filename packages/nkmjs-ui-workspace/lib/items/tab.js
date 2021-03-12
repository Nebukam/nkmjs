'use strict';

const com = require("@nkmjs/common");
const { ENV } = require(`@nkmjs/environment`);
const { CSS } = require(`@nkmjs/style`);
const { DATA_SIGNAL, DataObserver, CATALOG_SIGNAL } = require(`@nkmjs/data-core`);
const { UI_ID, UI, MOUSE, UI_SIGNAL, Widget, DOMTemplate, UI_FLAG, FlagEnum, CatalogWidget, manipulators, extensions } = require(`@nkmjs/ui-core`);

const { TPLFacadeTab } = require(`../templates`);

class Tab extends CatalogWidget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/items/tab.css`]
    }, Widget, ['css']);

    // ----> Init

    _Init() {

        super._Init();

        this._Bind(this._CloseRequest);

        this._closeBtn = this._interactions.Add(extensions.Mouse);
        this._closeBtn.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE, this._CloseRequest);
        this._interactions.Hook(MOUSE.BTN_MIDDLE, MOUSE.RELEASE, this._CloseRequest);

    }

    // ----> DOM

    /**
     * @returns {ImageManipulator}
     */
    get icon() { return this._icon; }
    /**
     * @param {*} p_value
     */
    set icon(p_value) { this._icon.Set(p_value); }

    /**
     * @returns {TextManipulator}
     */
    get label() { return this._label; }
    /**
     * @param {string} p_value
     */
    set label(p_value) { this._label.Set(p_value); }

    /**
     * @returns {ImageManipulator}
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
        DOMTemplate.Render(TPLFacadeTab, this, {
            [UI_ID.OWNER]: this,
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
        this._Broadcast(UI_SIGNAL.CLOSE_REQUESTED, this);
    }

    // ----> DATA    

    _UpdateInfos() {
        if (this._itemData) {
            this._flavorEnum.Set(this._itemData.isDirty ? com.COMMON_FLAG.WARNING : null);
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
UI.Register(`nkmjs-tab`, Tab);