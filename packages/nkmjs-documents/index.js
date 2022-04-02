'use strict';

const __DOCUMENTS = require(`./lib/documents-manager`);

module.exports = {
    
    IDS: require(`./lib/ids`),
    DOCUMENTS: __DOCUMENTS,
    CONTEXT: require(`./lib/context`),

    commands: require(`./lib/commands`),

    Document: require(`./lib/document`),
    DocumentEx: require(`./lib/documents/document-ex`),
    MetaDocument: require(`./lib/documents/document-meta`),

    Get:__DOCUMENTS.Get.bind(__DOCUMENTS),
    HasUnsavedDocuments:__DOCUMENTS.HasUnsavedDocuments.bind(__DOCUMENTS),
    Find:__DOCUMENTS.FindDocument.bind(__DOCUMENTS)
    
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));