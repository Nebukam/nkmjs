
'use strict';

const __css = require(`./lib/css`);

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    ColorBase: require(`./lib/colors/color-base`),
    RGBA: require(`./lib/colors/rgba`),
    HSLA: require(`./lib/colors/hsla`),

    COLOR: require(`./lib/colors/color`),

    CSS: __css,
    STYLE: require(`./lib/style`),
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends:(p_base, p_source) => { return __css.Extends(p_base, p_source); }

}

