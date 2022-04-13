'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const dom = require(`./utils-dom`);
const UI = require(`./ui.js`);
const FLAGS = require('./flags');
const SIGNAL = require('./signal');

const WidgetOrientable = require(`./widget-orientable`);
const WidgetButton = require(`./widget-button`);
const FlagEnum = require('./helpers/flag-enum');
const InputBase = require(`./inputs/input-base`);

const _flag_STRETCH = `stretch`;
const _flag_STRETCH_SAME = `stretch-same`;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.WidgetOrientable
 * @memberof ui.core.helpers
 */
class WidgetBar extends WidgetOrientable {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/widgets/widget-bar.css`]
    }, WidgetOrientable, ['css']);

    static get FLAG_STRETCH() { return _flag_STRETCH; }
    static get FLAG_STRETCH_SAME() { return _flag_STRETCH_SAME; }
    static __stretchENUMs = [_flag_STRETCH, _flag_STRETCH_SAME];

    // ----> Init

    static __defaultSize = FLAGS.SIZE_M;
    static __defaultWidgetClass = WidgetButton;
    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`size`, null, null, `__defaultSize`)
        .To(`inline`)
        .To(`stretch`)
        .To(`defaultWidgetClass`, `_defaultWidgetClass`)
        .To(`defaultWidgetOptions`)
        .To(`handles`)
        .To(`orientation`);

    _Init() {

        super._Init();
        this._defaultWidgetClass = this._defaultWidgetClass || this.constructor.__defaultWidgetClass;
        this._defaultWidgetOptions = null;
        this._optionsMap = new Map();
        this._handles = [];
        this._inline = false;

        this._groups = {};
        this._radioMap = {};

        this._flags.Add(this,
            WidgetBar.FLAG_STRETCH,
            WidgetBar.FLAG_STRETCH_SAME);

        this._stretchEnum = new FlagEnum(this.constructor.__stretchENUMs, true);
        this._stretchEnum.Add(this);

        this._sizeEnum = new FlagEnum(FLAGS.sizes, true);
        this._sizeEnum.Add(this);
        this._sizeEnum.onFlagChanged.Add(this._Bind(this._OnSizeChanged));

        this._handleObserver = new com.signals.Observer();
        this._handleObserver.Hook(com.SIGNAL.RELEASED, this._OnHandleReleased, this);

    }

    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     * @group Styling
     */
    get size() { return this._sizeEnum.currentFlag; }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     * @group Styling
     */
    set size(p_value) { this._sizeEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     * @group Styling
     */
    set inline(p_value) {
        this._inline = p_value;
        for (let i = 0, n = this._handles.length; i < n; i++) {
            if (p_value) { this._handles[i].classList.add(`inline`); }
            else { this._handles[i].classList.remove(`inline`); }
        }
    }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Styling
     */
    set defaultWidgetOptions(p_value) { this._defaultWidgetOptions = p_value; }
    get defaultWidgetOptions() { return this._defaultWidgetOptions; }

    // ----> DOM

    _Style() {
        return {
            ':host': {
                'position': `relative`,
                'display': `flex`,
                'justify-content': `flex-start`,
                'align-items': `center`
            },

            ':host(.vertical)': { 'flex-flow': `column nowrap` },
            ':host(.horizontal)': { 'flex-flow': `row nowrap` },

            '.group': {
                'position': `relative`,
                'flex': `0 0 auto`,

                'display': `flex`,
                'justify-content': `flex-start`,
                'align-items': `center`
            },

            '.item': {
                'position': `relative`,
                'flex': `0 0 auto`,
                'min-width': '0',
                'min-height': '0',
            },
            ':host(.stretch) .group': {
                'flex': `1 0 auto`,
            },
            ':host(.stretch) .item': {
                'flex': `1 0 auto`,
            },
            ':host(.vertical.stretch) .item': {
                'max-height': `100% !important`,
            },
            ':host(.horizontal.stretch) .item': {
                'max-width': `100% !important`,
            }
        };
    }

    set stretch(p_value) {
        this._stretchEnum.Set(p_value);
    }

    _Render() {
        this.focusArea = this;
    }

    _OnSizeChanged(p_newValue, p_oldValue) {
        this._sizeEnum.Apply(`size`, this._handles);
    }

    // ----> Handle management

    _OnPlacementChanged(p_newValue, p_oldValue) {
        super._OnPlacementChanged(p_newValue, p_oldValue);
        // Update items placement based on this nav placement
        for (let i = 0, n = this._handles.length; i < n; i++) {
            let handle = this._handles[i];
            if (`placement` in handle) { handle.placement = p_newValue; }
        }
    }

    set handles(p_value) {
        this.Clear();
        if (u.isArray(p_value)) { this.CreateHandles(...p_value); }
    }

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {function} p_class 
     */
    CreateHandle(p_options, p_class = null) {

        let cl = (p_class || (p_options ? p_options.cl : null) || this._defaultWidgetClass),
            handle,
            group = u.tils.Get(p_options, `group`, null),
            radio = group ? u.tils.Get(p_options, `radio`, null) : null;

        if (group) {

            group = this.GetGroup(group, true);
            handle = this.Attach(cl, `item`, group.element);
            group.handles.push(handle);

            if (radio) {
                handle
                    .Watch(SIGNAL.ACTIVATED, this._OnRadioActivated, this)
                    .Watch(SIGNAL.DEACTIVATED, this._OnRadioDeactivated, this);
            }

        } else {
            handle = this.Attach(cl, `item`);
        }

        if (this._inline) { handle.classList.add(`inline`); }

        this._optionsMap.get(handle, p_options);

        if (u.isInstanceOf(handle, WidgetButton)) {

            if (p_options && this._defaultWidgetOptions) {
                for (var key in this._defaultWidgetOptions) {
                    if (!p_options.hasOwnProperty(key)) {
                        p_options[key] = this._defaultWidgetOptions[key];
                        if (!this.__tempKeys) { this.__tempKeys = []; }
                        this.__tempKeys.push(key);
                    }
                }
            }

            handle.options = p_options;

            if (this.__tempKeys) {
                for (let i = 0, n = this.__tempKeys.length; i < n; i++) { delete p_options[this.__tempKeys[i]]; }
                this.__tempKeys.length = 0;
                this.__tempKeys = null;
            }

        } else {
            if (p_options) {
                if (`options` in handle) {
                    handle.options = p_options;
                }
            }
        }

        if (u.isInstanceOf(handle, InputBase)) {
            if (p_options) {
                if (`currentValue` in p_options) { handle.currentValue = p_options.currentValue; }
                if (`inputId` in p_options) { handle.inputId = p_options.inputId; }

                if (p_options.inputWatchers && Array.isArray(p_options.inputWatchers)) {
                    for (var i = 0; i < p_options.inputWatchers.length; i++) {
                        let signal = p_options.inputWatchers[i];
                        handle.handler.Watch(signal.signal, signal.fn, signal.thisArg);
                    }
                }

            }
        }

        if (p_options) {

            u.Assign(p_options, handle, this);

            if (p_options.watchers && Array.isArray(p_options.watchers)) {
                for (var i = 0; i < p_options.watchers.length; i++) {
                    let signal = p_options.watchers[i];
                    handle.Watch(signal.signal, signal.fn, signal.thisArg);
                }
            }
        }



        handle.flags.Set(this._orientation, true);

        if (`size` in handle) { handle.size = this._sizeEnum.currentFlag; }
        if (`placement` in handle) { handle.placement = this._placement.currentFlag; }

        this._handles.push(handle);
        this._handleObserver.Observe(handle);

        this._OnHandleCreated(handle);

        return handle;

    }

    _OnHandleCreated(p_handle) { }

    /**
     * @description TODO
     * @param  {...object} options 
     */
    CreateHandles(...options) {
        let handles = [];
        for (let i = 0, n = options.length; i < n; i++) { handles.push(this.CreateHandle(options[i])); }
        return handles;
    }

    /**
     * @description Get a handle group, with the possibility of creating it on the fly if it does not exist.
     * @param {string} p_group 
     * @param {boolean} p_create 
     */
    GetGroup(p_group, p_create = false) {

        if (p_group in this._groups) { return this._groups[p_group]; }
        if (!p_create) { return null; }

        let group = {
            element: dom.El(`span`, { class: `group` }, this),
            handles: []
        };

        this._groups[p_group] = group;

        return group;

    }

    // ----> Radio handling

    /**
     * @access protected
     * @description TODO
     * @param {*} p_handle 
     */
    _OnRadioActivated(p_handle) {

        let handleOptions = this._optionsMap.get(p_handle),
            radio = handleOptions.radio;

        if (radio in this._radioMap) {
            let was = this._radioMap[radio];
            was.Deactivate();
        }

        this._radioMap[radio] = p_handle;

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_handle 
     */
    _OnRadioDeactivated(p_handle) {

        let handleOptions = this._optionsMap.get(p_handle),
            radio = handleOptions.radio;

        if (radio in this._radioMap) {
            let was = this._radioMap[radio];
            if (was === p_handle) {
                delete this._radioMap[radio];
            }
        }

    }

    // ---->

    /**
     * @access protected
     * @description TODO
     * @param {*} p_handle 
     */
    _OnHandleReleased(p_handle) {

        let options = this._optionsMap.get(p_handle),
            groupId = u.tils.Get(options, `group`, null);

        if (groupId) {

            let group = this.GetGroup(groupId);
            group.handles.splice(group.handles.indexOf(p_handle), 1);

            //Delete if empty
            if (group.handles.length === 0) {
                dom.Detach(group.element);
                group.element = null;
                group.handles.length = 0;
                delete this._groups[groupId];
            }

        }

        p_handle.classList.remove(`item`);
        this._optionsMap.delete(p_handle);

        // TODO : Check if radio & remove

        let index = this._handles.indexOf(p_handle);
        if (index != -1) { this._handles.splice(index, 1); }

        this._handleObserver.Unobserve(p_handle);

    }

    /**
     * @description TODO
     */
    Clear() {
        this._handleObserver.Flush();
        while (this._handles.length != 0) {
            this._handles.pop().Release();
        }
    }

    // ----> Pooling

    _CleanUp() {
        this.Clear();
        this._sizeEnum.Set(this.constructor.__defaultSize);
        super._CleanUp();
    }



}

module.exports = WidgetBar;
//UI.Register(`nkmjs-widget-bar`, WidgetBar);