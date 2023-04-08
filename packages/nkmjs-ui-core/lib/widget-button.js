'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const style = require("@nkmjs/style");

const dom = require(`./utils-dom`);
const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const IDS = require(`./ids`);
const Widget = require(`./widget`);
const FlagEnum = require("./helpers/flag-enum");

const base = Widget;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.Widget
 * @memberof ui.core
 */
class WidgetButton extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/global-button.css`]
    }, base, ['css']);

    // ----> Init

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultSize = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultFlavor = null;

    /**
     * @description TODO
     * @type {string}
     */
    static __defaultVariant = null;

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(IDS.DATA)
        .To(`htitle`)
        .To(IDS.ORDER)
        .To(`trigger`)
        .To(`toggle`, null, null)
        .To(`request`)
        .To(`isCmdTrigger`)
        .To(`isCmdEmitter`)
        .To(`isCmdContext`)
        .To(`flagOn`, (p_target, p_value) => { p_value.forEach((flag) => { p_target._flags.Set(flag, true) }); })
        .To(`flagOff`, (p_target, p_value) => { p_value.forEach((flag) => { p_target._flags.Set(flag, false) }); })
        .To(IDS.SIZE)
        .To(`noscale`, (p_target, p_value) => { p_target._flags.Set(FLAGS.NO_SCALE, p_value); }, false)
        .To(IDS.FLAVOR)
        .To(IDS.VARIANT)
        .To(IDS.CMD);


    _Init() {
        super._Init();

        this._Bind(this._OnRippleAnimationEnd);

        this._command = null;
        this._isCmdTrigger = true;
        this._isCmdEmitter = false;
        this._isCmdContext = false;
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

    }

    _PostInit() {
        super._PostInit();
        this._sizeEnum.Set(this.constructor.__defaultSize);
        this._flavorEnum.Set(this.constructor.__defaultFlavor);
        this._variantEnum.Set(this.constructor.__defaultVariant);
    }

    static _Style() {
        return style.Extends({
            ':host': {
                'position': 'relative',
                'box-sizing': `border-box`,
                '--size':`32px`,
            }
        }, {});//base._Style());
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
    get isCmdEmitter() { return this._isCmdEmitter; }
    set isCmdEmitter(p_value) { this._isCmdEmitter = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @group Command
     */
    get isCmdTrigger() { return this._isCmdTrigger; }
    set isCmdTrigger(p_value) { this._isCmdTrigger = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @group Command
     */
    get isCmdContext() { return this._isCmdContext; }
    set isCmdContext(p_value) { this._isCmdContext = p_value; }

    // ----> DOM

    _Render() {
        this.focusArea = this;
    }

    _OnPaintChange() {
        super._OnPaintChange();
        if (this._rippleWrapper) {
            dom.Detach(this._rippleWrapper);
            this._rippleWrapper = null;
        }
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
        if (!this._rippleWrapper) { return; }
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
    set options(p_value) { this.constructor.__distribute.Update(this, p_value); }

    /**
     * @description TODO
     * @type {object}
     */
    set altOptions(p_value) { this.constructor.__distribute.UpdateNoDefaults(this, p_value, null, false, false); }

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
            this.htitle = p_command.displayInfos.title;
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
        this.disabled = !p_command.isEnabled;
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

        if (this._command && this._isCmdTrigger) {
            if (this._isCmdEmitter) { this._command.emitter = this; }
            if (this._isCmdContext) { this._command.Execute(this); }
            else { this._command.Execute(); }
        }

        // ----> Trigger

        if (this._trigger) {
            if (this._trigger.arg === com.FLAGS.SELF) { u.Call(this._trigger, this); }
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

        this.Broadcast(SIGNAL.TRIGGERED, this);

        return true;

    }

    Toggle(p_value) {

        if (this._isToggled == p_value) { return; }

        this._isToggled = p_value;
        this._flags.Set(FLAGS.TOGGLED, p_value);

        let cbs = this._toggle;

        if (cbs) {
            if (this._isToggled) {
                if (cbs.arg === com.FLAGS.SELF) { u.Call(cbs, this); }
                else { u.Call(cbs); }
            } else {
                if (cbs.fnOff) {
                    if (cbs.fnOff.arg === com.FLAGS.SELF) { u.Call(cbs.fnOff, this); }
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
        this.Broadcast(SIGNAL.DEACTIVATED, this);

    }

    _CleanUp() {

        if (this._rippleWrapper) {
            dom.Detach(this._rippleWrapper);
            this._rippleWrapper = null;
        }

        this.htitle = ``;

        this.command = null;
        this._isCmdTrigger = true;
        this._isCmdEmitter = false;
        this._isCmdContext = false;

        this._isToggled = false;

        this.toggle = null;
        this.trigger = null;
        this.request = null;
        this.isActivable = true;

        this._flags.ApplyAll(false);
        this._sizeEnum.Set(this.constructor.__defaultSize);
        this._flavorEnum.Set(this.constructor.__defaultFlavor);
        this._variantEnum.Set(this.constructor.__defaultVariant);

        super._CleanUp();
    }


}

module.exports = WidgetButton;
//UI.Register(`nkmjs-widget-button`, WidgetButton);