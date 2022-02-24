'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core
 */
class SIGNAL {
  constructor() { }

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static ENABLED = Symbol(`enabled`);

  /**
   * @description TODO
   * @type {symbol}
   * @customtag read-only
   */
  static DISABLED = Symbol(`disabled`);

  /**
  * @description TODO
  * @type {symbol}
  * @customtag read-only
  */
  static PASSED = Symbol(`pass`);

  /**
 * @description TODO
 * @type {symbol}
 * @customtag read-only
 */
  static REJECTED = Symbol(`rejected`);

}

module.exports = SIGNAL;