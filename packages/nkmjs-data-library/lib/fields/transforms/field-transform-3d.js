'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;

const numbers = require(`../numbers`);
const FieldTransform2D = require("./field-transform-2d");

/**
 * @class
 * @augments ecosystem.fields.FieldTransform2D
 * @memberof ecosystem.fields.transforms
 */
class FieldTransform3D extends FieldTransform2D {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-transform-3d`,
        [com.IDS.ICON]: `field-transform-3d`
    };

    static __positionDescriptorClass = numbers.Float3;
    static __rotationDescriptorClass = numbers.Float3;
    static __scaleDescriptorClass = numbers.Float3;

}

module.exports = FieldTransform3D;
