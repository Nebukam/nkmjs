'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const base = ui.Widget;

class DialogBox extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultFlavor = null;
    static __defaultVariant = null;
    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate`, wrapUpFn: `_OnOptionsUpdated` })
        .To(ui.IDS.FLAVOR)
        .To(ui.IDS.TITLE, null, `!!! MISSING TITLE !!!`)
        .To(ui.IDS.MESSAGE)
        .To(`actions`, (p_target, p_value) => { p_target.SetActions(p_value); }, null)
        .To(`content`, (p_target, p_value) => { p_target.SetContent(p_value); });

    _Init() {
        super._Init();

        this._contentWrapper = null;

        this._hasInput = false;

        this._handles = [];
        this._contents = [];
        this._contentOptions = new Map();

        this._toolbarClass = ui.WidgetBar;
        this._toolbar = null;

        this._Bind(this._Close);

        ui.helpers.FlagEnum.Attach(this, ui.IDS.FLAVOR, ui.FLAGS.flavorsExtended);
        ui.helpers.FlagEnum.Attach(this, ui.IDS.VARIANT, ui.FLAGS.variants);

        this.constructor.__distribute.Attach(this);
    }

    _PostInit() {
        super._PostInit();
        if (!this._toolbar) { throw new Error(`DialogBox (${this}) doesn't have a toolbar !`); }
    }

    // ----> DOM

    static _Style() {

        return style.Extends({
            ':host': {
                overflow: 'clip'
            }
        }, base._Style());

    }

    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {

    }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        ui.dom.CSS(this, `max-width`, p_options.grow ? null : p_options.maxwidth || `500px`);
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
     * 
     * @param {array} p_actions 
     */
    SetActions(p_actions = null) {
        if (p_actions) {
            // Create handles as specified
            for (let i = 0, n = p_actions.length; i < n; i++) {
                let opts = p_actions[i];
                this.CreateHandle(opts, opts.cl || null);
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

            let item = this.Attach(itemClass, `item`, this._contentWrapper);

            if (itemData) { item.data = itemData; }

            this._contents.push(item);
            this._contentOptions.set(item, itemNfos);

            this._OnContentItemAdded(itemNfos, item);

        }

    }

    _OnContentItemAdded(p_item, p_infos) {

    }

    _OnDataUpdated(p_data) {

        this._Clear();
        this.options = p_data.options;

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

        if (((p_options && 'close' in p_options) ? p_options.close : true)) {
            //TODO : Need to add a generic 'triggered' activation signal
            //to close the dialog box. Otherwise, close by default.
            handle.Watch(ui.SIGNAL.TRIGGERED, this._Close);
        }

        return handle;

    }

    // ---->

    _Close() {
        this._data.Consume();
    }

    _Clear() {

        this._ClearHandles();

        for (let i = 0, n = this._contents.length; i < n; i++) {
            let item = this._contents[i],
                itemNFos = this._contentOptions.get(item),
                norelease = itemNFos ? itemNFos.donotrelease : false;

            if (norelease || !item.Release) {
                this.Detach(item);
                ui.dom.Detach(item);
            } else {
                item.Release?.();
            }

            item.data = null;
        }

        this._messageElement = null;

        this._contents.length = 0;
        this._contentOptions.clear();

        this.flavor = this.constructor.__defaultFlavor;
        this.variant = this.constructor.__defaultVariant;

    }

    _CleanUp() {
        this._Clear();
        super._CleanUp();
    }
}

module.exports = DialogBox;