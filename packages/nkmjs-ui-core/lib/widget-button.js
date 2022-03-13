'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");

const dom = require(`./utils-dom`);
const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const IDS = require(`./ids`);
const Widget = require(`./widget`);
const FlagEnum = require("./helpers/flag-enum");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class WidgetButton extends Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/global-button.css`]
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
        this._isCommandContext = false;
        this._isToggled = false;

        this._commandObserver = new com.signals.Observer();
        this._commandObserver.Hook(com.SIGNAL.UPDATED, this._OnCommandUpdated, this);

        this._flags.Add(this, FLAGS.TOGGLABLE, FLAGS.TOGGLED);

        this._sizeEnum = new FlagEnum(FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new FlagEnum(FLAGS.flavorsExtended, true);
        this._flavorEnum.Add(this);

        this._variantEnum = new FlagEnum(FLAGS.variants, true);
        this._variantEnum.Add(this);

        this._distribute = new com.helpers.OptionsDistribute(
            this._Bind(this._OnOptionsUpdateComplete),
            this._Bind(this._OnOptionsWillUpdate));

        this._distribute
            .To(IDS.DATA)
            .To(`htitle`)
            .To(`trigger`)
            .To(`toggle`, null, null)
            .To(`request`)
            .To(`isCommandTrigger`)
            .To(`isCommandContext`)
            .To(`alwaysVisible`, `alwaysDisplayCommand`)
            .To(`flagOn`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], true) } })
            .To(`flagOff`, (p_value) => { for (let i = 0, n = p_value.length; i < n; i++) { this._flags.Set(p_value[i], false) } })
            .To(`size`)
            .To(IDS.FLAVOR)
            .To(IDS.VARIANT);

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
        this._flags.Set(FLAGS.DISABLED, !this._isActivable);
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
            this._rippleWrapper = dom.El('div', { class: `ripple-wrapper` });
            dom.AttachFirst(this._rippleWrapper, this._wrapper, false);
        }

        let rect = dom.Rect(this._rippleWrapper),
            ripple = dom.El('span', {}, this._rippleWrapper),
            w = rect.width,
            h = rect.height,
            diameter = Math.max(w, h),
            radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${this._pointer._position.x - (rect.x + radius)}px`;
        ripple.style.top = `${this._pointer._position.y - (rect.y + radius)}px`;
        ripple.classList.add(`ripple`);
        ripple.addEventListener('animationend', this._OnRippleAnimationEnd);

    }

    _OnRippleAnimationEnd(p_evt) {
        let ripple = p_evt.target;
        ripple.removeEventListener('animationend', this._OnRippleAnimationEnd);
        dom.Detach(ripple);
        if (!this._rippleWrapper.hasChildNodes()) {
            dom.Detach(this._rippleWrapper);
            this._rippleWrapper = null;
        }
    }

    // ----> Options handling

    /**
     * @description TODO
     * @type {object}
     */
    set options(p_value) {

        if (!p_value) { return; }

        this._distribute.Update(this, p_value);
        this._flags.Set(FLAGS.NO_SCALE, p_value.noscale ? p_value.noscale : false);

    }

    /**
     * @description TODO
     * @type {object}
     */
    set altOptions(p_value) {

        if (!p_value) { return; }

        this._distribute.ProcessExistingOnly(this, p_value, null, false, false);

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (!p_options) { return; }
        p_options.htitle = u.tils.Get(p_options, `htitle`, (p_options.label || ``));
    }

    _OnOptionsUpdateComplete(p_options, p_altOptions, p_defaults) {
        if (`command` in p_options) { this.command = p_options.command; }
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
    set toggle(p_value) {
        this._toggle = p_value;
        this._flags.Set(FLAGS.TOGGLABLE, !!p_value);
    }

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
            if (this._trigger.arg === FLAGS.SELF) { u.Call(this._trigger, this); }
            else { u.Call(this._trigger); }
        }

        // ----> Toggle

        if (this._toggle) {

            if (this._isToggled) {
                // Self-deactivate if toggle.yoyo = true
                if (this._toggle.yoyo) { this.Deactivate(); }
                // Otherwise do nothing.
            } else {
                this.Toggle(true);
            }
        }

        // ----> Request

        if (this._request) {
            if (!this._request.type) { throw new Error(`Cannot generate request of type 'null'`); }

            let requestEmitter = u.tils.Get(this._request, `emitter`, this),
                options = u.tils.Get(this._request, `options`);

            // Override options value if a proxy has been set
            let proxy = u.tils.Get(this._request, `proxy`, null);
            if (proxy) { u.Call(proxy); }

            requestEmitter._EmitLocalRequest(
                opts.type,
                options,
                u.tils.Get(this._request, `onSuccess`, null),
                u.tils.Get(this._request, `onFail`, null),
                u.tils.Get(this._request, `timeout`, 0),
                u.tils.Get(this._request, `cl`, actions.Request)
            );
        }

        this._Broadcast(SIGNAL.TRIGGERED, this);

        return true;

    }

    Toggle(p_value) {

        if (this._isToggled == p_value) { return; }

        this._isToggled = p_value;
        this._flags.Set(FLAGS.TOGGLED, p_value);

        let cbs = this._toggle;

        if (cbs) {
            if (this._isToggled) {
                if (cbs.arg === FLAGS.SELF) { u.Call(cbs, this); }
                else { u.Call(cbs); }
            } else {
                if (cbs.fnOff) {
                    if (cbs.fnOff.arg === FLAGS.SELF) { u.Call(cbs.fnOff, this); }
                    else { u.Call(cbs.fnOff); }
                }
            }
        }
    }
    /**
     * @description Only used if `isToggle === true`.
     */
    Deactivate() {

        if (this._toggle) { this.Toggle(false); }
        this._Broadcast(SIGNAL.DEACTIVATED, this);

    }

    _CleanUp() {

        if (this._rippleWrapper) {
            dom.Detach(this._rippleWrapper);
            this._rippleWrapper = null;
        }

        this.htitle = ``;

        this.command = null;
        this._isCommandTrigger = true;
        this._isCommandContext = false;

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

module.exports = WidgetButton;
//UI.Register(`nkmjs-widget-button`, WidgetButton);