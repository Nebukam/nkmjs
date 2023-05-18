'use strict';

const u = require(`@nkmjs/utils`);

const CTX = require(`../context`);
const IDS = require(`./../../ids`);

const DataBlockJSONSerializer = require(`./json-data-block`);
const SIMPLEX = require(`../../simplex`);


/**
 * This is a base implementation. It only add & serialize the known "metadata" property.
 * 
 */

/*
   expected input/ouput :

   {
       ...
       "metadata":{*},
       "data":{*},
       ...
   }
   
*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.json.DataBlock
 * @memberof data.core.serialization
 */
class SimpleDataBlockJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {

        let definitions = p_data.DEFINITIONS;
        for (var id in definitions) {

            let def = definitions[id];

            if (def[IDS.SKIP_S11N]) { continue; }

            let desc = SIMPLEX.GetDescriptor(id);
            if (desc && desc.serialize) { p_serial[id] = desc.serialize(p_data._values[id], def, p_data); }
            else { p_serial[id] = p_data._values[id]; }

        }

        // BLOCS

        let blocHeaders = p_data.BLOCS;
        if (blocHeaders) {

            let blocsSerial = {};

            for (var id in blocHeaders) {

                let blocInfos = blocHeaders[id];

                if (blocInfos[IDS.SKIP_S11N]) { continue; }
                blocsSerial[id] = this.__master.Serialize(p_data[blocInfos.member || `_${id}`], p_options);

            }

            p_serial[IDS.BLOCS] = blocsSerial;

        }

        // DATALISTS

        let dataLists = p_data.DATALISTS;
        if (dataLists) {

            let listsSerial = {};

            for (var id in dataLists) {

                let dataListHeader = dataLists[id];

                if (dataListHeader[IDS.SKIP_S11N]) { continue; }

                let
                    dataList = p_data[dataListHeader.member || `_${id}`],
                    contents = [];

                for (let i = 0, n = dataList.count; i < n; i++) {
                    contents.push(this.__master.Serialize(dataList.At(i), p_options));
                }

                listsSerial[id] = contents;

            };

            p_serial[IDS.DATALISTS] = listsSerial;

        }

    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {

        let
            blocHeaders = p_data.BLOCS,
            blocsSerial = p_serial[IDS.BLOCS];

        if (blocHeaders && blocsSerial) {

            if (blocsSerial) {

                for (var id in blocsSerial) {

                    let blocInfos = blocHeaders[id];
                    if (!blocInfos || blocInfos[IDS.SKIP_S11N]) { continue; }

                    let
                        blocData = p_data[blocInfos.member || `_${id}`],
                        blocSerial = blocSerial[id];

                    this.__master.Deserialize(blocSerial, blocData, p_options);

                }

            }

        }

        // DATALISTS

        let dataLists = p_data.DATALISTS,
            listsSerial = p_serial[IDS.DATALISTS];

        if (dataLists && listsSerial) {
            for (var id in dataLists) {

                let dataListHeader = dataLists[id];

                if (dataListHeader[IDS.SKIP_S11N]) { continue; }

                let
                    dataList = p_data[dataListHeader.member || `_${id}`],
                    contents = listsSerial[id];

                if (!contents) { continue; }

                let callPushFn = dataListHeader.pushFn ? p_data[dataListHeader.pushFn] : null;

                for (const itemSerial of contents){
                    let item = this.__master.Deserialize(itemSerial, null, p_options);
                    if (callPushFn) { u.Call(callPushFn, dataListHeader, item); }
                    else { dataList.Add(item); }
                };

            };
        }

        if (p_serial) {

            let definitions = p_data.DEFINITIONS;

            for (var id in definitions) {

                if (!(id in p_serial)) { continue; }

                let desc = SIMPLEX.GetDescriptor(id);

                if (desc && desc.deserialize) {
                    p_serial[id] = desc.deserialize(p_serial[id], definitions[id], p_data);
                }

            }

            p_data.BatchSet(p_serial);
        }

        return p_data;

    }



}

module.exports = SimpleDataBlockJSONSerializer;