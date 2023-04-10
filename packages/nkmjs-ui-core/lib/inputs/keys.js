const com = require("@nkmjs/common");

class INPUT_KEY extends com.helpers.CKEY { constructor() { super(); } }

class STRING extends INPUT_KEY { constructor() { super(); } }
class STRING_TEXT extends STRING { constructor() { super(); } }
class STRING_TEXT_INLINE extends STRING { constructor() { super(); } }
class STRING_TEXT_SEARCH extends STRING { constructor() { super(); } }
class STRING_PATH extends STRING { constructor() { super(); } }
class STRING_PATH_DIR extends STRING { constructor() { super(); } }
class STRING_IDENTIFIER extends STRING { constructor() { super(); } }

class FS_INPUT extends INPUT_KEY { constructor() { super(); } }
class FS_FILE extends FS_INPUT { constructor() { super(); } }
class FS_DIRECTORY extends FS_INPUT { constructor() { super(); } }

class NUMBER extends INPUT_KEY { constructor() { super(); } }
class NUMBER_DRAG extends NUMBER { constructor() { super(); } }
class NUMBER_SLIDER extends NUMBER { constructor() { super(); } }
class NUMBER_SLIDER_ONLY extends NUMBER { constructor() { super(); } }
class NUMBER_ANGLE extends NUMBER { constructor() { super(); } }

class COLOR extends INPUT_KEY { constructor() { super(); } }

class BOOLEAN extends INPUT_KEY { constructor() { super(); } }
class BOOLEAN_CHECK extends BOOLEAN { constructor() { super(); } }

class ENUM extends INPUT_KEY { constructor() { super(); } }
class ENUM_INLINE extends ENUM { constructor() { super(); } }
class FLAGS extends ENUM { constructor() { super(); } }
class FLAGS_INLINE extends ENUM { constructor() { super(); } }

module.exports = {

    INPUT_KEY: INPUT_KEY,

    STRING:STRING,
    STRING_TEXT:STRING_TEXT,
    STRING_TEXT_INLINE:STRING_TEXT_INLINE,
    STRING_TEXT_SEARCH:STRING_TEXT_SEARCH,
    STRING_PATH:STRING_PATH,
    STRING_PATH_DIR:STRING_PATH_DIR,
    STRING_IDENTIFIER:STRING_IDENTIFIER,

    FS_INPUT:FS_INPUT,
    FS_FILE:FS_FILE,
    FS_DIRECTORY:FS_DIRECTORY,

    NUMBER:NUMBER,
    NUMBER_DRAG:NUMBER_DRAG,
    NUMBER_SLIDER:NUMBER_SLIDER,
    NUMBER_SLIDER_ONLY:NUMBER_SLIDER_ONLY,
    NUMBER_ANGLE:NUMBER_ANGLE,

    COLOR:COLOR,

    BOOLEAN:BOOLEAN,
    BOOLEAN_CHECK:BOOLEAN_CHECK,

    ENUM:ENUM,
    ENUM_INLINE:ENUM_INLINE,
    FLAGS:FLAGS,
    FLAGS_INLINE:FLAGS_INLINE,

}