'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const CTX = require(`./context`);
const DataList = require("./helpers/data-list");

const IDS = require(`./ids`);
const TYPES = require(`./types`);

const _descriptors = {
    [IDS.BLOCS]: { id: IDS.BLOCS }, /* SYSTEM RESERVE */
    [IDS.DATALISTS]: { id: IDS.DATALISTS } /* SYSTEM RESERVE */
};

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments common.Observable
 * @memberof ui.core
 */
module.exports = {

    //#region Descriptors

    /**
     * Register a list of descriptors, using their identifier within the map
     * as their unique ID.
     * @param {*} p_map 
     */
    RegisterDescriptors: function (p_map) {
        for (let n in p_map) {
            let descriptor = p_map[n];
            module.exports.RegisterDescriptor(n, descriptor);
        }
    },

    /**
     * Register a simple descriptor
     * @param {String} p_id 
     * @param {*} p_descriptor 
     * @param {*} p_descriptor.label Label 
     * @param {*} p_descriptor.inputType An specific input class 
     * @param {*} p_descriptor.desc User-facing description
     * @param {*} p_descriptor.inputOptions Input options that will be forwarded to the input widget
     * Generic input options
     * @param {*} p_descriptor.inputOptions.placeholder
     * Input options for dropdowns
     * @param {*} p_descriptor.enum
     * @param {*} p_descriptor.inputOptions.catalog Catalog to be used as enum
     * @param {*} p_descriptor.inputOptions.itemKey Catalog to be used as enum
     */
    RegisterDescriptor: function (p_id, p_descriptor) {
        if (p_id in _descriptors) {
            throw new Error(`Attempting to register a descriptor that already exists (${p_id})`, p_descriptor, _descriptors[p_id]);
        }
        p_descriptor.id = p_id;
        _descriptors[p_id] = p_descriptor;
    },

    GetDescriptor: function (p_id) {
        return _descriptors[p_id];
    },

    //#endregion


    //#region Utils

    Export: function (p_blockClass) {

        let BLOCS = p_blockClass.__BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) {

                let
                    def = BLOCS[id];
                def.member = def.member || `_${id}`;

            };
        }

        let DATALISTS = p_blockClass.__DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                let
                    def = DATALISTS[id];
                def.member = def.member || `_${id}`; //Fix memberId
            }
        }

        nkm.com.BINDINGS.RegisterFromNFO(p_blockClass);
        return p_blockClass;

    },

    InitSimpleDataBlock: function (p_dataBlock) {

        let BLOCS = p_dataBlock.BLOCS;



        if (BLOCS) {
            for (var id in BLOCS) {

                let
                    def = BLOCS[id],
                    memberId = def.member || `_${id}`,
                    type = def.type;

                def.member = memberId; //Fix memberId

                if (u.isInstanceOf(def.type, com.CKEY)) {
                    //Pin type for the session.
                    def.type = type = com.GetBinding(CTX.BLOC, type) || com.GetBinding(p_dataBlock.constructor, type)
                }

                let newBloc = com.Rent(type);
                newBloc._iid = id;
                newBloc._parent = p_dataBlock;

                p_dataBlock[memberId] = newBloc;

                if (def.watch) {
                    for (const watch of def.watch) {
                        newBloc.Watch(
                            watch.signal,
                            u.isString(watch.fn) ? p_dataBlock[watch.fn] : watch.fn,
                            watch?.thisArg || p_dataBlock
                        )
                    };
                }

                p_dataBlock._InitBloc(newBloc, def);

            };
        }

        let DATALISTS = p_dataBlock.DATALISTS;

        if (DATALISTS) {
            for (var id in DATALISTS) {
                let
                    def = DATALISTS[id],
                    memberId = def.member || `_${id}`;

                def.member = memberId; //Fix memberId

                let newDataList = new (def.type ? def.type : DataList)();
                newDataList.parent = p_dataBlock;

                if (p_dataBlock[memberId]) { throw new Error(`Datalist member ID "${memberId}" overlaps with existing Bloc ID.`); }
                p_dataBlock[memberId] = newDataList;

                if (def.watch) {
                    for (const watch of def.watch) {
                        newDataList.Watch(
                            watch.signal,
                            u.isString(watch.fn) ? p_dataBlock[watch.fn] : watch.fn,
                            watch?.thisArg || p_dataBlock
                        )
                    };
                }

                if (def.hooks) {
                    for (const hook of def.hooks) {
                        newDataList.Hook(
                            hook.signal,
                            u.isString(hook.fn) ? p_dataBlock[hook.fn] : hook.fn,
                            hook?.thisArg || p_dataBlock
                        )
                    };
                }

                if (def.autoSort) {
                    newDataList.AutoSort(def.autoSort);
                }

                p_dataBlock._InitDatalist(newDataList, def);

            }
        }

    },

    ResetDataBlock: function (p_dataBlock, p_individualSet = true, p_silent = false) {

        let BLOCS = p_dataBlock.BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) {
                let def = BLOCS[id];
                p_dataBlock[def.member].Reset(p_individualSet, p_silent);
            };
        }

        let DATALISTS = p_dataBlock.DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                let def = DATALISTS[id];
                if (def.flush && def.flush == DataList.FLUSH_DEFAULT) {
                    console.warn(`Flushing ${p_dataBlock} DataList[${id}] is not releasing its items.`);
                }
                p_dataBlock[def.member].Flush(def.flush || DataList.FLUSH_DIRECT_RELEASE);
            }
        }

        if (p_individualSet) {
            let defs = definitions;
            for (let id in defs) {
                let def = defs[id];
                p_dataBlock.Set(id, def.getter ? u.Call(def.getter, p_dataBlock) : def.value, p_silent);
            }
            p_dataBlock._OnReset(p_individualSet, p_silent);
        } else {
            p_dataBlock._ResetValues(p_dataBlock._values);
            p_dataBlock._OnReset(p_individualSet, p_silent);
            if (!p_silent) { p_dataBlock.CommitUpdate(); }
        }

    },

    /**
     * Attempts to find the value of a given ID in a given object
     * If the id is not found on the given object, goes through a list of fallback
     * objects in increasing order.
     * @param {*} p_id 
     * @param {*} p_data 
     * @param  {...any} p_fallbacks Fallback data to look into 
     * @returns 
     */
    Resolve: function (p_id, p_data, ...p_fallbacks) {

        if (!p_data) { return null; }

        //console.log(`Resolve ${p_id} in ${p_self} -> ${p_fallbacks}`);
        let result = p_data._values[p_id];

        if (result != null) { return result; }

        if (p_fallbacks.length) {
            p_data = p_fallbacks.shift();
            return module.exports.Resolve(p_id, p_data, ...p_fallbacks);
        }

        return null;

    },

    /**
     * 
     * @param {*} p_reference 
     * @param {*} p_dataList 
     * @param {*} [p_dataMember] 
     * @param {*} [backupList] 
     * @returns 
     */
    FindCommonValues: function (p_reference, p_dataList, p_dataMember = null, backupList = null) {

        let
            refValues = p_reference._values,
            commonValues = {},
            dataCount = p_dataList.length,
            valCount = 0,
            ignoreCount = 0,
            searchState = 0,
            backup = {};

        if (backupList) { for (const id of backupList) { backup[id] = refValues[id]; } }

        for (var v in refValues) { refValues[v] = null; }

        compareloop: for (let i = 0; i < dataCount; i++) {

            let data = p_dataList[i];
            if (p_dataMember) { data = data[p_dataMember]; }

            if (searchState == 0) {
                // Establish baseline values
                for (var v in refValues) {
                    commonValues[v] = data.Get(v);
                    valCount++;
                }
                searchState = 1;
            } else {
                // Reach comparison
                searchState = 2;
                for (var v in commonValues) {

                    let
                        gVal = data.Get(v),
                        cVal = commonValues[v];

                    if (gVal == null || gVal == cVal) {
                        // Equals baseline, keep going
                        continue;
                    } else {
                        // Mismatch, delete value from common
                        delete commonValues[v];
                        ignoreCount++;
                        if (ignoreCount == valCount) { break compareloop; }
                    }
                }
            }
        }

        if (backupList) {
            for (const id of backupList) {
                refValues[id] = backup[id];
                delete commonValues[id];
            }
        }

        if (searchState == 2) {
            if (ignoreCount == valCount) { return false; }
            for (var v in commonValues) { refValues[v] = commonValues[v]; }
            return true;
        }

        return false;

    },

    /**
     * Attempt to group values definition of SimpleDataBlock __VALUES.
     * @param {*} p_source 
     * @returns An array of groups, with the last one being ungrouped values.
     */
    GetGroups: function (p_source) {

        if (u.isObject(p_source)) { if (p_source.constructor != Object) { p_source = p_source.constructor; } }
        let defs = p_source.__VALUES;
        if (!defs) { return []; }

        let
            groupMap = {},
            groupList = [],
            noGroup = { id: IDS.GROUP_OTHERS, definitions: [], order: Number.MAX_SAFE_INTEGER };

        for (let id in defs) {

            let
                def = defs[id],
                group;

            def.id = id; //Hah.

            if (def.group) {
                if (!(def.group in groupMap)) {
                    group = { id: def.group, definitions: [], order: 0 };
                    groupMap[def.group] = group;
                    groupList.push(group);
                } else { group = groupMap[def.group]; }
            } else { group = noGroup; }

            if (def.groupOrder) { group.order = def.groupOrder; }
            group.definitions.push(def);

        };

        groupMap = null;
        groupList.push(noGroup);

        groupList.sort(com.SORTING.ORDER_ASC)
        for (const group of groupList) { group.definitions.sort(com.SORTING.ORDER_ASC); }

        return groupList;

    },

    GetValueType: function (p_id) {
        return module.exports.GetDescriptor(p_id).valueType;
    },

    //#endregion

    /**
     * Calls ClearDirty on all blocs, datalist contents, and finally the data object itself.
     * @param {*} p_dataBlock 
     * @param {*} p_includeBlocs 
     * @param {*} p_includeDatalist 
     * @returns 
     */
    ClearDirtyDeep: function (p_dataBlock, p_includeBlocs = true, p_includeDatalist = false) {

        let BLOCS = p_dataBlock.BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) { p_dataBlock[BLOCS[id].member || `_${id}`].ClearDirty(); };
        }

        let DATALISTS = p_dataBlock.DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                for (const i of p_dataBlock[DATALISTS[id].member || `_${id}`]._array) { i.ClearDirty(); };
            }
        }

        p_dataBlock.ClearDirty();

    },

    TryClearDirtyDeep: function (p_dataBlock) {
        if (!module.exports.isDirtyDeep(p_dataBlock)) { p_dataBlock.ClearDirty(); }
    },

    /**
     * Check if no item is dirty, and if so calls ClearDirty on the data object.
     * @param {*} p_dataBlock 
     * @param {*} p_includeBlocs 
     * @param {*} p_includeDatalist 
     * @returns 
     */
    isDirtyDeep: function (p_dataBlock) {

        let BLOCS = p_dataBlock.BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) {
                let bloc = p_dataBlock[BLOCS[id].member || `_${id}`];
                if (bloc.isDirty) { return true; }
            };
        }

        let DATALISTS = p_dataBlock.DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                let dataList = p_dataBlock[DATALISTS[id].member || `_${id}`]._array;
                for (let i = 0, n = dataList.length; i < n; i++) {
                    if (dataList[i].isDirty) { return true; }
                }
            }
        }

        return false;

    },

    Dismantle: function (p_dataBlock) {

    },

    GetBloc: function (p_dataBlock, p_blocId) {
        let BLOCS = p_dataBlock?.BLOCS;
        if (!BLOCS) { return null; }
        return p_dataBlock[BLOCS[p_blocId].member];
    },

    GetList: function (p_dataBlock, p_listId) {
        let DATALISTS = p_dataBlock?.DATALISTS;
        if (!DATALISTS) { return null; }
        return p_dataBlock[DATALISTS[p_listId].member];
    }

}

