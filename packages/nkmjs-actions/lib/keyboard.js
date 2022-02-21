'use strict';

const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

class KEYBOARD extends com.helpers.SingletonEx {
    constructor() { super(); }

    //#region keys

    static _backspace = 8;
    static _tab = 9;
    static _enter = 13;
    static _shift = 16;
    static _ctrl = 17;
    static _alt = 18;
    static _pause = 19;
    static _capsLock = 20;
    static _escape = 27;
    static _pageUp = 33;
    static _space = 32;
    static _pageDown = 34;
    static _end = 35;
    static _home = 36;
    static _arrowLeft = 37;
    static _arrowUp = 38;
    static _arrowRight = 39;
    static _arrowDown = 40;
    static _printScreen = 44;
    static _insert = 45;
    static _delete = 46;
    static _0 = 48;
    static _1 = 49;
    static _2 = 50;
    static _3 = 51;
    static _4 = 52;
    static _5 = 53;
    static _6 = 54;
    static _7 = 55;
    static _8 = 56;
    static _9 = 57;
    static _a = 65;
    static _b = 66;
    static _c = 67;
    static _d = 68;
    static _e = 69;
    static _f = 70;
    static _g = 71;
    static _h = 72;
    static _i = 73;
    static _j = 74;
    static _k = 75;
    static _l = 76;
    static _m = 77;
    static _n = 78;
    static _o = 79;
    static _p = 80;
    static _q = 81;
    static _r = 82;
    static _s = 83;
    static _t = 84;
    static _u = 85;
    static _v = 86;
    static _w = 87;
    static _x = 88;
    static _y = 89;
    static _z = 90;
    static _leftWindowKey = 91;
    static _rightWindowKey = 92;
    static _selectKey = 93;
    static _numpad0 = 96;
    static _numpad1 = 97;
    static _numpad2 = 98;
    static _numpad3 = 99;
    static _numpad4 = 100;
    static _numpad5 = 101;
    static _numpad6 = 102;
    static _numpad7 = 103;
    static _numpad8 = 104;
    static _numpad9 = 105;
    static _multiply = 106;
    static _add = 107;
    static _subtract = 109;
    static _decimalPoint = 110;
    static _divide = 111;
    static _f1 = 112;
    static _f2 = 113;
    static _f3 = 114;
    static _f4 = 115;
    static _f5 = 116;
    static _f6 = 117;
    static _f7 = 118;
    static _f8 = 119;
    static _f9 = 120;
    static _f10 = 121;
    static _f11 = 122;
    static _f12 = 123;
    static _numLock = 144;
    static _scrollLock = 145;
    static _myComputer = 182;
    static _myCalculator = 183;
    static _semiColon = 186;
    static _equalSign = 187;
    static _comma = 188;
    static _dash = 189;
    static _period = 190;
    static _forwardSlash = 191;
    static _openBracket = 219;
    static _backSlash = 220;
    static _closeBraket = 221;
    static _singleQuote = 222;


