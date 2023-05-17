'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const data = nkm.data;

const FieldDescriptorComposite = require(`../field-descriptor-composite`);

const __positionID = data.ID.New(`position`);
const __rotationID = data.ID.New(`rotation`);
const __scaleID = data.ID.New(`scale`);

/**
 * @class
 * @augments ecosystem.fields.FieldDescriptorComposite
 * @memberof ecosystem.fields.transforms
 */
class FieldTransform extends FieldDescriptorComposite {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-transform`,
        [com.IDS.ICON]: `field-transform`
    };

    static __positionDescriptorClass = null;
    static __rotationDescriptorClass = null;
    static __scaleDescriptorClass = null;

    _Init() {
        super._Init();
        this._position = this._Add(this.constructor.__positionDescriptorClass, __positionID);
        this._rotation = this._Add(this.constructor.__rotationDescriptorClass, __rotationID);
        this._scale = this._Add(this.constructor.__scaleDescriptorClass, __scaleID);
    }

    InitSettings(p_settings) {
        let localSettings = super.InitSettings(p_settings);
        localSettings.maxSize = (localSettings.maxSize || -1);
        return localSettings;
    }

}

module.exports = FieldTransform;
