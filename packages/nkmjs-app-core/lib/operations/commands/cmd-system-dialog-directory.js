'use strict';

const u = require(`@nkmjs/utils`);

const CmdSystemDialogFile = require(`./cmd-system-dialog-file`);

class CmdSystemDialogDirectory extends CmdSystemDialogFile {
    constructor() { super(); }

    static __dialogProperties = ['openDirectory'];

    /**
     * 
     * @param {*} p_list 
     */
    _PreparePickList(p_list) {
        for (let i = 0, n = p_list.length; i < n; i++) {
            let
                dirPath = u.PATH.Sanitize(p_list[i]),
                obj = {
                    path: dirPath,
                    name: u.PATH.name(dirPath)
                };
            p_list[i] = obj;
        }
    }

    /**
     * 
     * @param {*} p_pickInfos 
     * @param {*} p_index 
     * @param {*} p_total 
     * @customtag override-me
     */
    _OnPick(p_pickInfos, p_index, p_total) {

    }

}

module.exports = CmdSystemDialogDirectory;