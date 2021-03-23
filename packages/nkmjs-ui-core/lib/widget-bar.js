'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const UI = require(`./ui.js`);
const FLAGS = require('./flags');
const SIGNAL = require('./signal');

const WidgetOrientable = require(`./widget-orientable`);
const WidgetButton = require(`./widget-button`);
const FlagEnum = require('./helpers/flag-enum');

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

    static __default_size = FLAGS.SIZE_M;

    _Init() {

        super._Init();
        this._defaultWidgetClass = WidgetButton;
        this._defaultWidgetOptions = null;
        this._optionsMap = new collections.Dictionary();
        this._handles = new Array(0);

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

    }

    _PostInit() {
        super._PostInit();
        this._sizeEnum.Set(this.constructor.__default_size);
    }

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
            ':host(.stretch), :host(.stretch-same)': {
                'align-items': `stretch`,
                'align-content': `stretch`,
                'flex': `1 1 auto`
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

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {function} p_class 
     */
    CreateHandle(p_options, p_class = null) {

        let cl = (p_class || p_options.cl || this._defaultWidgetClass),
            handle,
            group = u.tils.Get(p_options, `group`, null),
            toggle = group ? u.tils.Get(p_options, `toggle`, null) : null;

        if (group) {

            group = this.GetGroup(group, true);
            handle = this.Add(cl, `item`, group.element);
            group.handles.push(handle);

            if (toggle) {
                handle
                    .Watch(SIGNAL.ACTIVATED, this._OnRadioActivated, this)
                    .Watch(SIGNAL.DEACTIVATED, this._OnRadioDeactivated, this);
            }

        } else {
            handle = this.Add(cl, `item`);
        }

        this._optionsMap.Set(handle, p_options);
        handle.Watch(com.SIGNAL.RELEASED, this._OnHandleReleased, this);

        if (u.isInstanceOf(handle, WidgetButton)) {

            if (p_options && this._defaultWidgetOptions) {
                for (var key in this._defaultWidgetOptions) {
                    if (!p_options.hasOwnProperty(key)) { p_options[key] = this._defaultWidgetOptions[key]; }
                }
            }

            handle.options = p_options;

        }

        handle.flags.Set(this._orientation, true);

        if (`size` in handle) { handle.size = this._sizeEnum.currentFlag; }
        if (`placement` in handle) { handle.placement = this._placement.currentFlag; }

        this._handles.push(handle);

        return handle;

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
            element: u.dom.El(`span`, { class: `group` }, this),
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

        let handleOptions = this._optionsMap.Get(p_handle),
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

        let handleOptions = this._optionsMap.Get(p_handle),
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

        let options = this._optionsMap.Get(p_handle),
            groupId = u.tils.Get(options, `group`, null);

        if (groupId) {

            let group = this.GetGroup(groupId);
            group.handles.splice(group.handles.indexOf(p_handle), 1);

            //Delete if empty
            if (group.handles.length === 0) {
                u.dom.Detach(group.element);
                group.element = null;
                group.handles.length = 0;
                delete this._groups[groupId];
            }

        }

        p_handle.classList.remove(`item`);
        this._optionsMap.Remove(p_handle);

        // TODO : Check if radio & remove

        let index = this._handles.indexOf(p_handle);
        if (index != -1) { this._handles.splice(index, 1); }

    }

    /**
     * @description TODO
     */
    Clear() {
        while (this._handles.length != 0) {
            this._handles.pop().Release();
        }
    }

    // ----> Pooling

    _CleanUp() {
        this.Clear();
        this._sizeEnum.Set(this.constructor.__default_size);
        super._CleanUp();
    }



}

module.exports = WidgetBar;
UI.Register(`nkmjs-widget-bar`, WidgetBar);