const RULES = {};

const zeroMinHeight = { 'min-height': '0' };
const zeroMinWidth = { 'min-width': '0' };
const zeroMinSize = { ...zeroMinHeight, ...zeroMinWidth };

RULES.pos = {
    abs: { position: `absolute` },
    rel: { position: `relative` },
    sticky: { position: `sticky` },
}

RULES.display = {
    none: { display: 'none' },
    hidden: { display: 'hidden' },
    flex: { display: 'flex' },
    grid: { display: 'grid' },
}

RULES.fill = {
    both: { width: '100%', height: '100%' },
    width: { width: '100%' },
    height: { height: '100%' },
}

RULES.absolute = {
    fill: { ...RULES.pos.abs, top: `0`, left: `0`, ...RULES.fill.both, },

    topLeft: { ...RULES.pos.abs, top: '0', left: '0' },
    top: { ...RULES.pos.abs, top: '0', left: '50%', transform: 'translate(-50%, 0)' },
    topRight: { ...RULES.pos.abs, top: '0', right: '0' },

    left: { ...RULES.pos.abs, top: '50%', left: '0', transform: 'translate(0, -50%)' },
    center: { ...RULES.pos.abs, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    right: { ...RULES.pos.abs, top: '50%', right: '0', transform: 'translate(0, -50%)' },

    bottom: { ...RULES.pos.abs, bottom: '0', left: '50%', transform: 'translate(-50%, 0)' },
    bottomLeft: { ...RULES.pos.abs, bottom: '0', left: '0' },
    bottomRight: { ...RULES.pos.abs, bottom: '0', right: '0' },
};

RULES.tape = {
    bottom: { ...RULES.pos.abs, bottom: '0', left: '0', width: '100%' },
    top: { ...RULES.pos.abs, top: '0', left: '0', width: '100%' },
    left: { ...RULES.pos.abs, top: '0', left: '0', height: '100%' },
    right: { ...RULES.pos.abs, top: '0', right: '0', height: '100%' }
}

RULES.fadeIn = {
    opacity: `0`
};

RULES.layer = {
    ...RULES.absolute.fill,
    'box-sizing': `border-box`
};

const covcenter = {
    'background-size': `cover`,
    'background-position': `center`,
}

RULES.cover = {
    default: {
        ...covcenter,
    },
    fill: {
        ...RULES.absolute.fill,
        ...covcenter,
        'object-fit': 'cover',
    }
};

RULES.sticky = {
    top: {
        ...RULES.pos.sticky,
        top: 0,
        'z-index': 10,
    },
    bottom: {
        ...RULES.pos.sticky,
        bottom: 0,
        'z-index': 10,
    }
};

RULES.bgBlur = {
    small: { 'backdrop-filter': 'blur(10px)' },
};

RULES.invisibleFill = {
    ...RULES.absolute.fill,
    'box-sizing': `border-box`,
    opacity: '0 !important'
};

RULES.dropShadow = {
    small: {
        'filter': `drop-shadow(0px 5px 5px rgba(0,0,0,0.2))`,
    },
}

//#region Flex presets
const flexFill = { flex: '1 1 auto', 'min-width': '0', 'min-height': '0' };
const flexShrink = { flex: '0 1 auto', 'min-width': '0', 'min-height': '0' };
const flexGrow = { flex: '1 0 auto' };
const flexFixed = { flex: '0 0 auto' };

const flexWrap = { 'flex-wrap': 'wrap' };
const flexNowrap = { 'flex-wrap': 'nowrap' };

const col = { ...RULES.display.flex, 'flex-direction': 'column', ...zeroMinHeight };
const row = { ...RULES.display.flex, 'flex-direction': 'row', ...zeroMinWidth };
const wrapperStretchAll = { 'justify-content': `stretch`, 'align-items': `stretch` };
const wrapperCenterAll = { 'justify-content': `center`, 'align-items': `center`, 'align-content': `center` };

RULES.flex = {
    column: {
        wrap: { ...col, ...flexWrap },
        nowrap: { ...col, ...flexNowrap },

        inlineWrap: { ...col, ...flexWrap, 'align-items': 'center' },
        inlineNowrap: { ...col, ...flexNowrap, 'align-items': 'center' },

        centerWrap: { ...col, ...flexWrap, 'align-items': 'center', 'justify-content': 'center' },
        centerNowrap: { ...col, ...flexNowrap, 'align-items': 'center', 'justify-content': 'center' },

        distributeWrap: { ...col, ...flexWrap, 'align-items': 'center', 'justify-content': 'space-between' },
        distributeNowrap: { ...col, ...flexNowrap, 'align-items': 'center', 'justify-content': 'space-between' },

        stretchWrap: { ...col, ...flexWrap, ...wrapperStretchAll },
        stretchNowrap: { ...col, ...flexNowrap, ...wrapperStretchAll },
    },
    row: {

        wrap: { ...row, ...flexWrap },
        nowrap: { ...row, ...flexNowrap },

        inlineWrap: { ...row, ...flexWrap, 'align-items': 'center' },
        inlineNowrap: { ...row, ...flexNowrap, 'align-items': 'center' },

        centerWrap: { ...row, ...flexWrap, 'align-items': 'center', 'justify-content': 'center' },
        centerNowrap: { ...row, ...flexNowrap, 'align-items': 'center', 'justify-content': 'center' },

        distributeWrap: { ...row, ...flexWrap, 'align-items': 'center', 'justify-content': 'space-between' },
        distributeNowrap: { ...row, ...flexNowrap, 'align-items': 'center', 'justify-content': 'space-between' },

        stretchWrap: { ...row, ...flexWrap, ...wrapperStretchAll },
        stretchNowrap: { ...row, ...flexNowrap, ...wrapperStretchAll },


    },
    stretch: {
        ...RULES.display.flex,
        ...zeroMinSize,
        ...wrapperStretchAll
    },
    center: {
        ...RULES.display.flex,
        ...zeroMinSize,
        ...wrapperCenterAll
    },
    stretch: {
        ...RULES.display.flex,
        'align-content': 'stretch',
        'align-items': 'stretch',
        ...zeroMinSize,
    },

    alignContent: {
        center: { 'align-items': 'center' }
    },
    alignSelf: {

    }
}

RULES.item = {
    fixed: { ...flexFixed },
    fill: { ...flexFill },
    shrink: { ...flexShrink },
    grow: { ...flexGrow },
}

RULES.gap = {
    small: { gap: '8px 8px' }
}

RULES.grid = {
    stretch: {
        ...RULES.display.grid,
        ...wrapperStretchAll
    },
    center: {
        ...RULES.display.grid,
        ...wrapperCenterAll
    }
}

RULES.presets = {
    stickyHeader: {
        ...RULES.sticky.top,
        ...RULES.fill.width,
    },
    stickyFooter: {
        ...RULES.sticky.top,
        ...RULES.fill.width,
    }
}

//#endregion

module.exports = RULES;