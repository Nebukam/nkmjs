
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
    flex: require(`./lib/rules-flex`),
    flexItem: require(`./lib/rules-flex-item`),
    grid: require(`./lib/rules-grid`),
    gridTemplates:require(`./lib/rules-grid-tpl`),

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

    Get: (p_id) => {
        if (!(p_id in _propCache)) {

            if (!_computeStyles) { _computeStyles = window.getComputedStyle(env.app.body); }

            let val = _computeStyles.getPropertyValue(p_id);
            if (val) { _propCache[p_id] = val; }
            return val;
        }
        return _propCache[p_id];
    },

    Set: (p_id, p_value) => {
        if (p_id in _propCache) { if (_propCache[p_id] === p_value) { return p_value; } }
        env.app.body.style.setProperty(p_id, p_value);
        _propCache[p_id] = p_value;
        STYLE.Broadcast(p_id, p_value);
        return p_value;
    },

    ClearCache: () => { _propCache = {}; }

    //#endregion


}