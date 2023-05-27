const RULES = require(`./rules`);
const GRID = require(`./rules-grid`);
const TPLS = {};

const wrapperStretchAll = {
    'justify-content': `stretch`,
    'align-items': `stretch`
};

const wrapperCenterAll = {
    'justify-content': `center`,
    'align-items': `center`,
    'align-content': `center`
};

TPLS.stretch = {
    ...RULES.display.grid,
    ...wrapperStretchAll
};

TPLS.center = {
    ...RULES.display.grid,
    ...wrapperCenterAll
}

TPLS.areas = {
    header: {
        'grid-area': `header`
    },
    body: {
        'grid-area': `body`,
        ...RULES.zeroMin.all,
    },
    footer: {
        'grid-area': `footer`
    },
    nav: {
        'grid-area': `nav`
    },
}

TPLS.classic = {
    base:{
        ...RULES.display.grid,
        'justify-items': `stretch`,
        'justify-content': `stretch`,
    },
    left:{
        'grid-template-areas': `"header header" "nav body" "footer footer"`,
        'grid-template-columns': `auto auto`,
        'grid-template-rows': ` max-content auto  max-content`,
    },
    right:{
        'grid-template-areas': `"header header" "body nav" "footer footer"`,
        'grid-template-columns': `auto auto`,
        'grid-template-rows': ` max-content auto max-content`,
    },
}

TPLS.tabs = {
    base:{
        ...RULES.display.grid,
        'justify-items': `stretch`,
        'justify-content': `stretch`,
    },
    top: {
        'grid-template-areas': `"nav" "body"`,
        'grid-template-columns': `auto`,
        'grid-template-rows': `max-content auto`,
        
    },
    bottom: {
        'grid-template-areas': `"body" "nav"`,
        'grid-template-columns': `auto`,
        'grid-template-rows': `auto max-content`,
    },
    left: {
        'grid-template-areas': `"nav body"`,
        'grid-template-columns': `max-content auto`,
        'grid-template-rows': `auto`,
    },
    right: {
        'grid-template-areas': `"body nav"`,
        'grid-template-columns': `auto max-content`,
        'grid-template-rows': `auto`,
    },
}

TPLS.sandwich = {
    base:{
        ...RULES.display.grid,
        'justify-items': `stretch`,
        'justify-content': `stretch`,
    },
    vertical: {
        'grid-template-areas': `"header" "body" "footer"`,
        'grid-template-columns': `auto`,
        'grid-template-rows': `max-content auto max-content`,
        
    },
    horizontal: {
        'grid-template-areas': `"header body footer"`,
        'grid-template-columns': `max-content auto max-content`,
        'grid-template-rows': `auto`,
    },
}

//#endregion

module.exports = TPLS;