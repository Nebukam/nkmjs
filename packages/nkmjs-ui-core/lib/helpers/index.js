'use strict';

const SIGNAL = require(`../signal`);
const WidgetSelection = require(`./widget-selection`);

module.exports = {

    RectTracker: require(`./rect-tracker`),
    SizeTracker: require(`./size-tracker`),
    CatalogBuilder: require(`./catalog-builder`),
    CatalogViewBuilder: require(`./catalog-view-builder`),
    FlagBox: require(`./flag-box`),
    FlagEnum: require(`./flag-enum`),
    Frame: require(`./frame`),
    Modal: require(`./modal`),
    WidgetSelection: WidgetSelection,
    Canvas: require(`./disposable-canvas-element`),
    DOMStreamer: require(`./dom-streamer`),

    /**
     * @access protected
     * @description TODO
     * @param {boolean} [p_allowMultiple] 
     * @param {boolean} [p_persistentData] 
     * @param {Object} [p_selectionRequestHandler] {add:{fn:}, remove:{fn:}, count:{fn:}, index:{fn:}}, callback arguments will be prepended.
     * @group Interactivity.Selection
     */
    HostSelStack: (p_host, p_allowMultiple = false, p_persistentData = false, p_requestHandlers = null) => {

        if (p_host._selStack) {
            p_host._selStack.allowMultiple = p_allowMultiple;
            p_host._selStack.persistentData = p_persistentData;
            return p_host._selStack;
        }

        let sel = new WidgetSelection();

        sel.allowMultiple = p_allowMultiple;
        sel.persistentData = p_persistentData;

        if (p_requestHandlers) {
            
            p_host.__selReqHandlers = p_requestHandlers;
            sel.data
                .Watch(SIGNAL.SEL_REQ_ADD,
                    (p_dataSel, p_index) => {
                        if (!p_host.__selReqHandlers.add) { return; }
                        nkm.u.CallPrepend(p_host.__selReqHandlers.add, p_dataSel, p_index);
                    }, p_host)
                .Watch(SIGNAL.SEL_REQ_REMOVE,
                    (p_dataSel, p_index) => {
                        if (!p_host.__selReqHandlers.remove) { return; }
                        nkm.u.CallPrepend(p_host.__selReqHandlers.remove, p_dataSel, p_index);
                    }, p_host)
                .Watch(SIGNAL.SEL_REQ_LENGTH,
                    (p_dataSel, p_fn) => {
                        if (!p_host.__selReqHandlers.count) { return; }
                        p_fn(nkm.u.CallPrepend(p_host.__selReqHandlers.count, p_dataSel));
                    }, p_host)
                .Watch(SIGNAL.SEL_REQ_INDEX,
                    (p_dataSel, p_data, p_fn) => {
                        if (!p_host.__selReqHandlers.index) { return; }
                        p_fn(nkm.u.CallPrepend(p_host.__selReqHandlers.index, p_dataSel, p_data));
                    }, p_host);

        }

        p_host._selStack = sel;
        return sel;

    }

}