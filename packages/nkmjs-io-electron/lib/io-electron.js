'use strict';

const io = require(`@nkmjs/io-core`);
const fs = require(`fs`);
const path = require(`path`);

class IOElectron {

    constructor() { }

    Deploy() {

        let RESOURCES = nkmcore.io.RESOURCES.instance;
        let iop = require(`./io-processes`);

        // Overwrite default or RESOURCES (IOWriter, IOReader, IORename + Directory support)
        RESOURCES._GetStats = this._GetStats.bind(io.RESOURCES.instance);
        RESOURCES._IOID = this._IOID.bind(io.RESOURCES.instance);
        RESOURCES._io[nkmcore.io.IO_TYPE.FILE_SYSTEM] = {
            read: iop.FSIOReader,
            write: iop.FSIOWriter,
            rename: iop.FSIORename,
            delete: iop.FSIODelete
        };
        RESOURCES._io[nkmcore.io.IO_TYPE.DEFAULT] = {
            read: iop.FSIOReader,
            write: iop.FSIOWriter,
            rename: iop.FSIORename,
            delete: iop.FSIODelete
        };

        RESOURCES._io[nkmcore.io.IO_TYPE.DOCUMENT] = {
            ...RESOURCES._io[nkmcore.io.IO_TYPE.FILE_SYSTEM]
        };

        nkmcore.env.features.GetMemory = this._GetMemory.bind(nkmcore.env.FEATURES);
        nkmcore.env.features._IOFlushFn = this._IOFlush.bind(nkmcore.env.FEATURES);

    }

    _IOFlush() {
        let TempResourceWatcher = require(`./helpers/temp-resource-watcher`);
        TempResourceWatcher.__repository.forEach(tempRsc => { tempRsc.Flush(); });
    }

    _GetMemory() {
        return process.getProcessMemoryInfo();
    }

    _GetStats(p_path) {
        return fs.statSync(p_path);
    }

    _IOID(p_ioId, p_op) {
        if (nkmcore.u.isEmpty(p_ioId) || !(p_ioId in this._io)) {
            try {
                let url = new URL(p_op.fullPath);
                if (!url.protocol.includes(`file`)) {
                    return nkmcore.io.IO_TYPE.REMOTE;
                }
            } catch (e) { }

            return nkmcore.io.IO_TYPE.DEFAULT;
        }
        return p_ioId;
    }

}

module.exports = IOElectron;