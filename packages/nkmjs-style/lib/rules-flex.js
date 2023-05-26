const RULES = require(`./rules`);

const FLEX = {};

const flexWrap = { 'flex-wrap': 'wrap' };
const flexNowrap = { 'flex-wrap': 'nowrap' };

const col = {
    ...RULES.display.flex,
    'flex-direction': 'column',
    ...RULES.zeroMin.height
};

const row = {
    ...RULES.display.flex,
    'flex-direction': 'row',
    ...RULES.zeroMin.width
};

const wrapperStretchAll = {
    'justify-content': `stretch`,
    'align-items': `stretch`
};

const wrapperCenterAll = {
    'justify-content': `center`,
    'align-items': `center`,
    'align-content': `center`
};

FLEX.column = {

    wrap: { ...col, ...flexWrap },
    nowrap: { ...col, ...flexNowrap },

    inlineWrap: {
        ...col, ...flexWrap,
        'align-items': 'center'
    },
    inlineNowrap: {
        ...col, ...flexNowrap,
        'align-items': 'center'
    },

    centerWrap: {
        ...col, ...flexWrap,
        'align-items': 'center', 'justify-content': 'center'
    },
    centerNowrap: {
        ...col, ...flexNowrap,
        'align-items': 'center', 'justify-content': 'center'
    },

    distributeWrap: {
        ...col, ...flexWrap,
        'align-items': 'center', 'justify-content': 'space-between'
    },
    distributeNowrap: {
        ...col, ...flexNowrap,
        'align-items': 'center', 'justify-content': 'space-between'
    },

    stretchWrap: {
        ...col, ...flexWrap,
        ...wrapperStretchAll
    },
    stretchNowrap: {
        ...col, ...flexNowrap,
        ...wrapperStretchAll
    },

};

FLEX.row = {

    wrap: { ...row, ...flexWrap },
    nowrap: { ...row, ...flexNowrap },

    inlineWrap: {
        ...row, ...flexWrap,
        'align-items': 'center'
    },
    inlineNowrap: {
        ...row, ...flexNowrap,
        'align-items': 'center'
    },

    centerWrap: {
        ...row, ...flexWrap,
        'align-items': 'center',
        'justify-content': 'center'
    },
    centerNowrap: {
        ...row, ...flexNowrap,
        'align-items': 'center',
        'justify-content': 'center'
    },

    distributeWrap: {
        ...row, ...flexWrap,
        'align-items': 'center',
        'justify-content': 'space-between'
    },
    distributeNowrap: {
        ...row, ...flexNowrap,
        'align-items': 'center',
        'justify-content': 'space-between'
    },

    stretchWrap: { ...row, ...flexWrap, ...wrapperStretchAll },
    stretchNowrap: { ...row, ...flexNowrap, ...wrapperStretchAll },


};

const alignMainCenter = { ...RULES.display.flex, ...RULES.zeroMin.all, 'justify-content': 'center' }
const alignCrossCenter = { ...RULES.display.flex, ...RULES.zeroMin.all, 'align-items': 'center' }

const alignMainStart = { ...RULES.display.flex, ...RULES.zeroMin.all, 'justify-content': 'flex-start' }
const alignCrossStart = { ...RULES.display.flex, ...RULES.zeroMin.all, 'align-items': 'flex-start' }

const alignMainEnd = { ...RULES.display.flex, ...RULES.zeroMin.all, 'justify-content': 'flex-end' }
const alignCrossEnd = { ...RULES.display.flex, ...RULES.zeroMin.all, 'align-items': 'flex-end' }

const stretchMain = { ...RULES.display.flex, ...RULES.zeroMin.all, 'justify-content': 'stretch' }
const stretchCross = { ...RULES.display.flex, ...RULES.zeroMin.all, 'align-items': 'stretch' }

FLEX.align = {
    center: {
        main: alignMainCenter,
        cross: alignCrossCenter,
        all: { ...alignMainCenter, ...alignCrossCenter },
        start: { ...alignCrossCenter, ...alignMainStart },
        end: { ...alignCrossCenter, ...alignMainEnd },
        spread: { ...alignCrossCenter, 'justify-content': 'space-between' },
        stretch: { ...alignCrossCenter, ...stretchMain }
    },
    start: {
        main: alignMainStart,
        cross: alignCrossStart,
        all: { ...alignMainStart, ...alignCrossStart },
        start: { ...alignCrossStart, ...alignMainStart },
        end: { ...alignCrossStart, ...alignMainEnd },
        spread: { ...alignCrossStart, 'justify-content': 'space-between' },
        stretch: { ...alignCrossStart, ...stretchMain }
    },
    end: {
        main: alignMainEnd,
        cross: alignCrossEnd,
        all: { ...alignMainEnd, ...alignCrossEnd },
        start: { ...alignCrossEnd, ...alignMainStart },
        end: { ...alignCrossEnd, ...alignMainEnd },
        spread: { ...alignCrossStart, 'justify-content': 'space-between' },
        stretch: { ...alignCrossStart, ...stretchMain }
    },
}

FLEX.stretch = {
    ...RULES.display.flex,
    ...RULES.zeroMin.all,
    ...wrapperStretchAll
};

FLEX.center = {
    ...RULES.display.flex,
    ...RULES.zeroMin.all,
    ...wrapperCenterAll
};

FLEX.stretch = { ...stretchMain, ...stretchCross };

FLEX.alignSelf = {

};


module.exports = FLEX;