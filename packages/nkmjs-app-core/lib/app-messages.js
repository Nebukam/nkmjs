'use strict'

class APP_MESSAGES{
    constructor(){}

    static ERROR = Object.freeze(`node-error`);
    static WARNING = Object.freeze(`node-warning`);
    static MESSAGE = Object.freeze(`node-message`);

    static AU_CHECK_REQUEST = Object.freeze(`au-check-request`);
    static AU_CHECK_REQUEST_HANDLED = Object.freeze(`au-check-request-handled`);
    static AU_NO_SERVER = Object.freeze(`au-no-server`);
    static AU_ATTEMPT_CHECK = Object.freeze(`au-attempt-check`);
    static AU_CHECKING_FOR_UPDATE = Object.freeze(`au-checking-for-update`);
    static AU_UPDATE_AVAILABLE = Object.freeze(`au-udpate-available`);
    static AU_UPDATE_NOT_AVAILABLE = Object.freeze(`au-update-not-available`);
    static AU_UPDATE_DOWNLOADED = Object.freeze(`au-update-downloaded`);
 
    static NODE_MESSAGE = Object.freeze(`node-message`);
    static NODE_ERROR = Object.freeze(`node-error`);
    static NODE_WARNING = Object.freeze(`node-warning`);

    static DO_RELOAD_APP = Object.freeze(`do-reload-app`);
    static DO_OPEN_WINDOW = Object.freeze(`request-window-open`);
    static DO_RELOAD_WINDOW = Object.freeze(`request-window-reload`);
    static DO_CLOSE_WINDOW = Object.freeze(`request-window-close`);

    static EXT_CLOSE_WINDOW = Object.freeze(`external-close-request`);

    static DO_PRINT_WINDOW = Object.freeze(`request-window-print`);
    static DO_OPEN_AND_PRINT_WINDOW = Object.freeze(`request-window-and-print`);

    static CONTEXT_MENU_SHOW = Object.freeze(`show-context-menu`);
    static CONTEXT_MENU_COMMAND = Object.freeze(`context-menu-command`);

    static OPEN_FILE = Object.freeze(`open-file`);
    static OPEN_DIALOG = Object.freeze(`open-dialog`);
    static DIALOG_RESPONSE = Object.freeze(`dialog-response`);

}

module.exports = APP_MESSAGES;