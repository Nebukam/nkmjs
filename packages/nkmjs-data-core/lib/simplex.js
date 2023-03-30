'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const IDS = require(`./ids`);
const TYPES = require(`./types`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments common.helpers.SingletonEx
 * @memberof ui.core
 */
class SIMPLEX extends com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._descriptors = {
            [IDS.BLOCS]: { id: IDS.BLOCS }, /* SYSTEM RESERVE */
            [IDS.DATALISTS]: { id: IDS.DATALISTS } /* SYSTEM RESERVE */
        };
        this._descriptorList = [this._descriptors.blocs];

        this.constructor.RegisterDescriptors({

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
                inputOptions: { placeholder: `a b c square...`, changeOnInput: true, submitOnChange: true, },
                desc: `Search for characters within Unicode.\nSeparate search terms with a space.`
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
    static RegisterDescriptors(p_map) {
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
    static RegisterDescriptor(p_id, p_descriptor) {
        if (p_id in this.instance._descriptors) {
            throw new Error(`Attempting to register a descriptor that already exists (${p_id})`, p_descriptor, this.instance._descriptors[p_id]);
        }
        p_descriptor.id = p_id;
        this.instance._descriptors[p_id] = p_descriptor;
        this.instance._descriptorList.push(p_descriptor);
    }

    static GetDescriptor(p_id) {
        return this.instance._descriptors[p_id];
    }

    static GetValueDescriptor(p_target, p_id) {
        let descriptors = p_target.constructor.__VALUES;
        for (let i = 0, n = descriptors.length; i < n; i++) {
            let d = descriptors[i];
            if (d.id == p_id) { return d; }
        }
        return null;
    }

    //#endregion


    //#region Utils

    /**
     * Attempts to find the value of a given ID in a given object
     * If the id is not found on the given object, goes through a list of fallback
     * objects in increasing order.
     * @param {*} p_id 
     * @param {*} p_data 
     * @param  {...any} p_fallbacks Fallback data to look into 
     * @returns 
     */
    static Resolve(p_id, p_data, ...p_fallbacks) {

        if (!p_data) { return null; }

        //console.log(`Resolve ${p_id} in ${p_self} -> ${p_fallbacks}`);
        let valueObj = p_data._values[p_id];
        let result = valueObj ? valueObj.value : null;

        if (result != null) { return result; }

        if (p_fallbacks.length > 0) {
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
    static FindCommonValues(p_reference, p_dataList, p_dataMember = null, backupList = null) {

        let
            refValues = p_reference._values,
            commonValues = {},
            dataCount = p_dataList.length,
            valCount = 0,
            ignoreCount = 0,
            searchState = 0,
            backup = {};

        if (backupList) { backupList.forEach(id => { backup[id] = refValues[id].value; }) }

        for (var v in refValues) { refValues[v].value = null; }

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
                refValues[id].value = backup[id];
                delete commonValues[id];
            })
        }

        if (searchState == 2) {
            if (ignoreCount == valCount) { return false; }
            for (var v in commonValues) { refValues[v].value = commonValues[v]; }
            return true;
        }

        return false;

    }

    /**
     * Attempt to group values definition of SimpleDataBlock __VALUES.
     * @param {*} p_source 
     * @returns An array of groups, with the last one being ungrouped values.
     */
    static GetGroups(p_source) {

        if (u.isObject(p_source)) { if (p_source.constructor != Object) { p_source = p_source.constructor; } }
        let definitions = p_source.__VALUES;
        if (!definitions) { return []; }

        let
            groupMap = {},
            groupList = [],
            noGroup = { id: IDS.GROUP_OTHERS, definitions: [] };

        definitions.forEach(def => {
            let group;
            if (def._group) {
                if (!(def._group in groupMap)) {
                    group = { id: def._group, definitions: [] };
                    groupMap[def._group] = group;
                    groupList.push(group);
                } else { group = groupMap[def._group]; }
            } else { group = noGroup; }
            group.definitions.push(def);
        });

        groupMap = null;
        groupList.push(noGroup);

        return groupList;

    }

    static GetValueType(p_id) {
        return this.GetDescriptor(p_id).valueType;
    }


    //#endregion

}

module.exports = SIMPLEX;
