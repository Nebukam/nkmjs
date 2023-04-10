'use strict';

const u = require(`@nkmjs/utils`);
const env = require(`@nkmjs/environment`);
const actions = require(`@nkmjs/actions`);
const dialog = require(`@nkmjs/dialog`);

class CmdSystemDialogFile extends actions.Command {
    constructor() { super(); }

    static __dialogType = null; //'save'
    static __dialogTitle = `Untitled Dialog`;
    static __dialogFilters = null; // [{ name: 'TXT files', extensions: ['txt'] }]
    static __dialogProperties = ['openFile'];

    _Init() {

        super._Init();
        this._Bind(this._OnInternalPicked);
        this._sortList = false;
        this._preLoopFn = null;
        this._postLoopFn = null;
        //If continue is overriden, if must call either _Success or _Cancel when done.
        this._continueFn = this._Bind(this._Success);

    }

    _GetBlockingDialogSettings() {
        //return { title: `Processing`, message: `Please wait...`, icon: `load-arrow` };
        return null;
    }

    _GetDialogSettings() {

        let dialogOptions = {
            title: this.constructor.__dialogTitle
        };

        if (this.constructor.__dialogProperties) {
            dialogOptions.properties = [...this.constructor.__dialogProperties];
        }

        if (this.constructor.__dialogFilters) {
            dialogOptions.filters = [...this.constructor.__dialogFilters];
        }

        if (this.constructor.__dialogType) {
            dialogOptions.type = this.constructor.__dialogType;
        }

        if (this.constructor.__dialogTitle) {
            dialogOptions.filters = this.constructor.__dialogTitle;
        }

        return dialogOptions;

    }

    _InternalExecute() {

        let conf = this._GetBlockingDialogSettings();
        if (conf) {
            conf.origin = this;
            this._blockingDialog = dialog.Push(conf);
        }

        if (env.isNodeEnabled) {
            actions.RELAY.ShowOpenDialog(
                this._GetDialogSettings(),
                this._OnInternalPicked);
        } else { this._Cancel(); }

    }

    /**
     * 
     * @param {*} p_response 
     * @returns 
     */
    _OnInternalPicked(p_response) {

        if (p_response.canceled) { this._Cancel(); return; }

        let list = p_response.filePaths;

        if (list.length == 0) { return this._Cancel(); }

        if (this._sortList) { p_response.filePaths.sort(); }

        this._PreparePickList(list);

        if (list.length == 0) { return this._Cancel(); }

        if (this._preLoopFn) { u.Call(this._preLoopFn, list); }

        for (let i = 0, n = list.length; i < n; i++) {
            this._OnPick(list[i], i, n);
        }

        if (this._postLoopFn) {
            if (u.Call(this._postLoopFn, list)) { u.Call(this._continueFn); }
            else { this._Cancel(); }
        } else { u.Call(this._continueFn); }

    }

    /**
     * 
     * @param {*} p_list 
     */
    _PreparePickList(p_list) {
        for (let i = 0, n = p_list.length; i < n; i++) {
            let
                filePath = u.PATH.Sanitize(p_list[i]),
                obj = {
                    path: filePath,
                    name: u.PATH.name(filePath),
                    ext: u.PATH.ext(filePath)
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

    _ConsumeBlockingDialog() {
        if (this._blockingDialog) {
            this._blockingDialog.Consume();
            this._blockingDialog = null;
        }
    }

    _End() {
        this._ConsumeBlockingDialog();
        super._End();
    }

}

module.exports = CmdSystemDialogFile;