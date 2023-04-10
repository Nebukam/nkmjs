'use strict';

const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);

const IDS = require(`./ids`);

class AppSettings extends data.SimpleDataBlock {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs:app-settings`,
        [com.IDS.ICON]: `gear`
    };

    static __VALUES = {
        [IDS.AUTOSAVE]: { value: false, signal: IDS.AUTOSAVE, group:IDS.GROUP_SAVE },
        [IDS.AUTOSAVE_TIMER]: { value: 10, signal: IDS.AUTOSAVE_TIMER, group:IDS.GROUP_SAVE },
    };

    _Init() {
        super._Init();
        this._scheduledUpdate = com.DelayedCall(this._Bind(this._ScheduledUpdate));
    }

    CommitUpdate() { this._scheduledUpdate.Schedule(); }

    _ScheduledUpdate() { super.CommitUpdate(); }

}

//#region descriptors

const isAutoSave = (owner) => { return owner.data ? owner.data.Get(IDS.AUTOSAVE) : true; };

data.RegisterDescriptors({

    [IDS.AUTOSAVE]: {
        valueType: data.TYPES.BOOLEAN,
        inputOptions: { size: ui.FLAGS.SIZE_XS },
        label: `Autosave`,
        desc: `Toggle auto-save feature on/off`

    },

    [IDS.AUTOSAVE_TIMER]: {
        valueType: data.TYPES.MINMAX,
        label: `Autosave interval`,
        inputOptions: { min: 1, max: 60, size: ui.FLAGS.SIZE_XS },
        controlOptions: { disableWhen: { fn: isAutoSave } },
        desc: `Interval at which the autosave triggers (in minutes).\nMin 1min, max 60min.`
    },

    [IDS.GROUP_SAVE]: {
        title: `Save`,
        icon: `save`,
        desc: `Options related to saving content.`
    },


});

//#endregion

module.exports = AppSettings;