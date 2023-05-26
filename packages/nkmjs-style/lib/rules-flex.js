const RULES = require(`./rules`);

const FLEX = {};

const flexWrap = { 'flex-wrap': 'wrap' };
const flexNowrap = { 'flex-wrap': 'nowrap' };

const col = {
    default: {
        ...RULES.display.flex,
        'flex-direction': 'column',
        ...RULES.zeroMin.height
    },
    reverse: {
        ...RULES.display.flex,
        'flex-direction': 'column-reverse',
        ...RULES.zeroMin.height
    }

};

const row = {
    default: {
        ...RULES.display.flex,
        'flex-direction': 'row',
        ...RULES.zeroMin.heigwidthht
    },
    reverse: {
        ...RULES.display.flex,
        'flex-direction': 'row-reverse',
        ...RULES.zeroMin.width
    }
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

FLEX.row = { ...row.default, ...flexNowrap }
FLEX.rows = { ...row.default, ...flexWrap }
FLEX.rowReverse = { ...row.reverse, ...flexNowrap }
FLEX.rowsReverse = { ...row.reverse, ...flexWrap }

FLEX.column = { ...col.default, ...flexNowrap }
FLEX.columns = { ...col.default, ...flexWrap }
FLEX.columnReverse = { ...col.reverse, ...flexNowrap }
FLEX.columnsReverse = { ...col.reverse, ...flexWrap }

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
        center: { ...alignMainStart, ...alignCrossCenter },
        start: { ...alignCrossStart, ...alignMainStart },
        end: { ...alignCrossStart, ...alignMainEnd },
        spread: { ...alignCrossStart, 'justify-content': 'space-between' },
        stretch: { ...alignCrossStart, ...stretchMain }
    },
    end: {
        main: alignMainEnd,
        cross: alignCrossEnd,
        all: { ...alignMainEnd, ...alignCrossEnd },
        center: { ...alignMainEnd, ...alignCrossCenter },
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