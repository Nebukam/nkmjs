'use strict';

class META_IDS{

    static PRESENTATION = 'presentation';
    static COLOR = 'color';
    static WEIGHT = 'weight';
    static ICON = 'icon';

    static P_PRES_COLOR = {
        path: [this.PRESENTATION, this.COLOR],
        varname:`--${this.PRESENTATION}-${this.COLOR}`,
        varnameRGB:`--${this.PRESENTATION}-${this.COLOR}`,
    };

    static P_PRES_WEIGHT = {
        path: [this.PRESENTATION, this.WEIGHT],
        varname:`--${this.PRESENTATION}-${this.WEIGHT}`
    };

    static P_PRES_ICON = {
        path: [this.PRESENTATION, this.ICON],
        varname:`--${this.PRESENTATION}-${this.ICON}`
    };

}

module.exports = META_IDS;