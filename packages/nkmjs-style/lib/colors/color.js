'use strict';

const HSLA = require("./hsla");
const RGBA = require("./rgba");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof style
 */
class COLOR {

    /**
     * @description TODO
     * @param {number} h 
     * @param {number} s 
     * @param {number} l 
     * @param {number} a 
     */
    static HSLA(h = 360, s = 100, l = 100, a = 1) {
        return new HSLA(h, s, l, a);
    }

    /**
     * @description TODO
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     * @param {number} a 
     */
    static RGBA(r = 255, g = 255, b = 255, a = 1) {
        return new RGBA(r, g, b, a);
    }

    /**
     * @description TODO
     * @param {style.RGBA} p_rgba 
     */
    static RGBAtoHSLA(p_rgba) {

        // Find greatest and smallest channel values
        let r = p_rgba.r, g = p_rgba.g, b = p_rgba.b,
            cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0, s = 0, l = 0;

        // Calculate hue
        // No difference
        if (delta === 0) { h = 0; }
        else if (cmax === r) { h = ((g - b) / delta) % 6; } // Red is max
        else if (cmax === g) { h = (b - r) / delta + 2; } // Green is max
        else { h = (r - g) / delta + 4; } // Blue is max

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) { h += 360; }

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return new HSLA(h, s, l, p_rgba.a);

    }

    /**
     * @description TODO
     * @param {style.HSLA} p_hsla 
     */
    static HSLAtoRGBA(p_hsla) {

        let h = p_hsla.h, s = p_hsla.s, l = p_hsla.l,
            c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return new RGBA(r, g, b, p_hsla.a);

    }


}

module.exports = COLOR;