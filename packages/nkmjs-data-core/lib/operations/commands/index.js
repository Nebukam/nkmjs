'use strict';

module.exports = {
    
    OpenAppSettings: new (require(`./cmd-open-app-settings`))(), 

    SetProperty: require(`./cmd-action-set-property`),
    
    SystemDialogDirectory: require(`./cmd-system-dialog-directory`),
    SystemDialogFile: require(`./cmd-system-dialog-file`),
    
    DialogOpenDirectoryList: require(`./cmd-open-directory-list`),
    DialogOpenDirectorySingle: require(`./cmd-open-directory-single`),
    DialogOpenFileList: require(`./cmd-open-file-list`),
    DialogOpenFileSingle: require(`./cmd-open-file-single`),
    DialogSaveFile: require(`./cmd-save-file`),

}