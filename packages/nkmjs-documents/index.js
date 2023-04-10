'use strict';

const __DOCUMENTS = require(`./lib/documents-manager`);
const docs = require(`./lib/documents`);
const DocumentDefinition = require(`./lib/helpers/document-definition`);

module.exports = {

    IDS: require(`./lib/ids`),
    DOCUMENTS: __DOCUMENTS,
    CONTEXT: require(`./lib/context`),

    commands: require(`./lib/commands`),
    
    Document: require(`./lib/document`),
    DocumentEx: docs.DocumentEx,
    bound: docs.bound,
    unbound: docs.unbound,

    Get: __DOCUMENTS.Get.bind(__DOCUMENTS),
    HasUnsavedDocuments: __DOCUMENTS.HasUnsavedDocuments.bind(__DOCUMENTS),
    Find: __DOCUMENTS.FindDocument.bind(__DOCUMENTS),
    ToggleAutoSave: __DOCUMENTS.ToggleAutoSave.bind(__DOCUMENTS),
    
    RegisterDefinition: (p_docDefinition) => {
        let definition = new DocumentDefinition(this, p_docDefinition);
        __DOCUMENTS.instance._definitions.push(definition);
        return definition;
    },

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));