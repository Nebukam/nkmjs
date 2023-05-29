'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);
const env = require("@nkmjs/environment");

const IO_SIGNAL = require(`./io-signal`);
const ENCODING = require(`./encoding`);
const RESPONSE_TYPE = require(`./response-type`);
const Resource = require(`./resource`);
const Directory = require(`./directory`);
const IOQueue = require(`./io-queue`);
const IO_TYPE = require(`./io-type`);
const ResourceOperation = require(`./resource-operation`);
const IOProcess = require(`./io-process`);

const _resourcesMap = new Map();

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments services.ServiceBase
 * @memberof io.core
 */
class RESOURCES extends services.ServiceBase {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._IOStatCheck = this._GetStats;

        let ioprocesses = require(`./io-processes`);

        this._io = {};
        this._io[IO_TYPE.DEFAULT] = {
            read: ioprocesses.HTTPIOReader,
            write: ioprocesses.HTTPIOWriter,
            rename: ioprocesses.HTTPIORename,
            delete: ioprocesses.HTTPIODelete
        };
        this._io[IO_TYPE.REMOTE] = {
            read: ioprocesses.HTTPIOReader,
            write: ioprocesses.HTTPIOWriter,
            rename: ioprocesses.HTTPIORename,
            delete: ioprocesses.HTTPIODelete
        };
        this._io[IO_TYPE.FETCH] = {
            read: ioprocesses.FetchIOReader,
            write: ioprocesses.FetchIOWriter,
            rename: ioprocesses.FetchIORename,
            delete: ioprocesses.FetchIODelete
        };

        if (env.isExtension) {
            if (env.isChromium) {
                this._io[IO_TYPE.LOCAL_STORAGE] = {
                    read: ioprocesses.StorageIOReader,
                    write: ioprocesses.StorageIOWriter,
                    rename: ioprocesses.StorageIORename,
                    delete: ioprocesses.StorageIODelete
                };
            } else {
                this._io[IO_TYPE.LOCAL_STORAGE] = {
                    read: ioprocesses.StoragePromiseIOReader,
                    write: ioprocesses.StoragePromiseIOWriter,
                    rename: ioprocesses.StoragePromiseIORename,
                    delete: ioprocesses.StoragePromiseIODelete
                };
            }
        } else {
            this._io[IO_TYPE.LOCAL_STORAGE] = {
                read: ioprocesses.LocalStorageIOReader,
                write: ioprocesses.LocalStorageIOWriter,
                rename: ioprocesses.LocalStorageIORename,
                delete: ioprocesses.LocalStorageIODelete
            };
        }

        this._io[IO_TYPE.DOCUMENT] = { ...this._io[IO_TYPE.LOCAL_STORAGE] };

        this._IOQueue = new IOQueue();

