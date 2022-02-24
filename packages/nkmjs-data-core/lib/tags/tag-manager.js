'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const Tag = require(`./tag-object`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class TagManager extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._tagMap = new collections.Dictionary();
        this._tagList = new collections.List();
    }

    get tagList() { return this._tagList; }

    Get(p_uid, p_name = `unamed-tag`) {

        let tag = this._tagMap.Get(p_uid);

        if (tag) { return tag; }

        tag = com.Rent(Tag);
        tag.uid = p_uid;
        tag.name = p_name;

        this._tagMap.Set(p_uid, tag);
        this._tagList.Add(tag);

        return tag;

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = TagManager;