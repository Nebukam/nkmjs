'use strict';

const assert = require('assert');

const ecosystem = require(`./index`);
const fields = ecosystem.fields;
const data = require(`@nkmjs/data-core`);

let fName_number = `A Number`,
    fName_vector = `A Vector`,
    fName_map = `A Map`;

// Create a new model from scratch
var newModel = ecosystem.utils.CreateModel(
    {
        [fName_number]: fields.numbers.Float,
        [fName_vector]: fields.numbers.Float4,
        [fName_map]: {
            cl: fields.lists.Map,
            settings: {}
        }
    }
);

//console.log(newModel);
let mapField = newModel.GetFieldByName(fName_map);
//console.log(mapField);
//console.log(mapField.settings);
var newEcosystem = new ecosystem.Ecosystem();

let
    anotherModel = newEcosystem.models.Create(
        "another model", null,
        {
            [fName_number]: fields.numbers.Float,
            [fName_vector]: fields.numbers.Float4,
            [fName_map]: {
                cl: fields.lists.Map,
                settings: {}
            }
        }
    ),
    thirdModel = newEcosystem.models.Create(
        "third model", null,
        {
            [fName_vector]: fields.numbers.Float4,
            [fName_map]: {
                cl: fields.lists.Map,
                settings: {}
            }
        }
    );

assert.ok((newEcosystem.models._factory._itemRep._itemList.IndexOf(anotherModel) === 0), `First model is not at index 0.`);
anotherModel.base = thirdModel;
assert.ok((newEcosystem.models._factory._itemRep._itemList.IndexOf(anotherModel) === 1), `Extending model has not moved after its base in the list.`);

let entry = newEcosystem.entries.Create(`My sexy entry`, anotherModel),
    serializedEntry = data.serialization.JSONSerializer.Serialize(entry, { ecosystem: entry.ecosystem });

console.log(serializedEntry);