        this._Bind(this._RequestRead);
        this._Bind(this._RequestWrite);
        this._Bind(this._RequestDelete);
        this._Bind(this._RequestRename);
        this._Bind(this._CommitRename);
        this._Bind(this._RequestRsc);

    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {object} [p_options]
     * @param {function} [p_options.cl]
     * @param {io.core.ENCODING} [p_options.encoding]
     * @param {io.core.RESPONSE_TYPE} [p_options.type]
     * @param {object} [p_IOOptions]
     * @param {function} [p_IOOptions.success]
     * @param {function} [p_IOOptions.error]
     * @param {function} [p_IOOptions.any]
     * @param {boolean} [p_IOOptions.important]
     * @param {boolean} [p_IOOptions.parallel]
     * @returns {io.core.Resource}
     */
    GetAndRead(p_path, p_options = null, p_IOOptions = null) {
        let rsc = this.Get(p_path, p_options);

        if (rsc.loaded) {
            if (p_options && !p_options.forceRead && p_IOOptions) {
                if (p_IOOptions.success) { p_IOOptions.success(rsc); }
                if (p_IOOptions.any) { p_IOOptions.any(rsc); }
            } else {
                return rsc;
            }
        }

        rsc.Read(p_IOOptions);
        return rsc;
    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @returns {io.core.Directory}
     */
    GetDir(p_path) { return this.Get(p_path, { cl: Directory }); }

    /**
     * @access private
     * @description Return system stats on a resource
     * @param {string} p_path 
     * @param {object} p_options
     */
    _GetStats(p_path, p_options) { return null; }

    /**
     * @description TODO
     * @param {string} p_path 
     * @returns {io.core.Resource|*}
     */
    TryGet(p_path) { return _resourcesMap.get(u.SHORT(p_path)); }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {object} p_options
     * @param {function} p_options.cl
     * @param {io.core.ENCODING} p_options.encoding
     * @param {io.core.RESPONSE_TYPE} p_options.type
     * @returns {io.core.Resource}
     */
    Get(p_path, p_options = null) {

        //Rule of thumb : resources are mapped using SHRINKED path.

        let shortPath = u.SHORT(p_path),
            rsc = _resourcesMap.get(shortPath),
            rscClass = p_options?.cl || null,
            stats = null,
            fullPath = u.FULL(p_path);

        if (rsc) {
            if (rscClass && !u.isInstanceOf(rsc, rscClass)) {
                throw new Error(`Attempting to get an existing resource (${rsc.constructor.name}) with a mismatching type(${rscClass.name})`);
            }
            return rsc;
        }

        try { stats = this._GetStats(fullPath); } catch (err) { stats = null; }

        if (!stats) {
            if (!rscClass) { rscClass = Resource; }
        } else if (stats.isDirectory()) {
            if (rscClass && !u.isInstanceOf(rscClass, Directory)) {
                throw new Error(`Directory cannot be assigned Resource constructor (${rscClass.name})`);
            }
            if (!rscClass) { rscClass = Directory; }
        } else {
            if (!rscClass) { rscClass = Resource; }
        }

        rsc = com.Rent(rscClass);

        /*
        if(rsc.isDir){
            console.log(`++/ ${p_path}`);
        }else{
            console.log(`+++ ${p_path}`);
        }
        */

        rsc.path = shortPath;
        rsc.encoding = p_options?.encoding || ENCODING.UTF8;
        rsc.type = p_options?.type || rsc.type;
        rsc.stats = stats;
        rsc.exists = stats != null;

        this._RegisterRsc(rsc);

        return rsc;

    }

    /**
     * @access private
     * @param {io.core.Resource} p_rsc 
     */
    _RegisterRsc(p_rsc) {

        p_rsc._readFn = this._RequestRead;
        p_rsc._writeFn = this._RequestWrite;
        p_rsc._deleteFn = this._RequestDelete;
        p_rsc._renameFn = this._RequestRename;
        p_rsc._commitRnFn = this._CommitRename;

        if (p_rsc.isDir) {
            p_rsc._requestRsc = this._RequestRsc;
        }

        p_rsc.Watch(com.SIGNAL.RELEASED, this._OnRscReleased, this);
        _resourcesMap.set(p_rsc.path, p_rsc);

        let dirPath = u.PATH.dir(p_rsc.path),
            dirRsc = _resourcesMap.get(dirPath);

        if (dirRsc && dirRsc != p_rsc) { dirRsc.Add(p_rsc); }

        this.Broadcast(IO_SIGNAL.RSC_REGISTERED, p_rsc);

    }

    ///

    /**
     * @access private
     * @param {string} p_ioId 
     * @param {io.core.ResourceOperation} p_op 
     * @returns {string}
     */
    _IOID(p_ioId, p_op) {

        if (u.isEmpty(p_ioId) || !(p_ioId in this._io)) {
            return IO_TYPE.DEFAULT;
            /*
            if (env.useFetchRequestAsDefault) { return IO_TYPE.FETCH; }
            else { return IO_TYPE.DEFAULT; }
            */
        }
        return p_ioId;
    }

    /**
     * @access private
     * @param {io.core.ResourceOperation} p_op 
     */
    _RequestRead(p_op) {
        let ioProcess = com.Rent(this._io[this._IOID(p_op.ioType, p_op)].read);
        ioProcess.operation = p_op;
        this._PushIOProcess(ioProcess);
    }

    /**
     * @access private
     * @param {io.core.ResourceOperation} p_op 
     */
    _RequestWrite(p_op) {
        let ioProcess = com.Rent(this._io[this._IOID(p_op.ioType, p_op)].write);
        ioProcess.operation = p_op;
        this._PushIOProcess(ioProcess);
    }

    /**
     * @access private
     * @param {io.core.ResourceOperation} p_op 
     */
    _RequestDelete(p_op) {
        let ioProcess = com.Rent(this._io[this._IOID(p_op.ioType, p_op)].delete);
        ioProcess.operation = p_op;
        this._PushIOProcess(ioProcess);
    }

    /**
     * @access private
     * @param {io.core.ResourceOperation} p_op 
     * @param {string} p_newPath 
     */
    _RequestRename(p_op, p_newPath) {
        let ioProcess = com.Rent(this._io[this._IOID(p_op.ioType, p_op)].rename);
        ioProcess.operation = p_op;
        ioProcess.targetPath = p_newPath;
        this._PushIOProcess(ioProcess);
    }

    /**
     * @access private
     * @param {io.core.IOProcess} p_iop 
     */
    _PushIOProcess(p_iop) {
        p_iop._globalResourceMap = _resourcesMap;
        if (p_iop.operation.isParallel) {
            p_iop.Process();
        } else {
            this._IOQueue.Add(p_iop, p_iop.operation.isImportant);
            this._tick.Schedule();
        }
    }

    /**
     * 
     * @param {io.core.ResourceOperation|io.core.IOProcess} p_op 
     */
    _BumpOperation(p_op) {
        this._IOQueue.Bump(p_op);
    }

    /**
     * @access private
     * @param {io.core.Resource} p_rsc 
     * @param {string} p_oldKey 
     */
    _CommitRename(p_rsc, p_oldKey) {
        _resourcesMap.delete(p_oldKey);
        let newPath = p_rsc.path;
        _resourcesMap.set(newPath, p_rsc);

        //Check if target directory is loaded
        //and add the item if necessary

        let dirPath = u.PATH.dir(newPath),
            dir = _resourcesMap.get(dirPath);

        if (dir) {
            //If found, update directory
            p_rsc.directory = dir;
        } else if (p_rsc.directory) {
            //Otherwise, clear that resource directory
            p_rsc.directory = null;
        }
    }

    /**
     * @access private
     * @param {string} p_path 
     * @param {io.core.ENCODING} p_encoding 
     * @param {*} p_class 
     * @returns {io.core.Resource}
     */
    _RequestRsc(p_path, p_encoding = null, p_class = null) {
        return this._Get(p_path, p_encoding, p_class);
    }

    ///

    /**
     * @access private
     * @param {io.core.Resource} p_rsc 
     */
    _OnRscReleased(p_rsc) {
        _resourcesMap.delete(p_rsc.path);
        this.Broadcast(IO_SIGNAL.RSC_UNREGISTERED, p_rsc);
    }

    _Tick(p_delta) {
        super._Tick(p_delta);
        if (!this._IOQueue.isEmpty) { this._tick.Schedule(); }
        if (!this._IOQueue.running && !this._IOQueue.isEmpty) { this._IOQueue.ProcessNext(); }
    }


}

module.exports = new RESOURCES();