module.exports.RegisterDescriptors({

    // Misc

    [IDS.GROUP_OTHERS]: {
        title: `Others`,
        icon: `icon`,
        desc: `Uncategorized.`
    },

    // Search

    [IDS.SEARCH_ENABLED]: {
        valueType: TYPES.BOOLEAN,
        label: `Search`,
        inputOptions: { placeholder: `...` }, //, size: nkm.ui.FLAGS.SIZE_XS
        desc: `Enable filter within current glyph selection.\nSeparate terms with an empty space.\nNote : search can impact responsiveness.`
    },

    [IDS.SEARCH_TERMS]: {
        recompute: true,
        valueType: TYPES.TEXT_SEARCH,
        label: `Search`,
        inputOptions: { placeholder: `Search...`, changeOnInput: true, submitOnChange: true, },
        desc: `Search for something!`
    },

    [IDS.SEARCH_CASE_SENSITIVE]: {
        recompute: true,
        valueType: TYPES.BOOLEAN_CHECK,
        label: `Insensitive`,
        inputOptions: { placeholder: `...` },
        desc: `Broad search doesn't care whether the case is uppercase or lowercase.`
    },

    [IDS.SEARCH_EXACT_MATCH]: {
        recompute: true,
        valueType: TYPES.BOOLEAN_CHECK,
        label: `Exact Match`,
        inputOptions: { placeholder: `...` },
        desc: `Show only the results that have an exact match.`
    }

});
