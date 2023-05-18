'use strict';

const assert = require('assert');

const ecosystem = require(`./index`);
const fields = ecosystem.fields;
const data = require(`@nkmjs/data-core`);

let fName_number = `A Number`,
    fName_vector = `A Vector`,
    fName_transform = `A 3D Transform`,
    fName_map = `A Map`;

// Create a new model from scratch
var newModel = ecosystem.utils.CreateModel(
    {
        [fName_number]: fields.numbers.Float,
        [fName_vector]: fields.numbers.Float4,
        [fName_transform]: fields.transforms.Transform3D,
        [fName_map]: {
            cl: fields.lists.Map,
            settings: {}
        }
    }
);

//console.log(newModel);
let mapField = newModel.GetSlotByName(fName_transform);
//console.log(mapField);
//console.log(mapField.settings);
var newEcosystem = new ecosystem.EcosystemBundle();

let
    anotherModel = newEcosystem.models.Create(
        "another model", null,
        {
            [fName_number]: fields.numbers.Float,
            [fName_vector]: fields.numbers.Float4,
            [fName_transform]: fields.transforms.Transform3D,
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
            [fName_transform]: fields.transforms.Transform3D,
            [fName_map]: {
                cl: fields.lists.Map,
                settings: {}
            }
        }
    );

assert.ok((newEcosystem.models._factory._itemRep._itemList.IndexOf(anotherModel) === 0), `First model is not at index 0.`);
anotherModel.base = thirdModel;
assert.ok((newEcosystem.models._factory._itemRep._itemList.IndexOf(anotherModel) === 1), `Extending model has not moved after its base in the list.`);

console.log(thirdModel.GetSlotByName(fName_map).descriptor);

let SJSON = data.s11n.JSONSerializer;

let entry = newEcosystem.entries.Create(`My sexy entry`, anotherModel),
    serializedModel = SJSON.Serialize(anotherModel),
    serializedEntry = SJSON.Serialize(entry),
    serializedEcosystem = SJSON.Serialize(newEcosystem);

//console.log(JSON.stringify(serializedEcosystem, null, 4));
//console.log(serializedEntry);
//console.log(serializedEcosystem);

let deserializedEcosystem = SJSON.Deserialize(serializedEcosystem),
    reserializedEcosystem = SJSON.Serialize(deserializedEcosystem);
  
    
//console.log(deserializedEcosystem);
//console.log(JSON.stringify(reserializedEcosystem, null, 4));