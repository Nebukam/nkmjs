'use strict';

/**
 * The goal of an ecosystem is to isolate and encapsulate
 * all data-related functionalities in a closed ecosystem such as :
 * - a field manager
 * - a model manager
 * - entries etc
 * These parts are usually singletons but it lack flexbility down the line.
 */
'use strict';

const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const Ecosystem = require(`./ecosystem`);

/**
 * An ecosystem bundle is a self-contained ecosystem file.
 * Rather than writing models & entries as individual files, it stores everything internally.
 * This class existing primarily to assign serializer, as there is technically no difference between
 * a bundled ecosystem and an 'open' ecosystem once loaded in memory.
 * 
 * Due to the monolythic nature of a bundled ecosystem, saving & loading data is slower, but easier to manage.
 * @class
 * @augments data.DataBlock
 * @memberof ecosystem
 */
class EcosystemBundle extends Ecosystem {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:ecosystem-bundle`,
        [com.IDS.ICON]: `ecosystem`
    };

}

module.exports = EcosystemBundle;