
'use strict';

const __CSS = require(`./lib/css`);
const __STYLE = require(`./lib/style`);

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    ColorBase: require(`./lib/colors/color-base`),
    RGBA: require(`./lib/colors/rgba`),
    HSLA: require(`./lib/colors/hsla`),

    COLOR: require(`./lib/colors/color`),

    CSS: __CSS,
    STYLE: __STYLE,
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends:__CSS.Extends.bind(__CSS),

    URLTheme:(p_url) =>{ return __STYLE.instance.current.URLTheme(p_url); },
    URLAssets:(p_url) =>{ return __STYLE.instance.current.URLAssets(p_url); },
    URLImgs:(p_url) =>{ return __STYLE.instance.current.URLImgs(p_url); },

}

