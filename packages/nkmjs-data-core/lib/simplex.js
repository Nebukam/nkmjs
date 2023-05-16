'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const DataList = require("./helpers/data-list");

const IDS = require(`./ids`);
const TYPES = require(`./types`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments common.Observable
 * @memberof ui.core
 */
class SIMPLEX extends com.Observable {// PORT_TO_MODULE
    constructor() { super(); }

    _Init() {
        super._Init();
        this._descriptors = {
            [IDS.BLOCS]: { id: IDS.BLOCS }, /* SYSTEM RESERVE */
            [IDS.DATALISTS]: { id: IDS.DATALISTS } /* SYSTEM RESERVE */
        };

        this.RegisterDescriptors({

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

    }

    //#region Descriptors

    /**
     * Register a list of descriptors, using their identifier within the map
     * as their unique ID.
     * @param {*} p_map 
     */
    RegisterDescriptors(p_map) {
        for (let n in p_map) {
            let descriptor = p_map[n];
            this.RegisterDescriptor(n, descriptor);
        }
    }

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
    RegisterDescriptor(p_id, p_descriptor) {
        if (p_id in this._descriptors) {
            throw new Error(`Attempting to register a descriptor that already exists (${p_id})`, p_descriptor, this._descriptors[p_id]);
        }
        p_descriptor.id = p_id;
        this._descriptors[p_id] = p_descriptor;
    }

    GetDescriptor(p_id) {
        return this._descriptors[p_id];
    }

    //#endregion


    //#region Utils

    InitSimpleDataBlock(p_dataBlock) {

        let BLOCS = p_dataBlock.BLOCS;

        if (BLOCS) {
            for (var id in BLOCS) {

                let
                    definition = BLOCS[id],
                    memberId = definition.member || `_${id}`;

                let newBloc = com.Rent(definition.type);
                newBloc._iid = id;
                newBloc._parent = p_dataBlock;

                p_dataBlock[memberId] = newBloc;

                if (definition.watch) {
                    definition.watch.forEach(watch => {
                        newBloc.Watch(
                            watch.signal,
                            u.isString(watch.fn) ? p_dataBlock[watch.fn] : watch.fn,
                            watch.thisArg ? watch.thisArg : p_dataBlock
                        )
                    });
                }

                p_dataBlock._InitBloc(newBloc, definition);

            };
        }

        let DATALISTS = p_dataBlock.DATALISTS;

        if (DATALISTS) {
            for (var id in DATALISTS) {
                let
                    definition = DATALISTS[id],
                    memberId = definition.member || `_${id}`;

                let newDataList = new (definition.type ? definition.type : DataList)();
                newDataList.parent = p_dataBlock;

                if (p_dataBlock[memberId]) { throw new Error(`Datalist member ID "${memberId}" overlaps with existing Bloc ID.`); }
                p_dataBlock[memberId] = newDataList;

                if (definition.watch) {
                    definition.watch.forEach(watch => {
                        newDataList.Watch(
                            watch.signal,
                            u.isString(watch.fn) ? p_dataBlock[watch.fn] : watch.fn,
                            watch.thisArg ? watch.thisArg : p_dataBlock
                        )
                    });
                }

                if (definition.hooks) {
                    definition.hooks.forEach(hook => {
                        newDataList.Hook(
                            hook.signal,
                            u.isString(hook.fn) ? p_dataBlock[hook.fn] : hook.fn,
                            hook.thisArg ? hook.thisArg : p_dataBlock
                        )
                    });
                }

                if (definition.autoSort) {
                    newDataList.AutoSort(definition.autoSort);
                }

                p_dataBlock._InitDatalist(newDataList, definition);

            }
        }

    }

    /**
     * Attempts to find the value of a given ID in a given object
     * If the id is not found on the given object, goes through a list of fallback
     * objects in increasing order.
     * @param {*} p_id 
     * @param {*} p_data 
     * @param  {...any} p_fallbacks Fallback data to look into 
     * @returns 
     */
    Resolve(p_id, p_data, ...p_fallbacks) {

        if (!p_data) { return null; }

        //console.log(`Resolve ${p_id} in ${p_self} -> ${p_fallbacks}`);
        let result = p_data._values[p_id];

        if (result != null) { return result; }

        if (p_fallbacks.length) {
            p_data = p_fallbacks.shift();
            return this.Resolve(p_id, p_data, ...p_fallbacks);
        }

        return null;

    }

    /**
     * 
     * @param {*} p_reference 
     * @param {*} p_dataList 
     * @param {*} [p_dataMember] 
     * @param {*} [backupList] 
     * @returns 
     */
    FindCommonValues(p_reference, p_dataList, p_dataMember = null, backupList = null) {

        let
            refValues = p_reference._values,
            commonValues = {},
            dataCount = p_dataList.length,
            valCount = 0,
            ignoreCount = 0,
            searchState = 0,
            backup = {};

        if (backupList) { backupList.forEach(id => { backup[id] = refValues[id]; }) }

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
            backupList.forEach(id => {
                refValues[id] = backup[id];
                delete commonValues[id];
            })
        }

        if (searchState == 2) {
            if (ignoreCount == valCount) { return false; }
            for (var v in commonValues) { refValues[v] = commonValues[v]; }
            return true;
        }

        return false;

    }

    /**
     * Attempt to group values definition of SimpleDataBlock __VALUES.
     * @param {*} p_source 
     * @returns An array of groups, with the last one being ungrouped values.
     */
    GetGroups(p_source) {

        if (u.isObject(p_source)) { if (p_source.constructor != Object) { p_source = p_source.constructor; } }
        let definitions = p_source.__VALUES;
        if (!definitions) { return []; }

        let
            groupMap = {},
            groupList = [],
            noGroup = { id: IDS.GROUP_OTHERS, definitions: [], order: Number.MAX_SAFE_INTEGER };

        for (let id in definitions) {

            let
                def = definitions[id],
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

        groupList.sort((a, b) => { return a.order - b.order; })
        groupList.forEach(group => { group.definitions.sort((a, b) => { return a.order || 0 - b.order || 0; }); })

        return groupList;

    }

    GetValueType(p_id) {
        return this.GetDescriptor(p_id).valueType;
    }

    //#endregion

}

module.exports = new SIMPLEX();
