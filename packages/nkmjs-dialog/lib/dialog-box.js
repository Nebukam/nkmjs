'use strict';

const u = require("@nkmjs/utils");
const { Dictionary, List } = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const { CSS, FONT_FLAG } = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const { INPUT_SIGNAL, InputBase, InputFormHandler } = require(`@nkmjs/ui-inputs`);

class DialogBox extends ui.Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/dialogs/dialog-box.css`]
    }, ui.Widget, ['css']);

    /**
     * @description TODO
     * @type {string}
     */
    static __default_flavor = null;

    _Init() {
        super._Init();

        this._formHandler = new InputFormHandler();
        this._formHandler
            .Watch(INPUT_SIGNAL.FORM_INVALID, this._OnFormInvalid, this)
            .Watch(INPUT_SIGNAL.FORM_READY, this._OnFormReady, this);

        this._header = null;
        this._body = null;
        this._footer = null;
        this._title = null;
        this._icon = null;

        this._hasInput = false;

        this._handles = new Array(0);
        this._contents = new Array(0);
        this._submitMap = new Dictionary();
        this._submitList = new List();

        this._toolbarClass = ui.Toolbar;
        this._toolbarDefaultButtonClass = ui.ButtonEx;
        this._toolbar = null;

        this._optionsHandler = new com.helpers.OptionsHandler(
            this._Bind(this._OnOptionsUpdated),
            this._Bind(this._OnOptionsWillUpdate));

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavors, true);
        this._flavorEnum.Add(this);

        this._optionsHandler.Hook(`flavor`, (p_value) => { this._flavorEnum.Set(p_value); });
        this._optionsHandler.Hook(`title`, null, `!!! MISSING TITLE !!!`);
        this._optionsHandler.Hook(`icon`);
        this._optionsHandler.Hook(`message`);
        this._optionsHandler.Hook(`actions`, this._Bind(this.SetActions), null);
        this._optionsHandler.Hook(`content`, this._Bind(this.SetContent));

        this._Bind(this._Close);
        this._Bind(this._Submit);

    }

    // ----> DOM

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     * @group Styling
     */
    set flavor(p_value) { this._flavorEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     * @group Styling
     */
    get flavor() { return this._flavorEnum.currentFlag; }

    _Style() {

        return CSS.Extends({
            ':host': {
                display: `flex`,
                'flex-flow': `column`,
                'align-content': `stretch`,
                'align-items': `stretch`,
                'justify-content': `center`,

                overflow: 'hidden'
            },
            '.header': {

            },
            '.footer': {
                display: `flex`,
                'flex-flow': `column`,
                'align-content': `flex-end`,
                'align-items': `flex-end`,

                flex: `0 0 auto`,
            },
            '.toolbar': {
                flex: `0 0 auto`,
            },
            '.body': {
                //'overflow-y':`overlay`,
                flex: `1 1 auto`
            }

        }, super._Style());

    }

    _Render() {

        this._icon = new ui.manipulators.Icon(u.dom.New('div', { class: `icon` }, this._host), false, true);

        this._header = u.dom.New(`div`, { class: `group header` }, this._host);
        this._body = u.dom.New(`div`, { class: `group body` }, this._host);
        this._footer = u.dom.New(`div`, { class: `group footer` }, this._host);

        this._toolbar = this.Add(this._toolbarClass, `toolbar`, this._footer);
        this._toolbar._defaultButtonClass = this._toolbarDefaultButtonClass;
        this._toolbar.size = ui.FLAGS.SIZE_M;

        this._title = new ui.manipulators.Text(u.dom.New(`span`, { class: `title ${FONT_FLAG.MEDIUM}` }, this._header), false);
        this._messageElement = null;

    }

    _OnOptionsWillUpdate(p_options) {

    }

    _OnOptionsUpdated(p_options) {
        this._hasInput = (this._formHandler._inputList.count > 0);
        if (this._hasInput) { this._formHandler.ValidateForm(); }
    }

    get title() { return this._title; }
    set title(p_title) { this._title.Set(p_title); }

    get icon() { return this._icon; }
    set icon(p_icon) { this._icon.Set(p_icon); }

    set message(p_message) {
        if (!this._messageElement) {
            this._messageElement = u.dom.New(`span`, { class: `item message` }, this._body);
        }
        this._messageElement.innerHTML = p_message;
        this._contents.push(this._messageElement);
    }

    /**
     * 
     * @param {array} p_actions 
     */
    SetActions(p_actions = null) {
        if (p_actions) {
            // Create handles as specified
            for (let i = 0, n = p_actions.length; i < n; i++) {
                let opts = p_actions[i];
                this.CreateHandle(opts, u.tils.Get(opts, `cl`, null));
            }
        } else {
            // Create a default handle
            this.CreateHandle({ text: `Close` });
        }
    }

    /**
     * 
     * @param {array} p_content
     */
    SetContent(p_content) {

        if (!Array.isArray(p_content)) {
            throw new Error(`Cannot build dialog content list out of ${p_content}`);
        }

        for (let i = 0, n = p_content.length; i < n; i++) {

            let itemNfos = p_content[i],
                itemClass = itemNfos.cl,
                itemData = itemNfos.data;

            if (!itemClass) {
                throw new Error(`Cannot create item with unspecified class.`);
            }

            let item = this.Add(itemClass, `item`, this._body);

            if (u.tils.isInstanceOf(itemClass, InputBase)) {

                item.inputId = itemNfos.inputId;

                if (itemNfos.value) {
                    item.currentValue = itemNfos.value;
                }

                let validations = itemNfos.validations;
                if (validations) {
                    for (let i = 0, n = validations.length; i < n; i++) {
                        item.AddValidation(validations[i]);
                    }
                }
                this._formHandler.Register(item);
            }

            if (itemData) { item.data = itemData; }

            this._contents.push(item);
        }

    }

    _OnDataUpdated(p_data) {

        this._Clear();
        this._optionsHandler.Process(this, p_data.options);

        /* DATA FORMAT

        {
            //Dialog title
            [com.IDS.TITLE]:`Dialog title`, 

            //Dialog message
            [com.IDS.MESSAGE]:`Dialog message` //Optional

            //Dialog icon
            [com.IDS.ICON]:`%ICON%/icon_info.svg`, //Optional

            //Dialog actions
            //displayed at the bottom of the dialog.
            actions:[
                {
                    //Regular button options goes here 
                    //Extra parameter stating whether the button closes the popup or not
                    close:true,
                    //Extra submit callback definition to retrieve form values, if any
                    submit:{ fn:func, thisArg:context }
                }
            ]

            //Dialog content
            //Will create widgets in order.
            content:[
                {
                    //Regular item
                    cl:ItemClass
                },
                {
                    //Input item
                    cl:ItemClass,
                    inputId:`inputId`,
                    validations:[
                        { fn:func, thisArg:context }
                    ]
                }
            ]

        }

        */

    }

    // ----> Toolbox handles

    _ClearHandles() {
        let handles = this._handles;
        while (handles.length != 0) { handles.pop().Release(); }
    }

    CreateHandle(p_options, p_class = null) {

        let handle = this._toolbar.CreateHandle(p_options, p_class);
        this._handles.push(handle);

        if (u.tils.Get(p_options, `submit`, false)) {
            //TODO : Need to add a generic 'triggered' activation  signal
            //to close the dialog box. Otherwise, close by default.
            this._submitMap.Set(handle, p_options.submit);
            this._submitList.Add(handle);
            handle.Watch(ui.SIGNAL.TRIGGERED, this._Submit);
        }

        if (u.tils.Get(p_options, `close`, true)) {
            //TODO : Need to add a generic 'triggered' activation signal
            //to close the dialog box. Otherwise, close by default.
            handle.Watch(ui.SIGNAL.TRIGGERED, this._Close);
        }

        return handle;

    }

    // ----> Form handling

    _OnFormInvalid(p_handler) {
        this._submitList.ForEach((p_item) => { p_item.activable = false; });
    }

    _OnFormReady(p_handler) {
        this._submitList.ForEach((p_item) => { p_item.activable = true; });
    }

    // ---->

    _Close() {
        this._data.Consume();
    }

    _Submit(p_source) {
        let cb = this._submitMap.Get(p_source);
        cb.fn.call(cb.thisArg, this._formHandler.inputValues);
    }

    _Clear() {

        this._submitMap.Clear();
        this._submitList.Clear();
        this._formHandler.Clear();
        this._flavorEnum.Set(this.constructor.__default_flavor);
        this._ClearHandles();

        for (let i = 0, n = this._contents.length; i < n; i++) {
            let item = this._contents[i];
            if (`Release` in item) { this._contents[i].Release(); }
            else { u.dom.Detach(item); }
        }

        this._hasInput = false;
        this._contents.length = 0;

    }

    _CleanUp() {
        this._Clear();
        super._CleanUp();
    }
}

module.exports = DialogBox;
ui.Register('nkmjs-dialog-box', DialogBox);