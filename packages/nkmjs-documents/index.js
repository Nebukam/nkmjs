'use strict';

module.exports = {
    
    DOCUMENTS: require(`./lib/documents-manager`),
    CONTEXT: require(`./lib/context`),

    Document: require(`./lib/document`),
    MetaDocument: require(`./lib/documents/document-meta`)
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));