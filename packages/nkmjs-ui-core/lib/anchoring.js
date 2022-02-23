'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core
 */
class ANCHORING {
    constructor() { }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
     static LEFT = { x: -0.5, y: 0 };

     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static RIGHT = { x: 0.5, y: 0 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static TOP = { x: 0, y: -0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static BOTTOM = { x: 0, y: 0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static TOP_LEFT = { x: -0.5, y: -0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static TOP_RIGHT = { x: 0.5, y: -0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static BOTTOM_LEFT = { x: -0.5, y: 0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static BOTTOM_RIGHT = { x: 0.5, y: 0.5 };
 
     /**
      * @description TODO
      * @type {object}
      * @customtag read-only
      * @group Placement
      */
     static CENTER = { x: 0, y: 0 };
 
     static anchoring = [
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

}

module.exports = ANCHORING;