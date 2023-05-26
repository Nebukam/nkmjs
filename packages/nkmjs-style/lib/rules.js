const RULES = {};

const zeroMinHeight = { 'min-height': '0' };
const zeroMinWidth = { 'min-width': '0' };
const zeroMinSize = { ...zeroMinHeight, ...zeroMinWidth };

RULES.zeroMin = {
    width: { ...zeroMinWidth },
    height: { ...zeroMinHeight },
    all: { ...zeroMinSize },
}

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

RULES.gap = {
    small: { gap: '8px 8px' }
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