'use strict';

const nkm = require(`@nkmjs/core`);
const u = nkm.u;
const com = nkm.com;
const { pool, FLAGS } = nkm.com;
const data = nkm.data;
const { DIALOG, DialogBox } = nkm.dialog;
const w = nkm.uiworkspace;
const ui = nkm.ui;
const uilib = nkm.uilib;
const datacontrols = nkm.datacontrols;

const UIItemListLayer = require("./ui-item-list-layer");
const UIItem = require("./ui-item");
const TestWidget = require(`./test-widget`);
const FeaturesWidget = require("./features-widget");
const PlaceholderView = require(`./placeholder-view`);


class StyleguideApp extends nkm.app.AppBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._mainContainer = null;
        this._delayedScrollIntoView = nkm.com.DelayedCall(this._Bind(this._ScrollToTarget));

        let keySource = {
            valA: "I'm A",
            valB: "I'm B, but A says: '%valA%'",
            valC: {
                A: "I'm A, but inside C",
                B: "I'm B, but inside C (with nested A: '%valA%')",
                C: () => { return `caca` },
                D: { fn: () => { return `meh` } }
            }
        };

        let testKeys = new nkm.com.helpers.Keys(keySource);
        let testString = "%valA%, %valC.A%, %valC.C%, %valC.B%, %valC.D%,";

        console.log(testKeys.ReplaceAll(testString));



        this._Bind(this._Dialog);
        this._Bind(this._Overlay);

        uilib.views.Shelf.__default_placeholderViewClass = PlaceholderView;

        this._layers = [
            { id: `_mainContainer`, cl: UIItemListLayer }
        ];

        console.log(nkm);

        this._ignore = [
            nkm.app.AutoUpdateDialogBox,
            UIItem,
            UIItemListLayer,
            w.helpers.Group,
            uilib.bars.BreadcrumbItem,
            TestWidget
        ];

        this._ignoreBroad = [
            ui.overlays.OverlayHandler,
            ui.overlays.Overlay

        ];

        this._buttonConfigs = [
            { htitle: `htitle A text`, label: 'Overlay', trigger: { fn: this._Overlay }, variant: ui.FLAGS.FRAME },
            { htitle: `htitle B text`, group: 'A', label: 'Label B', toggle: { thisArg: this, fn: this._TriggerTest, arg: com.FLAGS.SELF }, flavor: FLAGS.WARNING },
            { htitle: `htitle C text`, group: 'A', icon: 'download', label: 'Label C', toggle: { thisArg: this, fn: this._TriggerTest, arg: com.FLAGS.SELF } },
            { htitle: `htitle D text`, label: 'Popup', trigger: { fn: this._Dialog }, flavor: ui.FLAGS.CTA },
            { htitle: `htitle E text`, icon: 'refresh', trigger: { thisArg: this, fn: this._Popin, arg: com.FLAGS.SELF }, variant: ui.FLAGS.FRAME, flavor: FLAGS.WARNING }
        ];

        let newData = (p_id, p_dirty = false) => {
            let newData = nkm.com.Rent(nkm.data.DataBlock);
            newData.id = nkm.data.ID.New(p_id);
            if (p_dirty) { newData.Dirty(); }
            return newData;
        };

        this._fakeData = [
            newData(`Data A`),
            newData(`Data B`, true),
            newData(`Data C`, true),
            newData(`Data D`),
            newData(`Data E`)
        ]

        this._catalogSample = nkm.data.catalogs.CreateFrom({
            name: `I'm a Catalog !`
        }, [
            { name: `item 0` },
            { name: `item 1`, data: this._fakeData[0] },
            {
                name: `folder 0`,
                content: [
                    { name: `subitem 0-0` },
                    { name: `subitem 0-1`, data: this._fakeData[1] }
                ]
            },
            { name: `item 2` },
            {
                name: `folder 1`, data: this._fakeData[3],
                content: [
                    { name: `subitem 1-0` },
                    { name: `subitem 1-1` }
                ]
            },
            { name: `item 3` },
        ]);

        this._shelfCatalog = () => {
            return nkm.data.catalogs.CreateFrom({
                name: `Shelf Catalog`
            }, [
                { name: `View`, [ui.IDS.VIEW_CLASS]: ui.views.View, data: this._fakeData[0] },
                { name: `Editor`, [ui.IDS.VIEW_CLASS]: datacontrols.Editor, data: this._fakeData[1] },
                { name: `Extended editor`, [ui.IDS.VIEW_CLASS]: w.editors.EditorEx, data: this._fakeData[2] },
                { name: `InspectorShell`, [ui.IDS.VIEW_CLASS]: datacontrols.InspectorShell, data: this._fakeData[3] },
                { name: `Another View`, [ui.IDS.VIEW_CLASS]: ui.views.View, data: this._fakeData[4] },
            ]);
        };

    }

    AppReady() {
        super.AppReady();
        this._scrollTarget = null;

        let keys = ui.UI._uiTypes.keys,
            cardBtns = [
                { htitle: `htitle A text`, label: 'Overlay', trigger: { fn: this._Overlay } },
                { htitle: `htitle E text`, icon: 'refresh', trigger: { fn: this._Dialog } }
            ],
            cardOptAll = {
                [ui.IDS.TITLE]: `Card title`,
                [ui.IDS.SUBTITLE]: `This is the subtitle`,
                [ui.IDS.LABEL]: `And so, look, here's an additional label for times of need.`,
                [ui.IDS.ICON]: `locked`,
                actions: cardBtns
            },
            cardOptA = {
                [ui.IDS.TITLE]: `Card title`,
                [ui.IDS.SUBTITLE]: `This is the subtitle`,
                [ui.IDS.ICON]: `locked`,
            },
            cardOptB = {
                [ui.IDS.TITLE]: `Card title`,
                [ui.IDS.LABEL]: `And so, look, here's an additional label for times of need.`,
                [ui.IDS.ICON]: `locked`,
            },
            cardOptC = {
                [ui.IDS.TITLE]: `Card title`,
                [ui.IDS.LABEL]: `And so, look, here's an additional label for times of need.`,
                [ui.IDS.ICON]: `locked`,
            };

        this._mainContainer.SetVariants([
            {
                cl: ui.WidgetButton,
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, flavor: ui.FLAGS.CTA },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: com.FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: com.FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: com.FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: ui.FLAGS.CTA },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: com.FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: com.FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: com.FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: ui.FLAGS.CTA },
                ], fn: this._Bind(this._OnButtonCreated)
            },
            {
                cl: w.inspectors.InspectorShell, fn: this._Bind(this._Stretch)
            },
            {
                cl: ui.inputs.InputBase,
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                ]
            },
            {
                cl: ui.inputs.InputNumberBase,
                fn: this._Bind(this._OnNumberInputCreated)
            },
            {
                cl: ui.inputs.InputCatalogBase, fn: this._Bind(this._FillCatalogInput)
            },
            {
                cl: ui.WidgetBar, not: [w.WorkspaceCellNav, ui.views.ShelfNav],
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                ], fn: this._Bind(this._FillToolbar)
            },
            {
                cl: uilib.widgets.Tag,
                variants: [
                    {},
                    { size: ui.FLAGS.SIZE_XS, flavor: com.FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_S, flavor: com.FLAGS.ERROR }
                ], fn: this._Bind(this._PopInTag)
            },
            {
                cl: DialogBox,
                variants: [
                    {},
                    { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.FRAME },
                    { flavor: com.FLAGS.INFOS, variant: ui.FLAGS.MINIMAL },
                    { flavor: com.FLAGS.ERROR }
                ], fn: this._Bind(this._FillDialog)
            },
            {
                cl: uilib.views.Shelf,
                variants: [
                    { orientation: ui.FLAGS.HORIZONTAL, navPlacement: ui.FLAGS.TOP },
                    { orientation: ui.FLAGS.HORIZONTAL, navPlacement: ui.FLAGS.BOTTOM },
                    { orientation: ui.FLAGS.VERTICAL, navPlacement: ui.FLAGS.LEFT },
                    { orientation: ui.FLAGS.VERTICAL, navPlacement: ui.FLAGS.RIGHT },
                ], fn: this._Bind(this._FillShelf)
            },
            { cl: ui.WidgetItem, fn: this._Bind(this._FillTreeItem) },
            {
                cl: uilib.cards.BaseCard,
                variants: [
                    { flavor: com.FLAGS.INFOS, ['header-placement']: ui.FLAGS.TOP, ...cardOptAll },
                    { flavor: com.FLAGS.WARNING, ['header-placement']: ui.FLAGS.LEFT, ...cardOptAll },
                    { flavor: com.FLAGS.ERROR, ['header-placement']: ui.FLAGS.BOTTOM, ...cardOptAll },
                    { flavor: com.FLAGS.READY, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptAll },
                    { flavor: com.FLAGS.INFOS, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.TOP, ...cardOptA },
                    { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.LEFT, ...cardOptA },
                    { flavor: com.FLAGS.ERROR, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.BOTTOM, ...cardOptA },
                    { flavor: com.FLAGS.READY, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptA },
                    { flavor: com.FLAGS.INFOS, ['header-placement']: ui.FLAGS.TOP, ...cardOptB },
                    { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.MINIMAL, ['header-placement']: ui.FLAGS.LEFT, ...cardOptB },
                    { flavor: com.FLAGS.ERROR, variant: ui.FLAGS.MINIMAL, ['header-placement']: ui.FLAGS.BOTTOM, ...cardOptB },
                    { flavor: com.FLAGS.READY, variant: ui.FLAGS.MINIMAL, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptB },
                ], fn: this._Bind(this._OnCardCreated)
            },
            {
                cl: uilib.cards.Icon,
                variants: [
                    { flavor: com.FLAGS.INFOS, ['header-placement']: ui.FLAGS.TOP, ...cardOptAll },
                    { flavor: com.FLAGS.WARNING, ['header-placement']: ui.FLAGS.LEFT, ...cardOptAll },
                    { flavor: com.FLAGS.READY, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptAll },
                    { flavor: com.FLAGS.INFOS, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.TOP, ...cardOptA },
                    { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.LEFT, ...cardOptA },
                    { flavor: com.FLAGS.READY, variant: ui.FLAGS.FRAME, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptA },
                    { flavor: com.FLAGS.INFOS, ['header-placement']: ui.FLAGS.TOP, ...cardOptB },
                    { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.MINIMAL, ['header-placement']: ui.FLAGS.LEFT, ...cardOptB },
                    { flavor: com.FLAGS.READY, variant: ui.FLAGS.MINIMAL, ['header-placement']: ui.FLAGS.RIGHT, ...cardOptB },
                ], fn: this._Bind(this._OnCardCreated)
            }
        ]);

        outerloop:
        for (let i = keys.length - 1; i >= 0; i--) {
            let key = keys[i];
            if (this._ignore.includes(key)) { continue; }

            innerloop:
            for (let a = 0; a < this._ignoreBroad.length; a++) {
                if (u.isInstanceOf(key, this._ignoreBroad[a])) { continue outerloop; }
            }

            if (i === 0) {
                this._mainContainer.Handle(`Features`, FeaturesWidget);
            }
            let cl = ui.UI._uiTypes.Get(key);
            this._mainContainer.Handle(cl, key);
        }

        // Dialog push
        //setTimeout(this._Dialog, 500);

        // Generate overlay request
        //setTimeout(this._Bind(this._Overlay), 1000);

        //this._scrollTarget = this._firsttreeItem;

    }

    AppDisplay() {
        super.AppDisplay();
        this._delayedScrollIntoView.Schedule();
    }

    _ScrollToTarget() {
        console.log(`scrollTarget`, this._scrollTarget);
        if (this._scrollTarget) { this._scrollTarget.scrollIntoView(); }
    }

    _Dialog() {

        if (!this._dialogOptions) {
            this._dialogOptions = [
                { flavor: null, variant: null, title: `Hey there !`, msg: `This popup is the default template. No flavor nor variant set.` },
                { flavor: com.FLAGS.READY, variant: ui.FLAGS.FRAME, title: `Nice.`, msg: `This popup uses the ERROR flavor, and FRAME variant.` },
                { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.FRAME, title: `Attention !`, msg: `This popup uses the WARNING flavor, and FRAME variant.` },
                { flavor: com.FLAGS.ERROR, variant: ui.FLAGS.MINIMAL, title: `Oh no !`, msg: `This popup uses the ERROR flavor, and MINIMAL variant.` },
                { flavor: com.FLAGS.WARNING, variant: ui.FLAGS.MINIMAL, title: `Warning !`, msg: `This popup uses the WARNING flavor, and MINIMAL variant.` },
                { flavor: com.FLAGS.ERROR, variant: ui.FLAGS.FRAME, title: `Something went wrong !`, msg: `This popup uses the ERROR flavor, and FRAME variant.` },
                { flavor: ui.FLAGS.CTA, variant: ui.FLAGS.FRAME, title: `Do Something !`, msg: `This popup uses the ui.CTA flavor, and FRAME variant.` },
            ];
        }

        let opts = this._dialogOptions.pop();
        if (this._dialogOptions.length == 0) { this._dialogOptions = null; }

        DIALOG.Push({
            title: opts.title,
            message: opts.msg,
            actions: [
                { label: `Open Drawer`, trigger: { fn: this._Overlay, thisArg: this } },
                { label: `Again`, trigger: { fn: this._Dialog, thisArg: this }, flavor: opts.flavor },
                { label: `Close` }
            ],
            origin: this,
            flavor: opts.flavor,
            variant: opts.variant
        });
    }

    _Overlay() {

        if (!this._drawerOptions) {
            this._drawerOptions = [
                { orientation: ui.FLAGS.VERTICAL, placement: ui.FLAGS.BOTTOM },
                { orientation: ui.FLAGS.HORIZONTAL, placement: ui.FLAGS.LEFT },
                { orientation: ui.FLAGS.VERTICAL, placement: ui.FLAGS.TOP },
                { orientation: ui.FLAGS.HORIZONTAL, placement: ui.FLAGS.RIGHT }
            ];
        }

        let opts = this._drawerOptions.pop();
        if (this._drawerOptions.length == 0) { this._drawerOptions = null; }

        opts.title = `Drawer Title`;

        nkm.actions.Emit(uilib.REQUEST.DRAWER, opts, this);
    }


    // ----

    _FillToolbar(p_toolbar) {
        if (u.isInstanceOf(p_toolbar, uilib.views.ShelfNav)) { return; }
        for (let i = 0, n = this._buttonConfigs.length; i < n; i++) {
            p_toolbar.CreateHandle(this._buttonConfigs[i]);
        }
    }

    _FillDialog(p_dialogBox, p_variant) {
        p_dialogBox.data = ui.overlays.OverlayOptions.Create({
            title: p_variant ? p_variant.flavor ? p_variant.flavor : `Title` : `Title`,
            message: `This is a message !`,
            content: [],
            flavor: p_variant ? p_variant.flavor : null,
            variant: p_variant ? p_variant.variant : null,
            actions: this._buttonConfigs
        });
    }

    _FillShelf(p_shelf) {
        p_shelf.catalog = this._shelfCatalog();
        this._Stretch(p_shelf);
    }

    _FillTreeItem(p_citem) {
        if (!this._firsttreeItem) { this._firsttreeItem = p_citem; }
        p_citem.data = this._catalogSample;
    }

    _FillCatalogInput(p_input) {
        p_input.data = this._shelfCatalog();
        this._scrollTarget = p_input;
        p_input.currentValue = p_input.data._items[p_input.data._items.length - 1];
    }

    _PopInTag(p_tagItem) {
        return;
        ui.helpers.Modal.Pop({
            content: TestWidget,
            anchor: p_tagItem,
            placement: ui.FLAGS.TOP_LEFT
        });
    }

    // ----

    _OnNumberInputCreated(p_input) {
        console.warn(`YO`);
        p_input.options = {
            min: -10,
            max: 10,
            step: 0.01,
            currentValue: 2
        };
    }

    _OnButtonCreated(p_btn) {
        p_btn.trigger = { fn: (btn) => { btn._flags.Toggle(ui.FLAGS.TOGGLED); }, arg: com.FLAGS.SELF };
        p_btn.icon = `icon`;
        //this._PopInTag(p_btn);
    }

    _OnCardCreated(p_card, p_variant) {
        p_card.data = p_variant;
        p_card.title = `I am a ${u.tils.CamelSplit(p_card.constructor.name)}`;
        //this._scrollTarget = p_card;
    }

    _OnInputCreated(p_input) {
        //this._scrollTarget = p_input;
    }

    _TriggerTest(p_source) {
        console.log(`triggered : ${p_source}`);
    }


    _Popin(p_btn) {


        if (!this._popinOptions) {
            this._popinOptions = [
                {
                    placement: ui.ANCHORING.BOTTOM,
                    origin: ui.ANCHORING.TOP_LEFT
                },
            ];
        }

        let opts = this._popinOptions.pop();
        if (this._popinOptions.length == 0) { this._popinOptions = null; }

        let popin = ui.helpers.Modal.Pop({
            content: TestWidget,
            anchor: p_btn,
            //context: p_btn,
            //static: true,
            placement: opts.placement,
            origin: opts.origin
        });

    }

    _Stretch(p_source) {
        ui.dom.CSS(p_source.parentElement, 'align-items', `stretch`);
    }



}

module.exports = StyleguideApp;