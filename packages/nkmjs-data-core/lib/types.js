'use strict';

const com = require("@nkmjs/common");

/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */
class TYPE_KEY extends com.helpers.CKEY { constructor() { super(); } }

class STRING extends TYPE_KEY { constructor() { super(); } }
class IDENTIFIER extends STRING { constructor() { super(); } }
class TEXT extends STRING { constructor() { super(); } }
class TEXT_INLINE extends TEXT { constructor() { super(); } }
class TEXT_SEARCH extends TEXT_INLINE { constructor() { super(); } }

class COLOR extends TEXT { constructor() { super(); } }

class PATH extends TEXT_INLINE { constructor() { super(); } }
class PATH_FILE extends PATH { constructor() { super(); } }
class PATH_DIRECTORY extends PATH { constructor() { super(); } }

class NUMBER extends TYPE_KEY { constructor() { super(); } }
class NUMBER_SOFT extends NUMBER { constructor() { super(); } }
class MINMAX extends NUMBER { constructor() { super(); } }
class MINMAX_SOFT extends NUMBER { constructor() { super(); } }

class BOOLEAN extends TYPE_KEY { constructor() { super(); } }
class BOOLEAN_CHECK extends BOOLEAN { constructor() { super(); } }

class ENUM extends TYPE_KEY { constructor() { super(); } }
class ENUM_INLINE extends ENUM { constructor() { super(); } }

class FLAGS extends TYPE_KEY { constructor() { super(); } }
class FLAGS_INLINE extends FLAGS { constructor() { super(); } }

module.exports = {
    STRING: STRING,
    IDENTIFIER: IDENTIFIER,
    TEXT: TEXT,
    COLOR: COLOR,
    TEXT_INLINE: TEXT_INLINE,
    TEXT_SEARCH: TEXT_SEARCH,
    PATH: PATH,
    PATH_FILE: PATH_FILE,
    PATH_DIRECTORY: PATH_DIRECTORY,
    NUMBER: NUMBER, //Numbers that aren't supposed to be edited too fast
    NUMBER_SOFT: NUMBER_SOFT, //Numbers that can be edited fast
    MINMAX: MINMAX, //Slider, plus numeric field
    MINMAX_SOFT: MINMAX_SOFT, //Slider only
    BOOLEAN: BOOLEAN,
    BOOLEAN_CHECK: BOOLEAN_CHECK,
    ENUM: ENUM,
    ENUM_INLINE: ENUM_INLINE,
    FLAGS: FLAGS,
    FLAGS_INLINE: FLAGS_INLINE,
};