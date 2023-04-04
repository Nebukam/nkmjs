'use strict';

const u = require(`@nkmjs/utils`);

const CONTEXT = require(`../context`);
const IDS = require(`./../../ids`);

const DataBlockJSONSerializer = require(`./json-data-block`);


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

        let definitions = p_data.constructor.__VALUES;
        definitions.forEach(def => {
            if (def[IDS.SKIP_SERIALIZATION]) { return; }
            p_serial[def.id] = p_data.Get(def.id);
        });

        // BLOCS

        let blocHeaders = p_data.constructor.__BLOCS;
        if (blocHeaders) {

            let blocsSerial = {};

            for (var id in blocHeaders) {

                let blocInfos = blocHeaders[id];
                if (blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }
                blocsSerial[id] = this.__master.Serialize(p_data[blocInfos.member], p_options);

            }

            p_serial[IDS.BLOCS] = blocsSerial;

        }

        // DATALISTS

        let dataLists = p_data.constructor.__DATALISTS;
        if (dataLists) {

            let listsSerial = {};

            dataLists.forEach((dataListHeader) => {

                if (dataListHeader[IDS.SKIP_SERIALIZATION]) { return; }

                let dataList = p_data[dataListHeader.member],
                    contents = [];

                for (let i = 0, n = dataList.count; i < n; i++) {
                    contents.push(this.__master.Serialize(dataList.At(i), p_options));
                }

                listsSerial[dataListHeader.member] = contents;

            });

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

        let blocHeaders = p_data.constructor.__BLOCS;
        if (blocHeaders) {

            let blocsSerial = p_serial[IDS.BLOCS];

            if (blocsSerial) {

                for (var id in blocsSerial) {

                    let blocInfos = blocHeaders[id];
                    if (!blocInfos || blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }

                    let
                        blocData = p_data[blocInfos.member],
                        blocSerial = blocSerial[id];

                    this.__master.Deserialize(blocSerial, blocData, p_options);

                }

                //!important, so it doesn't get set a value afterward.
                delete p_serial[IDS.BLOCS];
            }

        }

        // DATALISTS

        let dataLists = p_data.constructor.__DATALISTS;
        if (dataLists) {

            let listsSerial = p_serial[IDS.DATALISTS];

            dataLists.forEach((dataListHeader) => {

                if (dataListHeader[IDS.SKIP_SERIALIZATION]) { return; }

                let dataList = p_data[dataListHeader.member],
                    contents = listsSerial[dataListHeader.member];

                if (!contents) { return; }

                let callPushFn = dataListHeader.pushFn ? p_data[dataListHeader.pushFn] : null;

                contents.forEach(itemSerial => {
                    let item = this.__master.Deserialize(itemSerial, null, p_options);
                    if (callPushFn) { u.Call(callPushFn, dataListHeader, item); }
                    else { dataList.Add(item); }
                });

            });

            delete p_serial[IDS.BLOCS];

        }

        p_data.BatchSet((p_serial || {}));

        if (`_OnDeserializationComplete` in p_data) { p_data._OnDeserializationComplete(); }

        return p_data;

    }



}

module.exports = SimpleDataBlockJSONSerializer;