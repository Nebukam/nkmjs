'use strict';

const CONTEXT = require(`../context`);

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
        let valuesOnly = {};
        for(var p in p_data._values){
            valuesOnly[p] = p_data._values[p].value;
        }
        p_serial[CONTEXT.JSON.DATA_KEY] = p_data._values;
    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {
        // Need specific implementation.
        p_data.BatchSet((p_serial[CONTEXT.JSON.DATA_KEY] || {}));
    }

}

module.exports = SimpleDataBlockJSONSerializer;