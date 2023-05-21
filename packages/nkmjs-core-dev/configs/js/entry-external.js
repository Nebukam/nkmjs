'use strict';
let lib = (globalThis.nkmdefs = globalThis?.nkmdefs || {});
lib[%module_index%] = require(`%module_require_path%`);
console.log(`Added %module_index%.`,lib[%module_index%]);