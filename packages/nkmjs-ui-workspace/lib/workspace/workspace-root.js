'use strict';

const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");
const com = require("@nkmjs/common");
const { Catalog } = require(`@nkmjs/data-core`);
const { UI } = require(`@nkmjs/ui-core`);

const WORKSPACE_CONTEXT = require(`../workspace-context`);
const Workspace = require(`./workspace.js`);

class RootWorkspace extends Workspace {

    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();

        this._rootCatalog = new Catalog();
        this._rootCatalog.GetOrCreateCatalog({ name: 'RootCell' });

    }

    _PostInit() {

        super._PostInit();

        actions.RELAY.Watch(actions.ACTION_REQUEST.EDIT, this._HandleEditRequest, this);
        actions.RELAY.Watch(actions.ACTION_REQUEST.OPEN, this._HandleOpenRequest, this);
        actions.RELAY.Watch(actions.ACTION_REQUEST.CREATE, this._HandleCreateRequest, this);

        this.catalog = this._rootCatalog;

    }

    get rootCatalog() { return this._rootCatalog; }

    // ----> Rendering

    _Style() {
        return u.tils.Merge(super._Style(), {
            ':host': {
                position: `relative`,
                width: `1px`, //!important dirty fix
                //height:`100%`,
                flex: `1 1 auto`,
                display: `flex`,
            },
        });
    }

    // ----> Request handling

    _HandleEditRequest(p_request) {


        if (p_request.handled) { return; }

        let editTarget = p_request.GetOption(`data`, null),
            editorClass = p_request.GetOption(`editor`, null);

        if (!editTarget) {
            p_request.HandleFail(`Editing request has no data.`);
            return;
        }

        //TODO : Check if the edit target is already being edited
        //TODO : Check if an editor class or reference is specified in the request

        if (editorClass) { editorClass = com.BINDINGS.Get(editorClass, editTarget, editorClass); }
        else { editorClass = com.BINDINGS.Get(WORKSPACE_CONTEXT.DEFAULT_EDITOR, editTarget); }

        if (!editorClass) {
            p_request.HandleFail(`Could not find editor association for ${editTarget}.`);
            return;
        }

        u.LOG._(`Editing request for ${editTarget} will be handled using ${editorClass.name}`);

        this.Host({
            data: editTarget,
            viewType: editorClass,
            name: editTarget.id.name
        });

        p_request.HandleSuccess(this);

        //TODO : Check if there is an editor specified
        //if not : 
        //find the list of available editor for the request's data
        //if there are multiple editor available, open the workbench
        //If specified :
        //find the list of available editors
        //if there are multiple editor available, open the workbench and then open the desired editor
    }

    _HandleOpenRequest(p_request) {
        //TODO, Fairly same as EDIT ?
    }

    _HandleCreateRequest(p_request) {
        // TODO
    }

}

module.exports = RootWorkspace;
UI.Register(`nkmjs-root-workspace`, RootWorkspace);