'use strict';

module.exports = {
    
    DOCUMENTS: require(`./lib/documents-manager`),
    CONTEXT: require(`./lib/context`),

    Document: require(`./lib/document`),
    DocumentEx: require(`./lib/documents/document-ex`),
    MetaDocument: require(`./lib/documents/document-meta`)
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));