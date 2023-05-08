'use strict';

const DOC_MANAGER = require(`./lib/documents-manager`);
const docs = require(`./lib/documents`);
const DocumentDefinition = require(`./lib/helpers/document-definition`);

module.exports = {

    IDS: require(`./lib/ids`),
    DOCUMENTS: DOC_MANAGER,
    CONTEXT: require(`./lib/context`),

    commands: require(`./lib/commands`),
    
    Document: require(`./lib/document`),
    DocumentEx: docs.DocumentEx,
    bound: docs.bound,
    unbound: docs.unbound,

    Get: DOC_MANAGER.Get.bind(DOC_MANAGER),
    HasUnsavedDocuments: DOC_MANAGER.HasUnsavedDocuments.bind(DOC_MANAGER),
    Find: DOC_MANAGER.FindDocument.bind(DOC_MANAGER),
    ToggleAutoSave: DOC_MANAGER.ToggleAutoSave.bind(DOC_MANAGER),
    
    RegisterDefinition: (p_docDefinition) => {
        let definition = new DocumentDefinition(this, p_docDefinition);
        DOC_MANAGER._definitions.push(definition);
        return definition;
    },

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));