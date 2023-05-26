const RULES = require(`./rules`);

const GRID = {};

const wrapperStretchAll = {
    'justify-content': `stretch`,
    'align-items': `stretch`
};

const wrapperCenterAll = {
    'justify-content': `center`,
    'align-items': `center`,
    'align-content': `center`
};

GRID.stretch = {
    ...RULES.display.grid,
    ...wrapperStretchAll
};

GRID.center = {
    ...RULES.display.grid,
    ...wrapperCenterAll
}

//#endregion

module.exports = GRID;