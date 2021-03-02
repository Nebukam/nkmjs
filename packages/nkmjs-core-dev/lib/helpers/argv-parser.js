'use strict';

const fs = require(`fs`);

class ARGS {
    constructor(p_args) {

        for (let i = 0, n = p_args.length; i < n; i++) {

            let a = p_args[i];

            try {

                // --key=value | -key=value | key=value

                let split = a.split(`=`),
                    key = this.Shorten(split.shift()),
                    value = split.length ? split.join(`=`) : null;

                if(value !== null){
                    if(value.toUpperCase() === 'TRUE'){ value = true; }
                    else if(value.toUpperCase() === 'FALSE'){ value = false; }
                }

                this[key] = value === null ? true : value;

            } catch (e) {

                // --key | -key

                key = this.Shorten(key);
                this[key] = true;

            }
        }
    }

    Shorten(key) {
        // get id for argname formatted as --key or -key
        try {
            if (key[0] == `-`) {
                key = key.substr(1);
                if (key[0] == `-`) { key = key.substr(1); }
            }
        } catch (e) { }

        return key;
    }

}

module.exports = ARGS;