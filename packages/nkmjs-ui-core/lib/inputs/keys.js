const com = require("@nkmjs/common");

class INPUT_KEY extends com.helpers.CKEY { constructor() { super(); } }

class STRING extends INPUT_KEY { constructor() { super(); } }
class STRING_PATH extends STRING { constructor() { super(); } }
class STRING_PATH_DIR extends STRING_PATH { constructor() { super(); } }
class STRING_IDENTIFIER extends STRING { constructor() { super(); } }
class STRING_TEXT extends STRING { constructor() { super(); } }

class FS_INPUT extends INPUT_KEY { constructor() { super(); } }
class FILE extends FS_INPUT { constructor() { super(); } }
class DIRECTORY extends FS_INPUT { constructor() { super(); } }

class NUMBER extends INPUT_KEY { constructor() { super(); } }
class NUMBER_SLIDER extends NUMBER { constructor() { super(); } }
class NUMBER_ANGLE extends NUMBER { constructor() { super(); } }

class COLOR extends INPUT_KEY { constructor() { super(); } }

class BOOLEAN extends INPUT_KEY { constructor() { super(); } }
class BOOLEAN_CHECK extends BOOLEAN { constructor() { super(); } }

module.exports = {

    INPUT_KEY: INPUT_KEY,

    STRING: STRING,
    STRING_PATH: STRING_PATH,
    STRING_PATH_DIR: STRING_PATH_DIR,
    STRING_IDENTIFIER: STRING_IDENTIFIER,
    STRING_TEXT: STRING_TEXT,

    FS_INPUT:FS_INPUT,
    FILE:FILE,
    DIRECTORY:DIRECTORY,

    NUMBER: NUMBER,
    NUMBER_SLIDER: NUMBER_SLIDER,
    NUMBER_SLIDER: NUMBER_SLIDER,
    NUMBER_ANGLE: NUMBER_ANGLE,

    COLOR: COLOR,

    BOOLEAN: BOOLEAN,
    BOOLEAN_CHECK: BOOLEAN_CHECK,

}