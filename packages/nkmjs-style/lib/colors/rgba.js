'use strict';

const ColorBase = require(`./color-base`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments style.ColorBase
 * @memberof style
 */
class RGBA extends ColorBase {


    /**
     * @description TODO
     * @param {string} p_hex #FFFFFF
     * @returns {RGBA} New RGBA
     */
    static hex(p_hex) {
        let color = new RGBA();
        color.hex = p_hex;
        return color;
    }

    static HexToRGBString(p_hex){
        
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_hex),
            r = 0, g = 0, b = 0;
            
            if (result) {
                r = parseInt(result[1], 16);
                g = parseInt(result[2], 16);
                b = parseInt(result[3], 16);
            }

            return `${r},${g},${b}`;

    }

    /**
     * @description TODO
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     * @returns {RGBA} New RGBA
     */
    static Get(p_r = 0, p_g = 0, p_b = 0, p_a = 1) {
        let color = new RGBA();
        color.R = p_r;
        color.G = p_g;
        color.B = p_b;
        color.a = p_a;
        return color;
    }

    /**
     * @description TODO
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     */
    constructor(p_r = 0, p_g = 0, p_b = 0, p_a = 1) {
        super();
        this._R = p_r;
        this._G = p_g;
        this._B = p_b;
        this._a = p_a;
    }

    /**
     * @description TODO
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     * @returns {RGBA} self
     */
    Set(p_r = 0, p_g = 0, p_b = 0, p_a = 1) {
        this._R = p_r;
        this._G = p_g;
        this._B = p_b;
        this._a = p_a;
        return this;
    }

    get R() { return this._R; }
    set R(p_value) { this._R = p_value; }
    get r() { return this._R / 255; }
    set r(p_value) { this._R = p_value * 255; }

    get G() { return this._G; }
    set G(p_value) { this._G = p_value; }
    get g() { return this._G / 255; }
    set g(p_value) { this._G = p_value * 255; }

    get B() { return this._B; }
    set B(p_value) { this._B = p_value; }
    get b() { return this._B / 255; }
    set b(p_value) { this._B = p_value * 255; }

    get A() { return this._a * 255; }
    set A(p_value) { this._a = p_value / 255; }
    get a() { return this._a; }
    set a(p_value) { this._a = p_value; }

    get hex() {
        let p_r = this._R.toString(16); p_r = p_r.length === 1 ? "0" + p_r : p_r;
        let p_g = this._G.toString(16); p_g = p_g.length === 1 ? "0" + p_g : p_g;
        let p_b = this._B.toString(16); p_b = p_b.length === 1 ? "0" + p_b : p_b;
        return `#${p_r}${p_g}${p_b}`;
    }
    set hex(p_value) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_value);
        if (result) {
            this._R = parseInt(result[1], 16);
            this._G = parseInt(result[2], 16);
            this._B = parseInt(result[3], 16);
        } else {
            this._R = 0;
            this._G = 0;
            this._B = 0;
        }
    }

    get hexa() {
        let p_r = this._R.toString(16); p_r = p_r.length === 1 ? "0" + p_r : p_r;
        let p_g = this._G.toString(16); p_g = p_g.length === 1 ? "0" + p_g : p_g;
        let p_b = this._B.toString(16); p_b = p_b.length === 1 ? "0" + p_b : p_b;
        let p_a = this.A.toString(16); p_a = p_a.length === 1 ? "0" + p_a : p_a;
        return `#${p_r}${p_g}${p_b}${p_a}`;
    }
    set hexa(p_value) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_value);
        if (result) {
            this._R = parseInt(result[1], 16);
            this._G = parseInt(result[2], 16);
            this._B = parseInt(result[3], 16);
            this._a = parseInt(result[4], 16) / 255;
        } else {
            this._R = 0;
            this._G = 0;
            this._B = 0;
            this._a = 0;
        }
    }

    get rgb() { return `rgb(${this._R},${this._G},${this._B})`; }
    get rgba() { return `rgba(${this._R},${this._G},${this._B},${this._a})`; }


    toString() { return this.rgba; }

}

module.exports = RGBA;