'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { POOL } = require(`@nkmjs/common`);
const { UI, UI_SIGNAL, ExtExpand, ToolButton, Toolbar, ImageManipulator, TextManipulator } = require(`@nkmjs/ui-core`);

const Control = require(`./control.js`);

/**
 * 
 *  *----------------------*
 *  | + []Title     [][][] |
 *  *----------------------*
 * 
 */
class ControlGroup extends Control{
    constructor(){super();}

    _Init(){
        
        super._Init();

        this._extExpand = new ExtExpand();
        this._extExpand._isExpanded = false;
        this._extExpand.Watch(UI_SIGNAL.EXPANDED, this._Expand, this);
        this._extExpand.Watch(UI_SIGNAL.COLLAPSED, this._Collapse, this);

        this._header = null;
        this._expandBtn = null;
        this._icon = null;
        this._label = null;

        this._toolbarClass = Toolbar;
        this._toolbar = null;

        this._itemWrapper = null;

    }

    _PostInit(){
        super._PostInit();
        this._extExpand.Setup( this, this._itemWrapper, this._expandBtn );
    }

    // ----> DOM

    _Style(){
        return U.Merge(super._Style(), {
            ':host':{

            },
            '.header':{
                position:`relative`,
                display:`flex`,

                'flex-direction':`row`,
                'align-items':`center`,
                'align-content':`stretch`,
                'padding':`4px`,
                'box-sizing':`border-box`,

                flex:`0 1 auto`,
            },
                '.toggle':{ flex:`0 0 auto` },
                '.facade':{ flex:`1 1 auto` },
                '.toolbar':{ flex:`0 0 auto` },
                
            '.content':{

            },
            '.content.expanded':{
                display:`flex`
            },
            '.content.collapsed':{
                display:`none`
            }
        });
    }

    _Render(){

        this._header = UDOM.New(`div`, { class:`header` }, this._host);

        this._expandBtn = this.Add(ToolButton, `toggle`, this._header);
        this._icon = new ImageManipulator(UDOM.New(`span`, {class:`icon`}, this._header));
        this._label = new TextManipulator(UDOM.New(`span`, {class:`label`}, this._header));
        this._toolbar = this.Add(this._toolbarClass, `toolbar`, this._header);
        
        this._expandBtn.icon = '%ICON%/icon_expand_arrow.svg';
        this._expandBtn.scale = 0.75;

        this._itemWrapper = UDOM.New(`div`, { class:`content` }, this._host);

        this.focusArea = this._header;

    }

    Expand(){ this._extExpand.Expand(); }
    _Expand(){
        if(this._data){ this._data.expanded = true; }
        this._expandBtn.rotation = 90;
    }

    Collapse(){ this._extExpand.Collapse(); }
    _Collapse(){
        if(this._data){ this._data.expanded = false; }
        this._expandBtn.rotation = 0;
    }

    Activate(p_evt){
        if(this._expandBtn.focused){return false;}
        return super.Activate(p_evt);
    }

    _CleanUp(){
        super._CleanUp();
    }

}

module.exports = ControlGroup;
UI.Register(`nkmjs-control-group`, ControlGroup);
