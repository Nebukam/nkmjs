'use strict';

const com = require(`@nkmjs/common`);
const data = require(`@nkmjs/data-core`);

const IDS = require(`./ids`);

class AppSettings extends data.SimpleDataBlock {
    constructor() { super(); }

    static __flattenSerialization = true;

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs:app-settings`,
        [com.IDS.ICON]: `gear`
    };

    static __VALUES = [
        { id: IDS.AUTOSAVE, value: false, _signal: IDS.AUTOSAVE },
        { id: IDS.AUTOSAVE_TIMER, value: 10, _signal: IDS.AUTOSAVE_TIMER },
    ];

    _Init() {
        super._Init();
        this._scheduledUpdate = com.DelayedCall(this._Bind(this._ScheduledUpdate));
    }

    CommitUpdate() { this._scheduledUpdate.Schedule(); }

    _ScheduledUpdate() { super.CommitUpdate(); }

}

//#region descriptors

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
        desc: `Interval at which the autosave triggers (in minutes).\nMin 1min, max 60min.`
    },

});

//#endregion

module.exports = AppSettings;