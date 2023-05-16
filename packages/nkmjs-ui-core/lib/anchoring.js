'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
const ANCHORING = {};

/**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
ANCHORING.LEFT = { x: -0.5, y: 0 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.RIGHT = { x: 0.5, y: 0 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.TOP = { x: 0, y: -0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.BOTTOM = { x: 0, y: 0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.TOP_LEFT = { x: -0.5, y: -0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.TOP_RIGHT = { x: 0.5, y: -0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.BOTTOM_LEFT = { x: -0.5, y: 0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.BOTTOM_RIGHT = { x: 0.5, y: 0.5 };

/**
 * @description TODO
 * @type {object}
 * @customtag read-only
 * @group Placement
 */
ANCHORING.CENTER = { x: 0, y: 0 };

ANCHORING.anchoring = [
    this.LEFT,
    this.RIGHT,
    this.TOP,
    this.BOTTOM,
    this.TOP_LEFT,
    this.TOP_RIGHT,
    this.BOTTOM_LEFT,
    this.BOTTOM_RIGHT,
    this.CENTER
];

module.exports = ANCHORING;