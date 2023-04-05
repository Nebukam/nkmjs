'use strict';

module.exports = {
    
    OpenAppSettings: new (require(`./cmd-open-app-settings`))(), 

    CmdOpenSystemDialogFile: require(`./cmd-system-dialog-file`),
    CmdOpenSystemDialogDirectory: require(`./cmd-system-dialog-directory`),

    CmdOpenDirectoryList: require(`./cmd-open-directory-list`),
    CmdOpenDirectorySingle: require(`./cmd-open-directory-single`),

    CmdOpenFileList: require(`./cmd-open-file-list`),
    CmdOpenFileSingle: require(`./cmd-open-file-single`),

    CmdSaveFile: require(`./cmd-save-file`),


}