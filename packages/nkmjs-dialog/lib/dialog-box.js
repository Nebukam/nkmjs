'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

class DialogBox extends ui.Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, ui.Widget, ['css']);

    /**
     * @description TODO
     * @type {string}
     */
    static __default_flavor = null;
    static __default_variant = null;

    _Init() {
        super._Init();

        this._formHandler = new ui.inputs.InputFormHandler();
        this._formHandler
            .Watch(ui.inputs.SIGNAL.FORM_INVALID, this._OnFormInvalid, this)
            .Watch(ui.inputs.SIGNAL.FORM_READY, this._OnFormReady, this);

        this._contentWrapper = null;

        this._hasInput = false;

        this._handles = [];
        this._contents = [];
        this._contentOptions = new Map();
        this._submitMap = new collections.Dictionary();
        this._submitList = new collections.List();

        this._toolbarClass = ui.WidgetBar;
        this._toolbar = null;

        this._distribute = new com.helpers.OptionsDistribute(
            this._Bind(this._OnOptionsUpdated),
            this._Bind(this._OnOptionsWillUpdate));

        this._distribute
            .To(ui.IDS.FLAVOR)
            .To(ui.IDS.TITLE, null, `!!! MISSING TITLE !!!`)
            .To(ui.IDS.MESSAGE)
            .To(`actions`, this._Bind(this.SetActions), null)
            .To(`content`, this._Bind(this.SetContent));

        this._Bind(this._Close);
        this._Bind(this._Submit);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._variantEnum = new ui.helpers.FlagEnum(ui.FLAGS.variants, true);
        this._variantEnum.Add(this);

    }

    _PostInit() {
        super._PostInit();
        if (!this._toolbar) { throw new Error(`DialogBox (${this}) doesn't have a toolbar !`); }
    }

    // ----> DOM

    _Style() {

        return style.Extends({
            ':host': {
                overflow: 'hidden'
            }
        }, super._Style());

    }

    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {

    }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        this._hasInput = (this._formHandler._inputList.count > 0);
        if (this._hasInput) { this._formHandler.ValidateForm(); }

        if (p_options.grow) { this.style.removeProperty(`max-width`); }
        else { this.style.setProperty(`max-width`, p_options.maxwidth || `500px`); }
    }

    set message(p_message) {
        if (!this._messageElement) {
            this._messageElement = ui.dom.El(`span`, { class: `item message` }, this._contentWrapper);
        }
        this._messageElement.innerHTML = p_message;
        this._contents.push(this._messageElement);
        this._contents.push(this._messageElement);
    }

    set title(p_value) { throw new Error(`dialog.title not implemented.`); }

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

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     * @group Styling
     */
    set variant(p_value) { this._variantEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     * @group Styling
     */
    get variant() { return this._variantEnum.currentFlag; }

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

        this._contentOptions.clear();

        for (let i = 0, n = p_content.length; i < n; i++) {

            let itemNfos = p_content[i],
                itemClass = itemNfos.cl,
                itemData = itemNfos.data;

            if (!itemClass) {
                throw new Error(`Cannot create item with unspecified class or instance.`);
            }

            let item = this.Add(itemClass, `item`, this._contentWrapper);

            if (u.isInstanceOf(itemClass, ui.inputs.InputBase)) {

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
            this._contentOptions.set(item, itemNfos);
        }

    }

    _OnDataUpdated(p_data) {

        this._Clear();
        this._distribute.Update(this, p_data.options);

        /* DATA FORMAT

        {
            //Dialog title
            [com.IDS.TITLE]:`Dialog title`, 

            //Dialog message
            [com.IDS.MESSAGE]:`Dialog message` //Optional

            //Dialog icon
            [com.IDS.ICON]:`info`, //Optional

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
        u.Call(cb, this._formHandler.inputValues);
    }

    _Clear() {

        this._submitMap.Clear();
        this._submitList.Clear();
        this._formHandler.Clear();
        this._ClearHandles();

        for (let i = 0, n = this._contents.length; i < n; i++) {
            let item = this._contents[i],
                itemNFos = this._contentOptions.get(item),
                norelease = itemNFos ? itemNFos.donotrelease : false;

            if (norelease || !(`Release` in item)) {
                this.Remove(item);
                ui.dom.Detach(item);
            } else if (`Release` in item) {
                item.Release();
            }

            if (`data` in item) { item.data = null; }
        }

        this._messageElement = null;

        this._hasInput = false;
        this._contents.length = 0;
        this._contentOptions.clear();

        this.flavor = this.constructor.__default_flavor;
        this.variant = this.constructor.__default_variant;

    }

    _CleanUp() {
        this._Clear();
        super._CleanUp();
    }
}

module.exports = DialogBox;