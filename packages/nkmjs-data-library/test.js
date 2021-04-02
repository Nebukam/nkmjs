'use strict';

const ecosystem = require(`./index`);
const fields = ecosystem.fields;

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

let anotherModel = newEcosystem.models.Create(
    "another model", null,
    {
        [fName_number]: fields.numbers.Float,
        [fName_vector]: fields.numbers.Float4,
        [fName_map]: {
            cl: fields.lists.Map,
            settings: {}
        }
    }
);

console.log(anotherModel);