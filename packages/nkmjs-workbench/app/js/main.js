'use strict';

const nkm = require(`@nkmjs/core`);
const u = nkm.utils;
const { AppBase, AutoUpdateDialogBox } = nkm.app;
const { Request } = nkm.actions;
const { pool, FLAGS } = nkm.common;
const { DIALOG, DialogBox, DialogHandler } = nkm.dialog;
const { InputBase } = nkm.inputs;
const { Group, BreadcrumbItem, Tag, InspectorShell, WorkspaceCellNav, Editor, EditorEx } = nkm.workspace;
const data = nkm.data;
const ui = nkm.ui;
const UIItemListLayer = require("./ui-item-list-layer");
const UIItem = require("./ui-item");
const TestWidget = require(`./test-widget`);



class StyleguideApp extends nkm.app.AppBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._mainContainer = null;

        this._Bind(this._Dialog);
        this._Bind(this._Overlay);

        this._layers = [
            { id: `_mainContainer`, cl: UIItemListLayer }
        ];

        this._ignore = [
            nkm.app.AutoUpdateDialogBox, UIItem, UIItemListLayer, Group, BreadcrumbItem, DialogHandler, TestWidget
        ]

        this._buttonConfigs = [
            { htitle: `htitle A text`, label: 'Overlay', trigger: { fn: this._Overlay }, variant: ui.FLAGS.FRAME },
            { htitle: `htitle B text`, group: 'A', label: 'Label B', toggle: { thisArg: this, fn: this._TriggerTest, arg: ui.FLAGS.SELF }, flavor: FLAGS.WARNING },
            { htitle: `htitle C text`, group: 'A', icon: 'icons-01', label: 'Label C', toggle: { thisArg: this, fn: this._TriggerTest, arg: ui.FLAGS.SELF } },
            { htitle: `htitle D text`, label: 'Popup', trigger: { fn: this._Dialog }, flavor: ui.FLAGS.CTA },
            { htitle: `htitle E text`, icon: 'icon', trigger: { thisArg: this, fn: this._TriggerTest, arg: ui.FLAGS.SELF }, variant: ui.FLAGS.FRAME, flavor: FLAGS.WARNING }
        ];

        let newData = (p_id, p_dirty = false) => {
            let newData = pool.POOL.Rent(data.DataBlock);
            newData.id = data.ID.New(p_id);
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

        this._catalogSample = data.catalogs.Catalog.CreateFrom({
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
            return data.catalogs.Catalog.CreateFrom({
                name: `Shelf Catalog`
            }, [
                { name: `View`, viewType: ui.views.View, data: this._fakeData[0] },
                { name: `Editor`, viewType: Editor, data: this._fakeData[1] },
                { name: `Extended editor`, viewType: EditorEx, data: this._fakeData[2] },
                { name: `InspectorShell`, viewType: InspectorShell, data: this._fakeData[3] },
                { name: `Another View`, viewType: ui.views.View, data: this._fakeData[4] },
            ]);
        };

    }

    AppReady() {
        super.AppReady();

        let keys = ui.UI.instance._uiTypes.keys;

        this._mainContainer.SetVariants([
            {
                cl: ui.ButtonBase,
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, flavor: FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, flavor: ui.FLAGS.CTA },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.MINIMAL, flavor: ui.FLAGS.CTA },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: FLAGS.INFOS },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: FLAGS.ERROR },
                    { size: ui.FLAGS.SIZE_M, variant: ui.FLAGS.FRAME, flavor: ui.FLAGS.CTA },
                ], fn: this._Bind(this._OnButtonCreated)
            },
            {
                cl: InspectorShell, fn: this._Bind(this._Stretch)
            },
            {
                cl: InputBase,
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                ]
            },
            {
                cl: ui.helpers.Toolbar, not: [WorkspaceCellNav, ui.views.ShelfNav],
                variants: [
                    { size: ui.FLAGS.SIZE_XS },
                    { size: ui.FLAGS.SIZE_S },
                    { size: ui.FLAGS.SIZE_L },
                ], fn: this._Bind(this._FillToolbar)
            },
            {
                cl: Tag,
                variants: [
                    {},
                    { size: ui.FLAGS.SIZE_XS, flavor: FLAGS.WARNING },
                    { size: ui.FLAGS.SIZE_S, flavor: FLAGS.ERROR }
                ], fn: this._Bind(this._PopInTag)
            },
            { cl: DialogBox,
                variants: [
                    {},
                    { flavor: FLAGS.WARNING },
                    { flavor: FLAGS.INFOS },
                    { flavor: FLAGS.ERROR }
                ], fn: this._Bind(this._FillDialog) },
            {
                cl: ui.views.Shelf,
                variants: [
                    { orientation: ui.FLAGS.HORIZONTAL, navPlacement: ui.FLAGS.TOP },
                    { orientation: ui.FLAGS.HORIZONTAL, navPlacement: ui.FLAGS.BOTTOM },
                    { orientation: ui.FLAGS.VERTICAL, navPlacement: ui.FLAGS.LEFT },
                    { orientation: ui.FLAGS.VERTICAL, navPlacement: ui.FLAGS.RIGHT },
                ], fn: this._Bind(this._FillShelf)
            },
            { cl: ui.tree.TreeItem, fn: this._Bind(this._FillTreeItem) },
        ]);

        //for (let i = 0, n = keys.length; i < n; i++) {
        for (let i = keys.length - 1; i >= 0; i--) {
            let key = keys[i];
            if (this._ignore.includes(key)) { continue; }
            let cl = ui.UI.instance._uiTypes.Get(key);
            this._mainContainer.Handle(cl, key);
        }

        // Dialog push
        //setTimeout(this._Dialog, 500);

        // Generate overlay request
        //setTimeout(this._Bind(this._Overlay), 1000);
    }

    _Dialog() {
        DIALOG.Push({
            title: `Welcome to the NKMjs Workbench`,
            actions: [
                { label: `Open Drawer`, trigger: { fn: this._Overlay, thisArg: this } },
                { label: `Close` }
            ],
            origin: this
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

        Request.Emit(ui.REQUEST.DRAWER, opts, this);
    }


    // ----

    _FillToolbar(p_toolbar) {
        if (u.tils.isInstanceOf(p_toolbar, ui.views.ShelfNav)) { return; }
        for (let i = 0, n = this._buttonConfigs.length; i < n; i++) {
            p_toolbar.CreateHandle(this._buttonConfigs[i]);
        }
    }

    _FillDialog(p_dialogBox, p_variant) {
        p_dialogBox.data = ui.overlays.OverlayOptions.Create({
            title: p_variant ? p_variant.flavor ? p_variant.flavor : `Title` :`Title`,
            message: `This is a message !`,
            content: [],
            flavor: p_variant ? p_variant.flavor : null,
            actions: this._buttonConfigs
        });
    }

    _FillShelf(p_shelf) {
        p_shelf.catalog = this._shelfCatalog();
        this._Stretch(p_shelf);
    }

    _FillTreeItem(p_citem) {
        p_citem.data = this._catalogSample;
    }

    _PopInTag(p_tagItem) {
        return;
        ui.helpers.PopIn.Pop({
            content: TestWidget,
            anchor: p_tagItem,
            placement: ui.FLAGS.TOP_LEFT
        });
    }

    // ----

    _OnButtonCreated(p_btn) {
        p_btn.trigger = { fn: (btn) => { btn._flags.Toggle(ui.FLAGS.TOGGLED); }, arg: ui.FLAGS.SELF };
        //this._PopInTag(p_btn);
    }

    _TriggerTest(p_source) {
        console.log(`triggered : ${p_source}`);
    }

    _Stretch(p_source) {
        p_source.parentElement.style.setProperty(`align-items`, `stretch`);
    }



}

module.exports = StyleguideApp;