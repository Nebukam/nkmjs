
'use strict';

const __CSS = require(`./lib/css`);
const __STYLE = require(`./lib/style`);

const __propCache = {};

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    colors: require(`./lib/colors`),

    CSS: __CSS,
    STYLE: __STYLE,
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends: __CSS.Extends.bind(__CSS),

    URLTheme: (p_url) => { return __STYLE.instance.current.URLTheme(p_url); },
    URLAssets: (p_url) => { return __STYLE.instance.current.URLAssets(p_url); },
    URLImgs: (p_url) => { return __STYLE.instance.current.URLImgs(p_url); },

    Get: (p_property) => {
        if (!(p_property in __propCache)) {
            let val = __STYLE.instance.computedStyles.getPropertyValue(p_property);
            if (val) { __propCache[p_property] = val; }
            return val;
        }
        return __propCache[p_property];
    },
    Set: (p_property, p_value) => {
        document.documentElement.style.setProperty(p_property, p_value);
        __propCache[p_property] = p_value;
    },
    ClearCache: () => { __propCache = {}; }

}