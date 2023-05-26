'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

const dom = require(`../dom`);
const Tool = require(`../buttons/button-tool`);

const base = require(`./foldout`);

class ControlFoldout extends base {
    constructor() { super(); }

    /**
     * 
     * @param {*} p_owner 
     * @param {options} p_options 
     * @param {options} p_options.controls
     * @param {*} p_host 
     * @returns 
     */
    static Build(p_owner, p_options, p_host) {

        let
            foldout = p_owner.Attach(ControlFoldout, 'foldout', p_host || p_owner),
            builder = foldout.builder;

        let builderOptions = {
            host: foldout.body,
            cl: datacontrols.widgets.ValueControl,
            css: `full`,
            ...(p_options.builderOptions || {})
        };

        p_options.builderOptions = builderOptions;

        foldout.options = p_options;

        let fwd = p_options.forwardData;
        if (u.isBool(fwd) ? p_options.fwd ? true : false : true) { p_owner.forwardData?.To(builder, u.isObject(fwd) ? fwd : null); }

        return foldout;

    }

    ////////

    static __distribute = com.helpers.OptionsDistribute.Ext(base)
        .To(`builderOptions`, null, null)
        .To(`controls`, null, null);

    _Init() {
        super._Init();
        this._builder = new datacontrols.helpers.ControlBuilder(this);
    }

    get builder() { return this._builder; }

    set controls(p_value) { this._builder.Build(p_value); }

    set builderOptions(p_value) { this._builder.options = p_value; }

    _CleanUp() {
        this._builder.Clear();
        super._CleanUp();
    }

}

module.exports = ControlFoldout;
ui.Register(`nkmjs-foldout`, ControlFoldout);