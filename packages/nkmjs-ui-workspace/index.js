'use strict';

module.exports = {

    SIGNAL: require(`./lib/signal`),

    Explorer: require(`./lib/explorer`),
    ExplorerTile: require(`./lib/explorer`),

    CTX: require(`./lib/context`),

    editors: require(`./lib/editors`),
    inspectors: require(`./lib/inspectors`),
    helpers: require(`./lib/helpers`),
        
    // Workspace

    Workspace: require(`./lib/workspace/workspace`),
    WorkspaceCellNav: require(`./lib/workspace/workspace-cell-nav`),
    WorkspaceCell: require(`./lib/workspace/workspace-cell`),
    WorkspaceRoot: require(`./lib/workspace/workspace-root`),
    
}