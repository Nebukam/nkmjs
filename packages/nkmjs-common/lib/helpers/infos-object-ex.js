'use strict';

const u = require("@nkmjs/utils");
const DisposableObjectEx = require(`../pool/disposable-object-ex`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof actions
 */
class InfosObjectEx extends DisposableObjectEx {
    
    constructor() {
        super();
        this._displayInfos = {
            icon: this.constructor.__displayIcon,
            name: this.constructor.__displayName,
            title: this.constructor.__displayTitle,
        };
    }

    static __displayIcon = `action`;
    static __displayName = u.tils.CamelSplit(this.name);
    static __displayTitle = u.tils.CamelSplit(this.name);

    get displayInfos() { return this._displayInfos; }
    set displayInfos(p_value) {
        if (!p_value) {
            this._displayInfos.icon = this.constructor.__displayIcon;
            this._displayInfos.name = this.constructor.__displayName;
            this._displayInfos.title = this.constructor.__displayTitle;
        } else {
            this._displayInfos.icon = p_value.icon || this.constructor.__displayIcon;
            this._displayInfos.name = p_value.name || this.constructor.__displayName;
            this._displayInfos.title = p_value.title || this.constructor.__displayTitle;
        }
    }

    _CleanUp() {
        this.displayInfos = null;
        super._CleanUp();
    }

}

module.exports = InfosObjectEx;