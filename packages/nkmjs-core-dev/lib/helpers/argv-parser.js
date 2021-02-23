'use strict';

const fs = require(`fs`);

class ARGS {
    constructor(p_args) {

        for (let i = 0, n = p_args.length; i < n; i++) {

            let a = p_args[i];

            try {

                let split = a.split(`=`),
                    key = split[0];

                split.shift();
                split = split.join(`=`);
                this[key] = split;

            } catch (e) { }
        }
    }

}

module.exports = ARGS;