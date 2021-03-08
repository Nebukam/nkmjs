const { UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { OptionsHandler } = require(`@nkmjs/common`);

const UI = require(`../ui`);
const Layer = require(`./layer`);



/**
 * @description TODO
 */
class Overlay extends Layer {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._background = null;
        this._options = null;
        this._optionsHandler = new OptionsHandler(this._Bind(this._OnOptionsProcessed), this._Bind(this._OnOptionsWillUpdate));
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            '.bg': {
                'position': `absolute`,
                'top': `0px`,
                'left': `0px`,
                'width': `100%`,
                'height': `100%`
            }
        }, super._Style());
    }

    // ----> Options

    get options() { return this._options; }
    set options(p_value) {
        if (this._options == p_value || !p_value) { return; }
        this._options = p_value;
        this._optionsHandler.Process(this, p_value);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_options 
     * @customtag override-me
     */
    _OnOptionsWillUpdate(p_options) {
        if (!p_options) { return; }
        // TODO : Handle 'option.content
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_options 
     */
    _OnOptionsProcessed(p_options) {

    }


    _Render() {
        this._background = UDOM.New(`div`, { class: `bg` }, this._host);
    }

}

module.exports = Overlay;
UI.Register('nkmjs-overlay', Overlay);