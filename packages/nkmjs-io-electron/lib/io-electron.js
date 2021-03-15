'use strict';

const u = require("@nkmjs/utils");
const io = require(`@nkmjs/io-core`);
const fs = require(`fs`);

const {
    FSIOReader,
    FSIOWriter,
    FSIORename,
    FSIODelete
} = require(`./io-processes`);

class IOElectron {

    constructor() { }

    Deploy() {

        // Overwrite default or RESOURCES (IOWriter, IOReader, IORename + Directory support)
        io.RESOURCES.instance._GetStats = this._GetStats.bind(io.RESOURCES.instance);
        io.RESOURCES.instance._IOID = this._IOID.bind(io.RESOURCES.instance);
        io.RESOURCES.instance._io[io.IO_TYPE.FILE_SYSTEM] = {
            read: FSIOReader,
            write: FSIOWriter,
            rename: FSIORename,
            delete: FSIODelete
        };
        io.RESOURCES.instance._io[io.IO_TYPE.DEFAULT] = {
            read: FSIOReader,
            write: FSIOWriter,
            rename: FSIORename,
            delete: FSIODelete
        };

    }

    _GetStats(p_path) {
        return fs.statSync(p_path);
    }

    _IOID(p_ioId, p_operation) {
        if (u.tils.isEmpty(p_ioId) || !(p_ioId in this._io)) {
            try{
                let url = new URL(p_operation.fullPath);
                return io.IO_TYPE.REMOTE;
            }catch(e){
                return io.IO_TYPE.DEFAULT; 
            }
        }
        return p_ioId;
    }

}

module.exports = IOElectron;