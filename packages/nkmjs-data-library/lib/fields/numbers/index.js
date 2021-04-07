'use strict';

module.exports = {

    Number: require(`./field-number`),
    NumberClamped: require(`./field-number-clamped`),

    Byte: require(`./field-byte`),

    Float: require(`./field-float`),
    Float2: require(`./field-float2`),
    Float3: require(`./field-float3`),
    Float4: require(`./field-float4`),

    Int: require(`./field-int`),
    Int2: require(`./field-int2`),
    Int3: require(`./field-int3`),
    Int4: require(`./field-int4`),

    UInt: require(`./field-uint`),

    Color: require(`./field-color`),

}