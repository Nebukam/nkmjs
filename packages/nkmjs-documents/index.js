'use strict';

module.exports = {
    
    DOCUMENTS: require(`./lib/documents-manager`),
    Document: require(`./lib/document`),

    MetaDocument: require(`./lib/documents/document-meta`)
}

require(`@nkmjs/common`).BINDINGS.Expand(require(`./bindings`));