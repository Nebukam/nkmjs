'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;

const numbers = require(`../numbers`);
const FieldTransform = require("./field-transform");

/**
 * @class
 * @augments ecosystem.fields.FieldTransform
 * @memberof ecosystem.fields.transforms
 */
class FieldTransform2D extends FieldTransform {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-transform-2d`,
        [com.IDS.ICON]: `field-transform-2d`
    };

    static __positionDescriptorClass = numbers.Float2;
    static __rotationDescriptorClass = numbers.Float2;
    static __scaleDescriptorClass = numbers.Float2;

}

module.exports = FieldTransform2D;
