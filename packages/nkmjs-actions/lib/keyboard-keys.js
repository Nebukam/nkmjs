const _backspace = 8;
const _tab = 9;
const _enter = 13;
const _shift = 16;
const _ctrl = 17;
const _alt = 18;
const _pause = 19;
const _capsLock = 20;
const _escape = 27;
const _pageUp = 33;
const _space = 32;
const _pageDown = 34;
const _end = 35;
const _home = 36;
const _arrowLeft = 37;
const _arrowUp = 38;
const _arrowRight = 39;
const _arrowDown = 40;
const _printScreen = 44;
const _insert = 45;
const _delete = 46;
const _0 = 48;
const _1 = 49;
const _2 = 50;
const _3 = 51;
const _4 = 52;
const _5 = 53;
const _6 = 54;
const _7 = 55;
const _8 = 56;
const _9 = 57;
const _a = 65;
const _b = 66;
const _c = 67;
const _d = 68;
const _e = 69;
const _f = 70;
const _g = 71;
const _h = 72;
const _i = 73;
const _j = 74;
const _k = 75;
const _l = 76;
const _m = 77;
const _n = 78;
const _o = 79;
const _p = 80;
const _q = 81;
const _r = 82;
const _s = 83;
const _t = 84;
const _u = 85;
const _v = 86;
const _w = 87;
const _x = 88;
const _y = 89;
const _z = 90;
const _leftWindowKey = 91;
const _rightWindowKey = 92;
const _selectKey = 93;
const _numpad0 = 96;
const _numpad1 = 97;
const _numpad2 = 98;
const _numpad3 = 99;
const _numpad4 = 100;
const _numpad5 = 101;
const _numpad6 = 102;
const _numpad7 = 103;
const _numpad8 = 104;
const _numpad9 = 105;
const _multiply = 106;
const _add = 107;
const _subtract = 109;
const _decimalPoint = 110;
const _divide = 111;
const _f1 = 112;
const _f2 = 113;
const _f3 = 114;
const _f4 = 115;
const _f5 = 116;
const _f6 = 117;
const _f7 = 118;
const _f8 = 119;
const _f9 = 120;
const _f10 = 121;
const _f11 = 122;
const _f12 = 123;
const _numLock = 144;
const _scrollLock = 145;
const _myComputer = 182;
const _myCalculator = 183;
const _semiColon = 186;
const _equalSign = 187;
const _comma = 188;
const _dash = 189;
const _period = 190;
const _forwardSlash = 191;
const _openBracket = 219;
const _backSlash = 220;
const _closeBraket = 221;
const _singleQuote = 222;

const map = Object.freeze({
    'backspace': { code: _backspace },
    'tab': { code: _tab },
    'enter': { code: _enter },
    'shift': { code: _shift },
    'ctrl': { code: _ctrl },
    'alt': { code: _alt },
    'pause': { code: _pause },
    'capslock': { code: _capsLock },
    'escape': { code: _escape },
    'pageup': { code: _pageUp },
    'space': { code: _space },
    ' ': { code: _space },
    'pagedown': { code: _pageDown },
    'end': { code: _end },
    'home': { code: _home },
    'arrowleft': { code: _arrowLeft },
    'left': { code: _arrowLeft },
    'arrowup': { code: _arrowUp },
    'up': { code: _arrowUp },
    'arrowright': { code: _arrowRight },
    'right': { code: _arrowUp },
    'arrowdown': { code: _arrowDown },
    'down': { code: _arrowUp },
    'printscreen': { code: _printScreen },
    'insert': { code: _insert },
    'delete': { code: _delete },
    '0': { code: _0 },
    '1': { code: _1 },
    '2': { code: _2 },
    '3': { code: _3 },
    '4': { code: _4 },
    '5': { code: _5 },
    '6': { code: _6 },
    '7': { code: _7 },
    '8': { code: _8 },
    '9': { code: _9 },
    'a': { code: _a },
    'b': { code: _b },
    'c': { code: _c },
    'd': { code: _d },
    'e': { code: _e },
    'f': { code: _f },
    'g': { code: _g },
    'h': { code: _h },
    'i': { code: _i },
    'j': { code: _j },
    'k': { code: _k },
    'l': { code: _l },
    'm': { code: _m },
    'n': { code: _n },
    'o': { code: _o },
    'p': { code: _p },
    'q': { code: _q },
    'r': { code: _r },
    's': { code: _s },
    't': { code: _t },
    'u': { code: _u },
    'v': { code: _v },
    'w': { code: _w },
    'x': { code: _x },
    'y': { code: _y },
    'z': { code: _z },
    'leftwindowkey': { code: _leftWindowKey },
    'rightwindowkey': { code: _rightWindowKey },
    'selectkey': { code: _selectKey },
    'numpad0': { code: _numpad0 },
    'numpad1': { code: _numpad1 },
    'numpad2': { code: _numpad2 },
    'numpad3': { code: _numpad3 },
    'numpad4': { code: _numpad4 },
    'numpad5': { code: _numpad5 },
    'numpad6': { code: _numpad6 },
    'numpad7': { code: _numpad7 },
    'numpad8': { code: _numpad8 },
    'numpad9': { code: _numpad9 },
    'multiply': { code: _multiply },
    '*': { code: _multiply },
    'add': { code: _add },
    '+': { code: _add },
    'subtract': { code: _subtract },
    '-': { code: _subtract },
    'decimalpoint': { code: _decimalPoint },
    '.': { code: _decimalPoint },
    'divide': { code: _divide },
    '/': { code: _divide },
    'f1': { code: _f1 },
    'f2': { code: _f2 },
    'f3': { code: _f3 },
    'f4': { code: _f4 },
    'f5': { code: _f5 },
    'f6': { code: _f6 },
    'f7': { code: _f7 },
    'f8': { code: _f8 },
    'f9': { code: _f9 },
    'f10': { code: _f10 },
    'f11': { code: _f11 },
    'f12': { code: _f12 },
    'numlock': { code: _numLock },
    'scrolllock': { code: _scrollLock },
    'mycomputer': { code: _myComputer },
    'mycalculator': { code: _myCalculator },
    'semicolon': { code: _semiColon },
    ';': { code: _semiColon },
    'equalsign': { code: _equalSign },
    '=': { code: _equalSign },
    'comma': { code: _comma },
    ',': { code: _comma },
    'dash': { code: _dash },
    '-': { code: _dash },
    'period': { code: _period },
    ',': { code: _period },
    'forwardslash': { code: _forwardSlash },
    '\\': { code: _forwardSlash },
    'openbracket': { code: _openBracket },
    '[': { code: _openBracket },
    'backslash': { code: _backSlash },
    '/': { code: _backSlash },
    'closebraket': { code: _closeBraket },
    ']': { code: _closeBraket },
    'singlequote': { code: _singleQuote },
    "'": { code: _singleQuote },

});