    static _map = {

        'backspace': { code: this._backspace },
        'tab': { code: this._tab },
        'enter': { code: this._enter },
        'shift': { code: this._shift },
        'ctrl': { code: this._ctrl },
        'alt': { code: this._alt },
        'pause': { code: this._pause },
        'capslock': { code: this._capsLock },
        'escape': { code: this._escape },
        'pageup': { code: this._pageUp },
        'space': { code: this._space },
        ' ': { code: this._space },
        'pagedown': { code: this._pageDown },
        'end': { code: this._end },
        'home': { code: this._home },
        'arrowleft': { code: this._arrowLeft },
        'left': { code: this._arrowLeft },
        'arrowup': { code: this._arrowUp },
        'up': { code: this._arrowUp },
        'arrowright': { code: this._arrowRight },
        'right': { code: this._arrowUp },
        'arrowdown': { code: this._arrowDown },
        'down': { code: this._arrowUp },
        'printscreen': { code: this._printScreen },
        'insert': { code: this._insert },
        'delete': { code: this._delete },
        '0': { code: this._0 },
        '1': { code: this._1 },
        '2': { code: this._2 },
        '3': { code: this._3 },
        '4': { code: this._4 },
        '5': { code: this._5 },
        '6': { code: this._6 },
        '7': { code: this._7 },
        '8': { code: this._8 },
        '9': { code: this._9 },
        'a': { code: this._a },
        'b': { code: this._b },
        'c': { code: this._c },
        'd': { code: this._d },
        'e': { code: this._e },
        'f': { code: this._f },
        'g': { code: this._g },
        'h': { code: this._h },
        'i': { code: this._i },
        'j': { code: this._j },
        'k': { code: this._k },
        'l': { code: this._l },
        'm': { code: this._m },
        'n': { code: this._n },
        'o': { code: this._o },
        'p': { code: this._p },
        'q': { code: this._q },
        'r': { code: this._r },
        's': { code: this._s },
        't': { code: this._t },
        'u': { code: this._u },
        'v': { code: this._v },
        'w': { code: this._w },
        'x': { code: this._x },
        'y': { code: this._y },
        'z': { code: this._z },
        'leftwindowkey': { code: this._leftWindowKey },
        'rightwindowkey': { code: this._rightWindowKey },
        'selectkey': { code: this._selectKey },
        'numpad0': { code: this._numpad0 },
        'numpad1': { code: this._numpad1 },
        'numpad2': { code: this._numpad2 },
        'numpad3': { code: this._numpad3 },
        'numpad4': { code: this._numpad4 },
        'numpad5': { code: this._numpad5 },
        'numpad6': { code: this._numpad6 },
        'numpad7': { code: this._numpad7 },
        'numpad8': { code: this._numpad8 },
        'numpad9': { code: this._numpad9 },
        'multiply': { code: this._multiply },
        '*': { code: this._multiply },
        'add': { code: this._add },
        '+': { code: this._add },
        'subtract': { code: this._subtract },
        '-': { code: this._subtract },
        'decimalpoint': { code: this._decimalPoint },
        '.': { code: this._decimalPoint },
        'divide': { code: this._divide },
        '/': { code: this._divide },
        'f1': { code: this._f1 },
        'f2': { code: this._f2 },
        'f3': { code: this._f3 },
        'f4': { code: this._f4 },
        'f5': { code: this._f5 },
        'f6': { code: this._f6 },
        'f7': { code: this._f7 },
        'f8': { code: this._f8 },
        'f9': { code: this._f9 },
        'f10': { code: this._f10 },
        'f11': { code: this._f11 },
        'f12': { code: this._f12 },
        'numlock': { code: this._numLock },
        'scrolllock': { code: this._scrollLock },
        'mycomputer': { code: this._myComputer },
        'mycalculator': { code: this._myCalculator },
        'semicolon': { code: this._semiColon },
        ';': { code: this._semiColon },
        'equalsign': { code: this._equalSign },
        '=': { code: this._equalSign },
        'comma': { code: this._comma },
        ',': { code: this._comma },
        'dash': { code: this._dash },
        '-': { code: this._dash },
        'period': { code: this._period },
        ',': { code: this._period },
        'forwardslash': { code: this._forwardSlash },
        '\\': { code: this._forwardSlash },
        'openbracket': { code: this._openBracket },
        '[': { code: this._openBracket },
        'backslash': { code: this._backSlash },
        '/': { code: this._backSlash },
        'closebraket': { code: this._closeBraket },
        ']': { code: this._closeBraket },
        'singlequote': { code: this._singleQuote },
        "'": { code: this._singleQuote },

    };

    //#endregion

    _Init() {
        super._Init();
        this._keystrokes = new collections.List();
        this._activeKeystrokes = new collections.List();
        this._activeChain = [];
    }

    _Register(p_keystroke) {
        this._keystrokes.Add(p_keystroke);
    }

    _Unregister(p_keystroke) {
        this._keystrokes.Remove(p_keystroke);
    }

    _Push(p_keyCode) {
        if (this._activeChain.includes(p_keyCode)) { return; }
        this._activeChain.push(p_keyCode);
        this._UpdateActiveKeystrokes();
    }

    _Pull(p_keyCode) {
        let index = this._activeChain.indexOf(p_keyCode);
        if (index == -1) { return; }
        this._activeChain.splice(index, 1);
        this._BuildActiveKeystrokes();
    }

    _BuildActiveKeystrokes() {

        let an = this._activeKeystrokes.count;

        for (let i = 0; i < an; i++) {
            this._activeKeystrokes.At(i).Deactivate();
        }

        this._activeKeystrokes.Clear();
        let n = this._keystrokes.count;
        for (let i = 0; i < n; i++) {

            let k = this._keystrokes.At(i),
                match = k.GetMatch(this._activeChain);

            if (match >= 0) { this._activeKeystrokes.Unshift(k); } // FILO

        }

    }

    _UpdateActiveKeystrokes() {

        if (this._activeKeystrokes.count == 0) { this._BuildActiveKeystrokes(); }

        for (let i = 0; i < this._activeKeystrokes.count; i++) {

            let k = this._activeKeystrokes.At(i),
                match = k.GetMatch(this._activeChain);

            if (match < 0) { this._activeKeystrokes.Remove(k); i--; }
            else if (match == 1) { k.Activate(); }

        }

    }

}

module.exports = KEYBOARD;