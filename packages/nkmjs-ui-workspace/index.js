'use strict';

module.exports = {

    
    CONTROL_SIGNAL: require(`./lib/control-signal`),
    Control: require(`./lib/control`),
    ControlGroup: require(`./lib/control-group`),

    Shell: require(`./lib/shell`),

    Explorer: require(`./lib/explorer`),

    WORKSPACE_CONTEXT: require(`./lib/workspace-context`),

    // Dialogs

    DialogBox: require(`./lib/dialogs/dialog-box`),
    DialogInput: require(`./lib/dialogs/dialog-input`),
    DialogLayer: require(`./lib/dialogs/dialog-layer`),
    DialogHandler: require(`./lib/dialogs/dialog-handler`),

    // Drawers

    // Editors

    Editor: require(`./lib/editor`),
        EditorEx: require(`./lib/editors/editor-ex`),
        EditorSlate: require(`./lib/editors/editor-slate`),
        EditorDrawerNav: require(`./lib/editors/editor-drawer-nav`),
        EditorDrawer: require(`./lib/editors/editor-drawer`),

    // Helpers

    Group: require(`./lib/helpers/group`),

    // Inspectors

    Inspector: require(`./lib/inspector`),
        InspectorGroup: require(`./lib/inspectors/inspector-group`),
        InspectorItem: require(`./lib/inspectors/inspector-item`),
        InspectorShell: require(`./lib/inspectors/inspector-shell`),
        MetaControlGroup: require(`./lib/inspectors/meta-control-group`),
        MetaControlItem: require(`./lib/inspectors/meta-control-item`),
        HistoryInspectorShell: require(`./lib/inspectors/history-inspector-shell`),

    // Templates

    // Items

    Tab: require(`./lib/items/tab`),
    StatusBar: require(`./lib/items/status-bar`),
    Tag: require(`./lib/items/tag`),    
    Breadcrumb: require(`./lib/items/breadcrumb`),
    BreadcrumbItem: require(`./lib/items/breadcrumb-item`),
        
    // Workspace

    Workspace: require(`./lib/workspace/workspace`),
    WorkspaceCellNav: require(`./lib/workspace/workspace-cell-nav`),
    WorkspaceCell: require(`./lib/workspace/workspace-cell`),
    WorkspaceRoot: require(`./lib/workspace/workspace-root`),
    
}