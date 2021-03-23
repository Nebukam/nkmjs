'use strict';

module.exports = {

    SIGNAL: require(`./lib/signal`),

    Shell: require(`./lib/shell`),
    Explorer: require(`./lib/explorer`),
    ExplorerTile: require(`./lib/explorer`),

    CONTEXT: require(`./lib/context`),

    controls: require(`./lib/controls`),
    editors: require(`./lib/editors`),
    inspectors: require(`./lib/inspectors`),
    helpers: require(`./lib/helpers`),
        
    // Workspace

    Workspace: require(`./lib/workspace/workspace`),
    WorkspaceCellNav: require(`./lib/workspace/workspace-cell-nav`),
    WorkspaceCell: require(`./lib/workspace/workspace-cell`),
    WorkspaceRoot: require(`./lib/workspace/workspace-root`),
    
}