'use strict'

module.exports = {

    ERROR: Object.freeze(`node-error`),
    WARNING: Object.freeze(`node-warning`),
    MESSAGE: Object.freeze(`node-message`),

    AU_CHECK_REQUEST: Object.freeze(`au-check-request`),
    AU_CHECK_REQUEST_HANDLED: Object.freeze(`au-check-request-handled`),
    AU_NO_SERVER: Object.freeze(`au-no-server`),
    AU_ATTEMPT_CHECK: Object.freeze(`au-attempt-check`),
    AU_CHECKING_FOR_UPDATE: Object.freeze(`au-checking-for-update`),
    AU_UPDATE_AVAILABLE: Object.freeze(`au-udpate-available`),
    AU_UPDATE_NOT_AVAILABLE: Object.freeze(`au-update-not-available`),
    AU_UPDATE_DOWNLOADED: Object.freeze(`au-update-downloaded`),

    NODE_MESSAGE: Object.freeze(`node-message`),
    NODE_ERROR: Object.freeze(`node-error`),
    NODE_WARNING: Object.freeze(`node-warning`),

    DO_RELOAD_APP: Object.freeze(`do-reload-app`),
    DO_OPEN_WINDOW: Object.freeze(`request-window-open`),
    DO_RELOAD_WINDOW: Object.freeze(`request-window-reload`),
    DO_CLOSE_WINDOW: Object.freeze(`request-window-close`),

    EXT_CLOSE_WINDOW: Object.freeze(`external-close-request`),

    DO_PRINT_WINDOW: Object.freeze(`request-window-print`),
    DO_OPEN_AND_PRINT_WINDOW: Object.freeze(`request-window-and-print`),

    CONTEXT_MENU_SHOW: Object.freeze(`show-context-menu`),
    CONTEXT_MENU_COMMAND: Object.freeze(`context-menu-command`),

    OPEN_FILE: Object.freeze(`open-file`),
    OPEN_DIALOG: Object.freeze(`open-dialog`),
    DIALOG_RESPONSE: Object.freeze(`dialog-response`),

}