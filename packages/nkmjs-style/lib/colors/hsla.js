'use strict';

const ColorBase = require(`./color-base`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments style.ColorBase
 * @memberof style
 */
class HSLA extends ColorBase{


    /**
     * @description TODO
     * @param {string} p_hex #FFFFFF
     * @returns {style.HSLA} New HSLA
     */
    static hex(p_hex){
        let color = new HSLA();
        color.hex = p_hex;
        return color;
    }

    /**
     * @description TODO
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     * @returns {style.HSLA} New HSLA
     */
    static Get(p_h = 0, p_s = 0, p_l = 0, p_a = 1){
        let color = new HSLA();
        color.R = p_h;
        color.G = p_s;
        color.B = p_l;
        color.a = p_a;
        return color;
    }

    /**
     * @description TODO
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     */
    constructor(p_h = 0, p_s = 0, p_l = 0, p_a = 1){
        super();
        this._H = p_h;
        this._S = p_s;
        this._L = p_l;
        this._a = p_a;
    }

    /**
     * @description TODO
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     * @returns {HSLA} self
     */
    Set(p_h = 0, p_s = 0, p_l = 0, p_a = 1){
        this._H = p_h;
        this._S = p_s;
        this._L = p_l;
        this._a = p_a;
        return this;
    }

    get H(){ return this._H; }
    set H(p_value){ this._H = p_value; }
    get h(){ return this._H / 360; }
    set h(p_value){ this._H = p_value * 360; }

    get S(){ return this._S; }
    set S(p_value){ this._S = p_value; }
    get s(){ return this._S / 100; }
    set s(p_value){ this._S = p_value * 100; }

    get L(){ return this._L; }
    set L(p_value){ this._L = p_value; }
    get l(){ return this._L / 100; }
    set l(p_value){ this._L = p_value * 100; }

    get A(){ return this._a * 255; }
    set A(p_value){ this._a = p_value / 255; }
    get a(){ return this._a; }
    set a(p_value){ this._a = p_value; }

    get hsl(){ return `hsl(${this._H},${this._S}%,${this._L}%)`; }
    get hsla(){ return `hsla(${this._H},${this._S}%,${this._L}%,${this._a})`; }

    toString(){ return this.hsla; }

}

module.exports = HSLA;