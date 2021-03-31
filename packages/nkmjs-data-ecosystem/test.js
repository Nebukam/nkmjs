const ecosystem = require(`./index`);
const fields = ecosystem.fields;

// Create a new model from scratch
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

var newEcosystem = new ecosystem.Ecosystem();
//newEcosystem.models.