
'use strict';

const __CSS = require(`./lib/css`);

module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    ColorBase: require(`./lib/colors/color-base`),
    RGBA: require(`./lib/colors/rgba`),
    HSLA: require(`./lib/colors/hsla`),

    COLOR: require(`./lib/colors/color`),

    CSS: __CSS,
    STYLE: require(`./lib/style`),
    Palette: require(`./lib/palette`),
    PaletteBuilder: require(`./lib/palette-builder`),

    // Shortcut to CSS.Extends
    Extends:__CSS.Extends.bind(__CSS),

}

