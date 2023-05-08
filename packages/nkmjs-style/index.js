
'use strict';

const CSS = require(`./lib/css`);
const STYLE = require(`./lib/style`);

var __propCache = {};

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    colors: require(`./lib/colors`),

    CSS: CSS,
    STYLE: STYLE,
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends: CSS.Extends.bind(CSS),

    URLTheme: (p_url, p_wrap = false) => { return STYLE.current.URLTheme(p_url, p_wrap); },
    URLAssets: (p_url, p_wrap = false) => { return STYLE.current.URLAssets(p_url, p_wrap); },
    URLImgs: (p_url, p_wrap = false) => { return STYLE.current.URLImgs(p_url, p_wrap); },

    Get: (p_property) => {
        if (!(p_property in __propCache)) {
            let val = STYLE.computedStyles.getPropertyValue(p_property);
            if (val) { __propCache[p_property] = val; }
            return val;
        }
        return __propCache[p_property];
    },
    Set: (p_property, p_value) => {
        if (p_property in __propCache) { if (__propCache[p_property] == p_value) { return; } }
        document.documentElement.style.setProperty(p_property, p_value);
        __propCache[p_property] = p_value;
        STYLE.Broadcast(p_property, p_value);
    },
    ClearCache: () => { __propCache = {}; }

}