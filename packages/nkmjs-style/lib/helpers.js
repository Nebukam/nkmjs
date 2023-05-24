'use strict';

const u = require("@nkmjs/utils");

module.exports = {

    /**
     * @description Create a DOM Node of a given type with a given set of attributes.
     * @param {string} p_el 
     * @param {object} [p_atts] inlined attributes & values
     * @param {Node} [p_host] Parent node to append the new node into
     * @example let newNode = this.New(`div`, { class:`foo`, ['data-title']:`bar` });
     * //<div class="foo" data-title:"bar"></div> //dom element
     */
    El: function (p_el, p_atts = null, p_host = null) {
        let element = document.createElement(p_el);
        if (!u.isVoid(p_atts)) { for (let att in p_atts) { element.setAttribute(att, p_atts[att]); } }
        if (!u.isVoid(p_host)) {
            if (p_host._wrapper) { p_host._wrapper.appendChild(element); }
            else { p_host.appendChild(element); }
        }
        return element;
    },

    /**
     * @description Return an HTMLElement formatted as
     * <style> import url("path") </style>
     * @param {string} p_import_path 
     * @returns {Element}
     */
    ElCSSImport: function (p_import_path) {
        let element = module.exports.El(`style`, { type: `text/css` });
        element.innerText = `@import url("${p_import_path}")`;
        return element;
    },

    /**
     * Extract CSS Classes rules from a string
     * @param {*} p_styleString .class1 { rule:value; anotherRule:value; } .class2 { rule:value; }
     * @returns {object}
     * @example RuleSetsFromString(".class1 { rule:value; anotherRule:value; } .class2 { rule:value; }");
     * //Returns the following Object
     * {
     *      'class1':{
     *          'rule':'value',
     *          'anotherRule':'value',
     *      },
     *      'class2':{
     *          'rule':'value',
     *      }
     * }
     */
    RuleSetsFromString: function (p_styleString) {
        let result = {};
        try {
            //.st0 |{| fill:#FF00FF;}.st1 |{| fill:#FF00FF;}
            let baseSplit = p_styleString.split(`{`);
            if (baseSplit.length > 1) {
                //Has classes
                let className = baseSplit[0].trim();
                for (let b = 1; b < baseSplit.length; b++) {
                    let spl = baseSplit[b].split(`}`);
                    result[className] = module.exports.RulesFromString(spl[0]);
                    className = spl[1];
                }
            } else {
                result = module.exports.RulesFromString(p_styleString);
            }
        } catch (e) { }
        return result;
    },

    /**
     * Extract rules from an inline CSS string
     * @param {*} p_string "rule1:value; rule2:value;"
     * @returns {object}
     * @example RulesFromString("rule1:value; rule2:value;")
     * //Returns the following Object
     * {
     *      'rule1':'value',
     *      'rule2':'value',
     * }
     */
    RulesFromString: function (p_string) {
        let
            obj = {};

        if (!p_string || p_string == ``) {
            return obj;
        }

        let rules = p_string.trim().split(`;`);

        if (rules.length == 1) {
            // Single rule
            let rule = p_string.split(`:`);
            obj[rule[0]] = rule[1];
        } else {
            for (let s = 0; s < rules.length; s++) {
                let rule = rules[s].split(`:`);
                obj[rule[0]] = rule[1];
            }
        }

        return obj;
    },

    /**
     * @description Text format
     * @param {test} p_text 
     * @param {object} p_format 
     * @param {string|style.color.ColorBase} p_format.color only sets color (overriden by .style)
     * @param {boolean} p_format.strong adds a <strong> tag
     * @param {string} p_format.class css class
     * @param {object} p_format.style inline CSS
     * @param {string} p_type tag type
     */
    TF: function (p_text, p_format, p_type = 'span') {

        p_text = p_format.strong ? `<strong>${p_text}</strong>` : p_text;

        let css = ``;
        if (p_format.style) {
            css = ` style='${CSS.InlineCSS(this.current._ProcessSingleRuleset(``, p_format.style))}' `;
        } else if (p_format.color) {
            let color = p_format.color;
            if (u.isString(color)) { if (color in this.current._colors) { color = this.current._colors[color]; } }
            css = ` style='color:${color};' `;
        }

        let cl = p_format.class ? ` class='${p_format.class}'` : ``;

        return `<${p_type}${cl}${css}>${p_text}</${p_type}>`;

    },



}