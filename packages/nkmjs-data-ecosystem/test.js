const ecosystem = require(`./index`);
const fields = ecosystem.fields;
// Create a new model
var newModel = ecosystem.DataModel.CreateModel(
    {
        aNumber: fields.numbers.Float,
        aVector: fields.numbers.Float4,
        aMap: {
            cl: fields.lists.Map,
            settings: {}
        }
    }
);

console.log(newModel);