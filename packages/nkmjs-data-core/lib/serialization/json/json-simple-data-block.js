'use strict';

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

        let recipient = null;
        
        if (p_data.constructor.__flattenSerialization) { recipient = p_serial; }
        else { recipient = p_serial[CONTEXT.JSON.DATA_KEY] = {}; }

        let definitions = p_data.constructor.__VALUES;
        definitions.forEach(def => {
            if (def[IDS.SKIP_SERIALIZATION]) { return; }
            recipient[def.id] = p_data.Get(def.id);
        });

        let blocHeaders = p_data.constructor.__BLOCS;
        if (blocHeaders) {

            let blocsSerial = {};

            for (var id in blocHeaders) {

                let blocInfos = blocHeaders[id];

                if (blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }

                let bloc = p_data[blocInfos.member],
                    serializer = this.GetSerializer(bloc.constructor, -1, null);

                if (!serializer) { throw new Error(`Could not find suitable serializer for bloc=${bloc}`); }

                blocsSerial[id] = serializer.Serialize(p_data, p_options);

            }

            if (p_data.constructor.__flattenSerialization) { p_serial[IDS.BLOCS] = blocsSerial; }
            else { p_serial[CONTEXT.JSON.DATA_KEY][IDS.BLOCS] = blocsSerial; }

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

            let blocsSerial;
            if (p_data.constructor.__flattenSerialization) { blocsSerial = p_serial[IDS.BLOCS]; }
            else { blocsSerial = p_serial[CONTEXT.JSON.DATA_KEY][IDS.BLOCS]; }

            if (blocsSerial) {

                for (var id in blocsSerial) {

                    let blocInfos = blocHeaders[id];
                    if (!blocInfos || blocInfos[IDS.SKIP_SERIALIZATION]) { continue; }

                    let bloc = p_data[blocInfos.member],
                        serializer = this.GetSerializer(bloc.constructor, -1, null);

                    if (!serializer) { throw new Error(`Could not find suitable serializer for bloc=${bloc}`); }

                    serializer.Deserialize(p_data, blocsSerial[id], p_options, p_meta);

                }

                //!important, so it doesn't get set a value afterward.
                if (p_data.constructor.__flattenSerialization) { p_serial[IDS.BLOCS]; }
                else { delete p_serial[CONTEXT.JSON.DATA_KEY][IDS.BLOCS]; }
            }

        }

        if (p_data.constructor.__flattenSerialization) { p_data.BatchSet((p_serial || {})); }
        else { p_data.BatchSet((p_serial[CONTEXT.JSON.DATA_KEY] || {})); }

    }

}

module.exports = SimpleDataBlockJSONSerializer;