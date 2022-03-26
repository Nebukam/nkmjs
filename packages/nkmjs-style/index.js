
'use strict';

const __CSS = require(`./lib/css`);
const __STYLE = require(`./lib/style`);

var __propCache = {};

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    colors: require(`./lib/colors`),

    CSS: __CSS,
    STYLE: __STYLE,
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends: __CSS.Extends.bind(__CSS),

    URLTheme: (p_url, p_wrap = false) => { return __STYLE.instance.current.URLTheme(p_url, p_wrap); },
    URLAssets: (p_url, p_wrap = false) => { return __STYLE.instance.current.URLAssets(p_url, p_wrap); },
    URLImgs: (p_url, p_wrap = false) => { return __STYLE.instance.current.URLImgs(p_url, p_wrap); },

    Get: (p_property) => {
        if (!(p_property in __propCache)) {
            let val = __STYLE.instance.computedStyles.getPropertyValue(p_property);
            if (val) { __propCache[p_property] = val; }
            return val;
        }
        return __propCache[p_property];
    },
    Set: (p_property, p_value) => {
        if (p_property in __propCache) { if (__propCache[p_property] == p_value) { return; } }
        document.documentElement.style.setProperty(p_property, p_value);
        __propCache[p_property] = p_value;
        __STYLE.instance.Broadcast(p_property, p_value);
    },
    ClearCache: () => { __propCache = {}; }

}