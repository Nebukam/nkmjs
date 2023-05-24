
'use strict';

const u = require("@nkmjs/utils");
const env = require(`@nkmjs/environment`);

const STYLE = require(`./lib/style`);

var _propCache = {};
var _computeStyles = null;


module.exports = {

    FONT_FLAG: require(`./lib/font-flag`),

    STYLE: STYLE,

    rules: require(`./lib/rules`),
    colors: require(`./lib/colors`),

    // Shortcut to CSS.Extends
    Extends: STYLE.Extends,
    Build: STYLE.Build,

    //#region Theme

    get themeId() { return STYLE.themeId; },
    set themeId(p_value) { STYLE.themeId = p_value || 'default'; },

    URLTheme: function (p_url, p_wrap = false, p_themeId = null) {
        return p_wrap ? `url("${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/${p_url}")`
            : `${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/${p_url}`;
    },
    URLAssets: function (p_url, p_wrap = false, p_themeId = null) {
        return p_wrap ? `url("${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/assets/${p_url}")`
            : `${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/assets/${p_url}`;
    },
    URLImgs: function (p_url, p_wrap = false, p_themeId = null) {
        return p_wrap ? `url("${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/assets/imgs/${p_url}")`
            : `${u.FULL(u.PATH.STYLE)}/${p_themeId || STYLE.themeId}/assets/imgs/${p_url}`;
    },

    //#endregion

    //#region Single properties

    Get: (p_property) => {
        if (!(p_property in _propCache)) {

            if (!_computeStyles) { _computeStyles = window.getComputedStyle(env.app.body); }

            let val = _computeStyles.getPropertyValue(p_property);
            if (val) { _propCache[p_property] = val; }
            return val;
        }
        return _propCache[p_property];
    },

    Set: (p_property, p_value) => {
        if (p_property in _propCache) { if (_propCache[p_property] == p_value) { return; } }
        env.app.body.style.setProperty(p_property, p_value);
        _propCache[p_property] = p_value;
        STYLE.Broadcast(p_property, p_value);
    },

    ClearCache: () => { _propCache = {}; }

    //#endregion


}