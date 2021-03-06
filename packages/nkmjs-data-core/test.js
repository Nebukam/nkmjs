const assert = require('assert');

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const { Catalog } = require(`./lib/catalog`);
const { DataBlock } = require('./lib/data');

let someData = com.Rent(DataBlock);
someData.Release();
let newData = com.Rent(DataBlock);
assert.ok(someData === newData);
someData = newData;

let catalogName = `Test Catalog`;
let catalog = Catalog.CreateFrom({
    [com.IDS.NAME]: catalogName,
    [com.IDS.ICON]: `%ICONS%/some_icon.svg`,
    [com.IDS.CMD_PRIMARY]: null,
    [com.IDS.CMD_SECONDARY]: null,
    [com.IDS.CMD_LIST]: null
});

assert.ok(!u.tils.isVoid(catalog));
assert.ok(catalog.GetOption(com.IDS.NAME) === catalogName);

let itemName = `Test Item`;
let cItem = catalog.Register({
    [com.IDS.NAME]: itemName
});

assert.ok(!u.tils.isVoid(cItem));
assert.ok(cItem.GetOption(com.IDS.NAME) === itemName);
assert.ok(catalog.At(0) === cItem);
assert.ok(u.tils.isVoid(catalog.Add(cItem)));
//assert.ok(catalog.Resolve(`Test Item`) === cItem); //Not implemented  yet

cItem.Release();
assert.ok(catalog.count === 0);


// ----> SERIALIZER

const { JSONSerializer } = require('./lib/serialization');
const Bindings = require(`./bindings`);

new Bindings().Deploy(); // <- this make serialization work.

// Set a bunch of metadata properties
let metas = {
    propA: 42,
    propB: `A String`
}
for (let n in metas) { someData.metadata.Set(n, metas[n]); }

let serial = JSONSerializer.Serialize(someData);
let deserialized = JSONSerializer.Deserialize(serial);

assert(deserialized != someData); // Not the same data
assert(u.tils.isInstanceOf(deserialized, someData)); // Same object type (apparently)
for (let n in metas) { assert(deserialized.metadata.Get(n) === metas[n]); } // Meta have been copied correctly

let changedValue = 12654684;
deserialized.metadata.Set(`propA`, changedValue);
serial = JSONSerializer.Serialize(deserialized);

JSONSerializer.Deserialize(serial, someData);
assert(someData.metadata.Get(`propA`) === changedValue);