module.exports = {

    //#region keys

    _backspace: _backspace,
    _tab: _tab,
    _enter: _enter,
    _shift: _shift,
    _ctrl: _ctrl,
    _alt: _alt,
    _pause: _pause,
    _capsLock: _capsLock,
    _escape: _escape,
    _pageUp: _pageUp,
    _space: _space,
    _pageDown: _pageDown,
    _end: _end,
    _home: _home,
    _arrowLeft: _arrowLeft,
    _arrowUp: _arrowUp,
    _arrowRight: _arrowRight,
    _arrowDown: _arrowDown,
    _printScreen: _printScreen,
    _insert: _insert,
    _delete: _delete,
    _0: _0,
    _1: _1,
    _2: _2,
    _3: _3,
    _4: _4,
    _5: _5,
    _6: _6,
    _7: _7,
    _8: _8,
    _9: _9,
    _a: _a,
    _b: _b,
    _c: _c,
    _d: _d,
    _e: _e,
    _f: _f,
    _g: _g,
    _h: _h,
    _i: _i,
    _j: _j,
    _k: _k,
    _l: _l,
    _m: _m,
    _n: _n,
    _o: _o,
    _p: _p,
    _q: _q,
    _r: _r,
    _s: _s,
    _t: _t,
    _u: _u,
    _v: _v,
    _w: _w,
    _x: _x,
    _y: _y,
    _z: _z,
    _leftWindowKey: _leftWindowKey,
    _rightWindowKey: _rightWindowKey,
    _selectKey: _selectKey,
    _numpad0: _numpad0,
    _numpad1: _numpad1,
    _numpad2: _numpad2,
    _numpad3: _numpad3,
    _numpad4: _numpad4,
    _numpad5: _numpad5,
    _numpad6: _numpad6,
    _numpad7: _numpad7,
    _numpad8: _numpad8,
    _numpad9: _numpad9,
    _multiply: _multiply,
    _add: _add,
    _subtract: _subtract,
    _decimalPoint: _decimalPoint,
    _divide: _divide,
    _f1: _f1,
    _f2: _f2,
    _f3: _f3,
    _f4: _f4,
    _f5: _f5,
    _f6: _f6,
    _f7: _f7,
    _f8: _f8,
    _f9: _f9,
    _f10: _f10,
    _f11: _f11,
    _f12: _f12,
    _numLock: _numLock,
    _scrollLock: _scrollLock,
    _myComputer: _myComputer,
    _myCalculator: _myCalculator,
    _semiColon: _semiColon,
    _equalSign: _equalSign,
    _comma: _comma,
    _dash: _dash,
    _period: _period,
    _forwardSlash: _forwardSlash,
    _openBracket: _openBracket,
    _backSlash: _backSlash,
    _closeBraket: _closeBraket,
    _singleQuote: _singleQuote,

    map: map,

    //#endregion


}