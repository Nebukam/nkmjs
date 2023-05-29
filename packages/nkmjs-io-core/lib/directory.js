'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);

const Resource = require(`./resource`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.Resource
 * @memberof io.core
 */
class Directory extends Resource {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._requestRsc = null;

        this._directories = [];
        this._resources = [];

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isDir() { return true; }

    _OnPathUpdated(p_oldPath) {
        //TODO : Update all sub items path corresponding to this directory's path.
    }

    _Encode() { return null; }

    _Decode() {
        let fullPath = u.FULL(this._path);
        for (let i = 0, n = this._raw.length; i < n; i++) {
            let rsc = this._requestRsc(`${fullPath}/${this._raw[i]}`);
        }
    }

    /**
     * @description TODO
     * @param {io.core.Resource} p_rsc 
     */
    Add(p_rsc) {

        let added = false;
        if (p_rsc.isDir) { added = this._directories.AddNew(p_rsc); }
        else { added = this._resources.AddNew(p_rsc); }

        if (added) {
            //console.log(`${this._path} += ${p_rsc._path}`);
            p_rsc.Watch(com.SIGNAL.RELEASED, this._OnRscReleased, this);
            p_rsc.directory = this;
        }

    }

    /**
     * @description TODO
     * @param {io.core.Resource} p_rsc 
     */
    Remove(p_rsc) {

        let removed = false;
        if (p_rsc.isDir) { removed = this._directories.Remove(p_rsc); }
        else { removed = this._resources.Remove(p_rsc); }

        if (removed) {
            if (p_rsc.directory === this) { p_rsc.directory = null; }
            p_rsc.Unwatch(com.SIGNAL.RELEASED, this._OnRscReleased, this);
        }
    }

    /**
     * @description TODO
     */
    ReleaseContent() {

        for (let i = 0, n = this._resources.length; i < n; i++) {
            this._resources.last.Release();
        }

        for (let i = 0, n = this._directories.length; i < n; i++) {
            let dir = this._directories.last;
            dir.ReleaseContent();
            dir.Release();
        }

    }

    /**
     * @description TODO
     */
    ReleaseWithContent() {
        this.ReleaseContent();
        this.Release();
    }

    _OnRscReleased(p_rsc) {
        this.Remove(p_rsc);
    }



}

module.exports = Directory;