'use strict';

const com = require("@nkmjs/common");
const COLOR = require("./colors/color");
const PaletteBuilder = require("./palette-builder");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments style.PaletteBuilder
 * @memberof style
 */
class DefaultStylesheet extends PaletteBuilder {
    constructor() { super(); }

    Build(palette) {

        let defaultColors = {};

        defaultColors[com.FLAGS.INFOS] = COLOR.RGBA(102, 175, 204);
        defaultColors[com.FLAGS.WARNING] = COLOR.RGBA(255, 206, 0);
        defaultColors[com.FLAGS.ERROR] = COLOR.RGBA(226, 5, 0);
        defaultColors[com.FLAGS.READY] = COLOR.RGBA(120, 164, 0);
        defaultColors[com.FLAGS.DIRTY] = COLOR.RGBA(164, 100, 0);
        defaultColors[com.FLAGS.LOADING] = COLOR.RGBA(102, 119, 204);
        defaultColors[com.FLAGS.PROCESSING] = COLOR.RGBA(102, 119, 204);
        defaultColors[com.FLAGS.WAITING] = COLOR.RGBA(102, 119, 204);
        defaultColors[com.FLAGS.ACTIVE] = COLOR.RGBA(62, 193, 136);

        palette.AddColors(defaultColors);

        palette.AddDocumentRulesets({

            'html, body': {
                'margin': 0,
                'padding': 0,
                'font-family': `'Regular', sans-serif`,
                'font-size': '0.85rem', /* 0.9375rem */
                'font-weight': 400,
                'line-height': 1.5,
                'color': '#dedede', /* contrast indice 4.65 */
                'text-align': 'left',
                'background-color': '#1e1e1e',
                'overflow': 'hidden',
            },

        });

        palette.AddVariables({
            'margin-medium': '10px',
            'padding-medium': '5px',
            'scroll-size-small': '2px',
            'scroll-size': '4px',
            'color-warning': COLOR.RGBA().rgba,

            'size-xxs': '8px',
            'size-xs': '16px',
            'size-s': '24px',
            'size-m': '32px',
            'size-l': '50px',
            'size-xl': '108px',
        });

        palette.AddSuffixes({
            'small-scroll': {

                '::-webkit-scrollbar-track': {
                    'background-color': `|color-warning|`,
                },
                '::-webkit-scrollbar': {
                    'width': `|scroll-size-small|`,
                    'height': `|scroll-size-small|`,
                    'background-color': `|color-warning|`
                },
                '::-webkit-scrollbar-thumb': {
                    'background-color': '|color-warning|',
                },
                ':hover::-webkit-scrollbar': {
                    'width': `|scroll-size|`,
                    'height': `|scroll-size|`,
                },
                ':hover::-webkit-scrollbar-thumb': {
                    'background-color': '|color-warning|',
                }
            }
        });

        palette.AddSuffixes({
            'interactive-shadow': {
                '': {
                    filter: `drop-shadow(0px 2px 1px rgba(0,0,0,0.1))`
                },
                '(.focused)': {
                    'cursor': `pointer`,
                    filter: `drop-shadow(0px 2px 5px rgba(0,0,0,1))`,
                },
                '(.selected)': {
                    filter: `drop-shadow(0px 2px 2px rgba(0,0,0,0.2))`,
                },
                '(.selected.focused)': {
                    filter: `drop-shadow(0px 2px 5px rgba(0,0,0,1))`,
                },
                '(.disabled)': {}
            },

            'interactive-area': {
                '': {
                    'background-color': `#000`,
                    'border-radius': `5px`
                },
                '(.selected)': {
                },
                '(.selected.focused)': {
                },
                '(.disabled)': {}
            }
        });

        //
        // Presets
        //

        palette.AddRulesets({
            'h4': {
                'margin-block-start': 0,
                'margin-block-end': 0
            }
        });

        palette.AddProperties({

            'fade-in': {
                'opacity': `0`
            },

            'sticky-top': {
                'position': 'sticky',
                'top': 0,
                'z-index': 10,
            },

            'sticky-bottom': {
                'position': 'sticky',
                'bottom': 0,
                'z-index': 10,
            },

            'bg-blur-10': { 'backdrop-filter': 'blur(10px)' },

            'absolute-top-left': { 'position': 'absolute', 'top': '0', 'left': '0' },
            'absolute-top': { 'position': 'absolute', 'top': '0', 'left': '50%', 'transform': 'translate(-50%, 0)' },
            'absolute-top-right': { 'position': 'absolute', 'top': '0', 'right': '0' },

            'absolute-left': { 'position': 'absolute', 'top': '50%', 'left': '0', 'transform': 'translate(0, -50%)' },
            'absolute-center': { 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' },
            'absolute-right': { 'position': 'absolute', 'top': '50%', 'right': '0', 'transform': 'translate(0, -50%)' },

            'absolute-bottom': { 'position': 'absolute', 'bottom': '0', 'left': '50%', 'transform': 'translate(-50%, 0)' },
            'absolute-bottom-left': { 'position': 'absolute', 'bottom': '0', 'left': '0' },
            'absolute-bottom-right': { 'position': 'absolute', 'bottom': '0', 'right': '0' },




            'layer': {
                'position': `absolute`,
                'top': `0px`,
                'left': `0px`,
                'width': `100%`,
                'height': `100%`,
                'box-sizing': `border-box`
            },

            'invisible-fill': {
                'position': `absolute`,
                'top': `0px`,
                'left': `0px`,
                'width': `100%`,
                'height': `100%`,
                'box-sizing': `border-box`,
                'opacity': '0 !important'
            },

            'cover': {
                'background-size': `cover`,
                'background-position': `center`,
            }

        });

        //
        // Text & Fonts
        //

        palette.AddProperties({

            'icon-small': {
                'width': `20px`,
                'height': `20px`,
                '@': [`cover`]
            },

        });

        //
        // Generic filters
        //

        palette.AddProperties({

            'drop-shadow': {
                'filter': `drop-shadow(0px 5px 5px rgba(0,0,0,0.2))`,
            },

        });

    }
}

module.exports = DefaultStylesheet;