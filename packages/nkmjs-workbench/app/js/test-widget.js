'use strict';

const nkm = require(`@nkmjs/core`);

class TestWidget extends nkm.ui.Widget {
    constructor() { super(); }

    static _Style() {
        return {
            ':host': {
                'background-color': 'rgb(0,255,0,0.5)',
                'width': '150px', 'height': '150px',
                'margin': '5px'
            },
            '.close': {
                'position': 'absolute',
                'top': 0,
                'right': 0
            }
        };
    }

    _Render() {
        super._Render();
        this.Attach(nkm.uilib.buttons.Tool, `close`).options = {
            'icon': `close-small`,
            trigger: { arg: this, fn: (s) => { s.Broadcast(nkm.ui.SIGNAL.CLOSE_REQUESTED, s); } }
        }
    }

}

module.exports = TestWidget;
nkm.ui.Register(`nkmjs-test-widget`, TestWidget);