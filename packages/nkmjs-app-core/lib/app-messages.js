'use strict'

class APP_MESSAGES{
    constructor(){}

    static ERROR = `node-error`;
    static WARNING = `node-warning`;
    static MESSAGE = `node-message`;

    static AU_CHECK_REQUEST = `au-check-request`;
    static AU_CHECK_REQUEST_HANDLED = `au-check-request-handled`;
    static AU_NO_SERVER = `au-no-server`;
    static AU_ATTEMPT_CHECK = `au-attempt-check`;
    static AU_CHECKING_FOR_UPDATE = `au-checking-for-update`;
    static AU_UPDATE_AVAILABLE = `au-udpate-available`;
    static AU_UPDATE_NOT_AVAILABLE = `au-update-not-available`;
    static AU_UPDATE_DOWNLOADED = `au-update-downloaded`;
 
    static NODE_MESSAGE = `node-message`;
    static NODE_ERROR = `node-error`;
    static NODE_WARNING = `node-warning`;

    static DO_RELOAD_APP = `do-reload-app`;
    static DO_OPEN_WINDOW = `request-window-open`;
    static DO_RELOAD_WINDOW = `request-window-reload`;
    static DO_CLOSE_WINDOW = `request-window-close`;

    static DO_PRINT_WINDOW = `request-window-print`;
    static DO_OPEN_AND_PRINT_WINDOW = `request-window-and-print`;

    static CONTEXT_MENU_SHOW = `show-context-menu`;
    static CONTEXT_MENU_COMMAND = `context-menu-command`;

    static OPEN_DIALOG = `open-dialog`;
    static DIALOG_RESPONSE = `dialog-response`;

}

module.exports = APP_MESSAGES;