'use strict';

const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.SingletonEx
 * @memberof services
 */
class ServicesManager extends com.helpers.SingletonEx{
    constructor() {super();}

    _Init()
    {
        super._Init();
        this._services = new collections.List();
    }

    /**
     * @description TODO
     */
    Boot(){

    }

    /**
     * @description TODO
     * @param {services.ServiceBase} p_instance 
     */
    Register( p_instance ) 
    {     
        this._services.Add(p_instance.constructor);
    }

}

module.exports = ServicesManager;
