'use strict'

const { U, C, M, SIGNAL } = require(`../@.js`);
const { INPUT } = require(`../@tools.js`);
const { CatalogItem } = require(`../collections/@.js`);
const { TitleBar, ButtonDragHandle } = require(`../ui-app/@.js`);
const { ExtDrag, ExtDrop } = require(`../ui-core/@.js`);
const { FacadeH4 } = require(`../ui-app/facades.js`);
const UI = require(`../ui.js`);
const { ActionModelReorderField } = require(`../data-core/actions/@model.js`);
const FieldSettings = require(`../data-core/field-settings.js`);

const DATA_SIGNAL = require(`../data-core/core-data-signal.js`);

const InspectorGroup = require(`./inspector-group.js`);
const _flag_allowDropUp = 'allow-drop-up';
const _flag_allowDropDown = 'allow-drop-down';
const _flag_allowDropNone = 'allow-drop-none';

class FieldSettingsControl extends InspectorGroup {
    constructor() { super(); }

    _Init() {
        super._Init();

        //this._facadeClass = FacadeH4;
        this._notifiesSelectionStack = true;

        this._dragHandle = null;
        this._handleWidth = 25;
        this._extDrag = new ExtDrag();
        this._extDrag.grabDataCallback = this._Bind(this._GrabDragData);

        this._flags.Add(this, _flag_allowDropUp, _flag_allowDropDown, _flag_allowDropNone);

        this._extDrop = new ExtDrop();
        this._extDrop.Setup(this, this);
        this._extDrop.Hook({
            check: { fn: this._AllowReorderDrop, thisArg: this },
            drag: { fn: this._ReorderDrag, thisArg: this },
            drop: { fn: this._ReorderDrop, thisArg: this },
            leave: { fn: this._ReorderLeave, thisArg: this },
        });

    }

    _PostInit() {
        super._PostInit();
        this._extDrag.Setup(this, this._dragHandle, this);
    }

    _Wake() {
        super._Wake();
        this._extDrag.owner = this;
    }

    // ----> DOM

    _Style() {
        let h = 2;
        let rh = `rgba(${C.COLORS.main},1)`; //C.COLORS.main //255,255,255
        return U.Merge(super._Style(), {
            ':host': {
                margin: `4px`,
                'margin-top': `2px`,
                'margin-bottom': `2px`,
                'padding-left': `${this._handleWidth + 10}px`,
                border: `1px solid rgba(0,0,0,0)`,
            },
            ':host(.allow-drop)': {
                border: `1px solid rgba(${C.COLORS.main},1)`
            },
            '.drag-handle': {
                position: `absolute`,
                width: `${this._handleWidth}px`,
                height: `calc( 100% - 6px )`,
                left: `6px`,//`-${this._handleWidth * 0.8}px`,
                top: `3px`,
                'box-sizing': `border-box`,
                opacity: 0.5
            },
            '.header': {
                'justify-content': `center`,
                padding: `6px`
            },
            '.facade': { flex: `1 1 auto` },

            ':host(.allow-drop-up):before': {
                content: `""`, position: `absolute`, width: `calc(100% + ${h * 2}px)`, height: `${h}px`, top: `-${h * 2}px`, left: `-${h}px`,// 'pointer-events':`none`,
                'background-color': `${rh}`, 'z-index': 999
            },
            ':host(.allow-drop-down):after': {
                content: `""`, position: `absolute`, width: `calc(100% + ${h * 2}px)`, height: `${h}px`, bottom: `-${h * 2}px`, left: `-${h}px`,// 'pointer-events':`none`,
                'background-color': `${rh}`, 'z-index': 999
            },
            ':host(.allow-drop-none)': {
                border: `1px solid rgba(0,0,0,1)`
            },
            ':host(.dragged)': {
                border: `1px dashed ${rh}`
            }
        });
    }

    _Render() {
        this._dragHandle = this.Add(ButtonDragHandle, -1, this._host, `drag-handle`);
        this._dragHandle.icon = `%ICON%/icon_nine.svg`
        this._dragHandle.text = ``;
        this._dragHandle.htitle = `Drag to re-order`;
        super._Render();
    }

    _OnDataChanged(p_oldValue) {
        super._OnDataChanged(p_oldValue);
        if (this._data) {
            this._facade.label.displayID = this._data.id;
            this._facade.label.italic = !U.Void(this._data.base);
        } else {
            this._facade.label.displayID = null;
        }
    }

    _OnDataUpdated(p_data) {
        super._OnDataUpdated(p_data);
        let metaInfos = M.ETA(p_data.fieldClass);
        if (metaInfos) {
            this._facade.icon = U.Get(metaInfos, `icon`, `%ICON%/icon_field.svg`);
        }
        this.order = p_data.fieldIndex;
    }

    _GrabDragData() {
        return this._data;
    }

    // ---->

    _AllowReorderDrop(p_data) {
        if (U.isInstanceOf(p_data, CatalogItem)) { p_data = p_data.data; }
        if (!U.isInstanceOf(p_data, FieldSettings)) { return false; }
        return (p_data.model === this._data.model && p_data != this._data);
    }

    _ReorderDrag(p_data) {
        if (U.isInstanceOf(p_data, CatalogItem)) { p_data = p_data.data; }

        let mouse = INPUT.LocalMouse(this).normalized;

        let offset = mouse.y > 0.5 ? 1 : 0;
        this._reorderIndex = this._data.fieldIndex + offset;

        let up = false;
        let down = false;
        let none = true;// false;

        if (this._reorderIndex === p_data.fieldIndex) {
            //none = true;
        } else if (offset === 0 && this._reorderIndex - 1 === p_data.fieldIndex) {
            //none = true;
        } else if (offset > 0) {
            down = true;
        } else {
            up = true;
        }

        this.SetFlag(_flag_allowDropNone, none);
        this.SetFlag(_flag_allowDropUp, up);
        this.SetFlag(_flag_allowDropDown, down);

    }

    _ReorderLeave(p_data) {
        this.SetFlag(_flag_allowDropNone, false);
        this.SetFlag(_flag_allowDropUp, false);
        this.SetFlag(_flag_allowDropDown, false);
    }

    _ReorderDrop(p_data) {
        if (U.isInstanceOf(p_data, CatalogItem)) { p_data = p_data.data; }
        this._Do(ActionModelReorderField, {
            target: p_data,
            index: this._reorderIndex
        });
    }

}

module.exports = FieldSettingsControl;
UI.Register(`nkmjs-field-setting-control`, FieldSettingsControl);