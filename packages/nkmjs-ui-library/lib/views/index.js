'use strict';

const datacontrols = require(`@nkmjs/ui-data-controls`);
const u = require(`@nkmjs/utils`);

module.exports = {

    ShelfNav: require(`./shelf-nav`),
    Shelf: require(`./shelf`),

    /**
         * 
         * @param {*} p_owner 
         * @param {options} p_options 
         * @param {options} p_options.controls
         * @param {*} p_host 
         * @returns 
         */
    Foldout: function (p_owner, p_options, p_host) {

        p_options = {...p_options}; //Copy option to avoid issues with static members.

        const newFoldout = p_owner.Attach(datacontrols.ControlFoldout, 'foldout', p_host || p_owner);
        const builder = newFoldout.builder;

        const builderOptions = {
            host: newFoldout.body,
            cl: datacontrols.widgets.ValueControl,
            ...(p_options.builderOptions || {})
        };

        p_options.builderOptions = builderOptions;

        newFoldout.options = p_options;

        let fwd = p_options.forwardData;
        if (fwd !== false) { p_owner.forwardData?.To(builder, u.isObject(fwd) ? fwd : null); }

        return newFoldout;

    },

}