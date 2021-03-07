'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS, SIGNAL, Observer, OptionsHandler } = require(`@nkmjs/common`);
const { Request } = require(`@nkmjs/actions`);
const { Command } = require("@nkmjs/actions");

const UI = require(`./ui`);
const UI_SIGNAL = require(`./ui-signal`);
const UI_FLAG = require(`./ui-flag`);
const Widget = require(`./widget`);
const FlagEnum = require("./helpers/flag-enum");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class ButtonBase extends Widget {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/buttons/shared.css`]
    }, Widget, ['css']);

    // ----> Init

    /**
     * @description TODO
     * @type {string}
     */
    static __default_size = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __default_flavor = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __default_variant = null;


    _Init() {
        super._Init();

        this._Bind(this._OnRippleAnimationEnd);

        this._alwaysDisplayCommand = (this._alwaysDisplayCommand || false);

        this._command = null;
        this._isCommandTrigger = true;
        this._isCommandContext = true;
        this._isToggled = false;

        this._commandObserver = new Observer();
        this._commandObserver.Hook(SIGNAL.UPDATED, this._OnCommandUpdated, this);

        this._flags.Add(this, UI_FLAG.TOGGLED);

        this._sizeEnum = new FlagEnum(UI_FLAG.sizes);
        this._sizeEnum.Add(this);

        this._flavorEnum = new FlagEnum(UI_FLAG.flavors);
        this._flavorEnum.Add(this);

        this._variantEnum = new FlagEnum(UI_FLAG.variants);
        this._variantEnum.Add(this);

        this._optionsHandler = new OptionsHandler(null, this._Bind(this._OnOptionsWillUpdate));
        this._optionsHandler.Hook(`data`);
        this._optionsHandler.Hook(`htitle`);
        this._optionsHandler.Hook(`trigger`);
        this._optionsHandler.Hook(`toggle`);
        this._optionsHandler.Hook(`request`);
        this._optionsHandler.Hook(`command`);
        this._optionsHandler.Hook(`isCommandTrigger`);
        this._optionsHandler.Hook(`isCommandContext`);
        this._optionsHandler.Hook(`alwaysVisible`, `alwaysDisplayCommand`);
        this._optionsHandler.Hook(`flagOn`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], true) } });
        this._optionsHandler.Hook(`flagOff`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], false) } });
        this._optionsHandler.Hook(`size`, (p_value) => { this._sizeEnum.Set(p_value); });
        this._optionsHandler.Hook(`flavor`, (p_value) => { this._flavorEnum.Set(p_value); });
        this._optionsHandler.Hook(`variant`, (p_value) => { this._variantEnum.Set(p_value); });

    }

    _PostInit() {
        super._PostInit();
        this._sizeEnum.Set(this.constructor.__default_size);
        this._flavorEnum.Set(this.constructor.__default_flavor);
        this._variantEnum.Set(this.constructor.__default_variant);
    }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customtag read-only
     * @group Styling
     */
    get size() { return this._sizeEnum.currentFlag; }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     * @group Styling
     */
    set size(p_value) { this._sizeEnum.Set(p_value); }

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
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isToggled() { return this._isToggled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set isActivable(p_value) {
        super.isActivable = p_value;
        this._flags.Set(UI_FLAG.DISABLED, !this._isActivable);
    }

    /**
     * @description TODO
     * @type {boolean}
     * @group Command
     */
    get isCommandTrigger() { return this._isCommandTrigger; }
    set isCommandTrigger(p_value) { this._isCommandTrigger = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @group Command
     */
    get isCommandContext() { return this._isCommandContext; }
    set isCommandContext(p_value) { this._isCommandContext = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @group Command
     */
    get alwaysDisplayCommand() { return this._alwaysDisplayCommand; }
    set alwaysDisplayCommand(p_value) {
        this._alwaysDisplayCommand = p_value;
        if (p_value && this._command) {
            this.visible = true;
        }
    }

    // ----> DOM

    _Render() {
        this.focusArea = this;
    }

    CreateRipple() {

        if (!this._rippleWrapper) {
            this._rippleWrapper = UDOM.New('div', { class: `ripple-wrapper` });
            UDOM.AttachFirst(this._rippleWrapper, this._wrapper, false);
        }

        let rect = UDOM.Rect(this._rippleWrapper),
            ripple = UDOM.New('span', {}, this._rippleWrapper),
            w = rect.width,
            h = rect.height,
            diameter = Math.max(w, h),
            radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${this._interactions._position.x - (rect.x + radius)}px`;
        ripple.style.top = `${this._interactions._position.y - (rect.y + radius)}px`;
        ripple.classList.add(`ripple`);
        ripple.addEventListener('animationend', this._OnRippleAnimationEnd);

    }

    _OnRippleAnimationEnd(p_evt) {
        let ripple = p_evt.target;
        ripple.removeEventListener('animationend', this._OnRippleAnimationEnd);
        UDOM.Detach(ripple);
    }

    // ----> Options handling

    /**
     * @description TODO
     * @type {object}
     */
    set options(p_value) {

        if (!p_value) { return; }

        this._optionsHandler.Process(this, p_value);
        this._flags.Set(UI_FLAG.NO_SCALE, p_value.noscale ? p_value.noscale : false);

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options) {
        if (!p_options) { return; }
        p_options.htitle = U.Get(p_options, `htitle`, (p_options.label || ``));
    }

    /**
     * @description TODO
     * @type {actions.Command}
     * @group Command
     */
    get command() { return this._command; }
    set command(p_command) {
        if (this._command === p_command) { return; }

        let oldValue = this._command;
        this._command = p_command;

        if (oldValue) {
            this._commandObserver.Unobserve(p_command);
        }
        if (p_command) {
            this._commandObserver.Observe(p_command);
            this._OnCommandUpdated(p_command);
            this.htitle = p_command.name;
            this.order = p_command.order;
        } else {
            this.order = 0;
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_command 
     * @group Command
     */
    _OnCommandUpdated(p_command) {
        this.visible = this._alwaysDisplayCommand ? true : p_command.isEnabled;
    }

    /**
     * @description TODO
     * @type {object}
     */
    get trigger() { return this._trigger; }
    set trigger(p_value) { this._trigger = p_value; }

    /**
     * @description TODO
     * @type {object}
     */
    get toggle() { return this._toggle; }
    set toggle(p_value) { this._toggle = p_value; }

    /**
     * @description TODO
     * @type {object}
     */
    get request() { return this._request; }
    set request(p_value) { this._request = p_value; }

    /**
     * @description TODO
     * @param {Event} p_evt 
     */
    Activate(p_evt) {

        if (!super.Activate(p_evt)) { return false; }

        this.CreateRipple();

        // ----> Command

        if (this._isCommandTrigger && this._command) {
            this._command.emitter = this;
            if (this._isCommandContext) { this._command.Execute(this); }
            else { this._command.Execute(); }
        }

        // ----> Trigger

        if (this._trigger) {
            let thisArg = U.Get(this._trigger, `thisArg`, null);
            if (this._trigger.argArray) { this._trigger.fn.call(thisArg, ...this._trigger.argArray); }
            else if (this._trigger.arg) {
                if (this._trigger.arg === UI_FLAG.SELF) { this._trigger.fn.call(thisArg, this); }
                else { this._trigger.fn.call(thisArg, this._trigger.arg); }
            }
            else { this._trigger.fn.call(thisArg); }
        }

        // ----> Toggle

        if (this._toggle) {

            if (this._isToggled) {
                // Self-deactivate if toggle.yoyo = true
                if (this._toggle.yoyo) { this.Deactivate(); }
                // Otherwise do nothing.
            } else {

                this._isToggled = true;
                this._flags.Set(UI_FLAG.TOGGLED, true);

                let thisArg = U.Get(this._toggle, `thisArg`, null);
                if (this._toggle.argArray) { this._toggle.fn.call(thisArg, ...this._toggle.argArray); }
                else if (this._toggle.arg) {
                    if (this._toggle.arg === UI_FLAG.SELF) { this._toggle.fn.call(thisArg, this); }
                    else { this._toggle.fn.call(thisArg, this._toggle.arg); }
                }
                else { this._toggle.fn.call(thisArg); }

            }
        }

        // ----> Request

        if (this._request) {
            if (!this._request.type) { throw new Error(`Cannot generate request of type 'null'`); }

            let requestEmitter = U.Get(this._request, `emitter`, this),
                options = U.Get(this._request, `options`);

            // Override options value if a proxy has been set
            let proxy = U.Get(this._request, `proxy`, null);
            if (proxy) {
                let thisArg = U.Get(proxy, `thisArg`, null);
                if (proxy.argArray) { options = proxy.fn.apply(thisArg, proxy.argArray); }
                else if (proxy.arg) { options = proxy.fn.call(thisArg, proxy.arg); }
                else { options = proxy.fn.call(thisArg); }
            }

            requestEmitter._EmitLocalRequest(
                opts.type,
                options,
                U.Get(this._request, `onSuccess`, null),
                U.Get(this._request, `onFail`, null),
                U.Get(this._request, `timeout`, 0),
                U.Get(this._request, `cl`, Request)
            );
        }

        this._Broadcast(UI_SIGNAL.TRIGGERED, this);

        return true;

    }

    /**
     * @description Only used if `isToggle === true`.
     */
    Deactivate() {

        if (!this._isToggled) { return; }

        this._isToggled = false;
        this._flags.Set(UI_FLAG.TOGGLED, false);

        if (this._toggle) {
            if (this._toggle.fnOff) {
                let thisArg = U.Get(this._toggle, `thisArg`, null);
                if (this._toggle.argArray) { this._toggle.fnOff.call(thisArg, ...this._toggle.argArray); }
                else if (this._toggle.arg) {
                    if (this._toggle.arg === UI_FLAG.SELF) { this._toggle.fnOff.call(thisArg, this); }
                    else { this._toggle.fnOff.call(thisArg, this._toggle.arg); }
                }
                else { this._toggle.fnOff.call(thisArg); }
            }
        }

        this._Broadcast(UI_SIGNAL.DEACTIVATED, this);

    }

    _CleanUp() {

        if(this._rippleWrapper){
            UDOM.Detach(this._rippleWrapper);
            this._rippleWrapper = null;
        }

        this.htitle = ``;

        this.command = null;
        this._isCommandTrigger = true;
        this._isCommandContext = true;

        this._isToggled = false;

        this.toggle = null;
        this.trigger = null;
        this.request = null;
        this.isActivable = true;

        this._flags.ApplyAll(false);
        this._sizeEnum.Set(this.constructor.__default_size);
        this._flavorEnum.Set(this.constructor.__default_flavor);
        this._variantEnum.Set(this.constructor.__default_variant);

        super._CleanUp();
    }


}

module.exports = ButtonBase;
//UI.Register(`nkmjs-button`, ButtonBase);