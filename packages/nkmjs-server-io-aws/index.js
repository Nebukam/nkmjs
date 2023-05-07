
'use strict';

const __AWS = require(`./lib/aws`);

module.exports = {

    AWS: __AWS.AWS,
    SDK: __AWS.SDK,
    
    IO: require(`./lib/io-aws`),

}