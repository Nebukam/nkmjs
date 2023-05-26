const RULES = require(`./rules`);

const FLEX_ITEM = {};

const flexFillFull = { flex: '1 1 100%', ...RULES.zeroMin.all };
const flexFill = { flex: '1 1 auto', ...RULES.zeroMin.all };
const flexShrink = { flex: '0 1 auto', ...RULES.zeroMin.all };
const flexGrow = { flex: '1 0 auto' };
const flexFixed = { flex: '0 0 auto' };

FLEX_ITEM.fixed = { ...flexFixed };
FLEX_ITEM.fixedAbs = function (p_val) { return { ...flexFixed, flex: `0 0 ${p_val}px` } };
FLEX_ITEM.fixedRel = function (p_val) { return { ...flexFixed, flex: `0 0 ${p_val}%` } };

FLEX_ITEM.fill = { ...flexFill };
FLEX_ITEM.fillAbs = function (p_val) { return { ...flexFill, flex: `1 1 ${p_val}%` } };
FLEX_ITEM.fillRel = function (p_val) { return { ...flexFill, flex: `1 1 ${p_val}%` } };

FLEX_ITEM.shrink = { ...flexShrink };
FLEX_ITEM.shrinkAbs = function (p_val) { return { ...flexShrink, flex: `0 1 ${p_val}px` } };
FLEX_ITEM.shrinkRel = function (p_val) { return { ...flexShrink, flex: `0 1 ${p_val}%` } };

FLEX_ITEM.grow = { ...flexGrow };
FLEX_ITEM.growAbs = function (p_val) { return { ...flexGrow, flex: `1 0 ${p_val}px` } };
FLEX_ITEM.growRel = function (p_val) { return { ...flexGrow, flex: `1 0 ${p_val}%` } };

const itemFull = { 'flex': '1 1 100%', };
const itemLarge = { 'flex': '1 1 70%', };
const itemMedium = { 'flex': '1 1 40%', };
const itemSmall = { 'flex': '1 1 20%', };
const itemXSmall = { 'flex': '1 1 10%', };

FLEX_ITEM.items = {

    defaults: function (p_prefix) {
        return {
            '.item': { ...itemFull },
            '.full': { ...itemFull },
            '.large': { ...itemLarge },
            '.medium': { ...itemMedium },
            '.small': { ...itemSmall },
            '.xsmall': { ...itemXSmall },
            '.fixed': { 'flex-grow': '0', 'flex-shrink': '0' },
        }
    },

    prefix: function (p_prefix) {
        return {
            [`${p_prefix} .item`]: { ...itemFull },
            [`${p_prefix} .full`]: { ...itemFull },
            [`${p_prefix} .large`]: { ...itemLarge },
            [`${p_prefix} .medium`]: { ...itemMedium },
            [`${p_prefix} .small`]: { ...itemSmall },
            [`${p_prefix} .xsmall`]: { ...itemXSmall },
            [`${p_prefix} .fixed`]: { 'flex-grow': '0', 'flex-shrink': '0' },
        }
    }
}

module.exports = FLEX_ITEM;