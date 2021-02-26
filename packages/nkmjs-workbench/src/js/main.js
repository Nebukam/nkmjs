'use strict';

const { U } = require(`@nkmjs/core`).utils;
const { AppBase, AutoUpdateDialogBox } = require(`@nkmjs/core`).app;
const { POOL, COMMON_FLAG } = require("@nkmjs/core").common;
const { DialogInfos } = require("@nkmjs/core").dialog;

const { InputBase } = require("@nkmjs/core").inputs;
const { Group, BreadcrumbItem, Tag, InspectorShell, WorkspaceCellNav, DialogBox, DialogHandler, DialogInput, Editor, EditorEx } = require("@nkmjs/core").workspace;
const { ID, DataBlock, Catalog, CatalogItem } = require("@nkmjs/core").data;
const { UI, Layer, ButtonBase, UI_FLAG, Toolbar, View, PopIn, Drawer, TreeItem, DrawerNav } = require("@nkmjs/core").ui;

const UIItemListLayer = require("./ui-item-list-layer");
const UIItem = require("./ui-item");
const TestWidget = require(`./test-widget`);



class StyleguideApp extends AppBase {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._mainContainer = null;

        this._layers = [
            { id: `_mainContainer`, cl: UIItemListLayer }
        ];

        this._ignore = [
            AutoUpdateDialogBox, UIItem, UIItemListLayer, Group, BreadcrumbItem, DialogHandler, DialogInput, TestWidget
        ]

        this._buttonConfigs = [
            { htitle: `htitle A text`, label: 'Label A', trigger: { thisArg: this, fn: this._TriggerTest, arg: UI_FLAG.SELF }, variant: UI_FLAG.FRAME },
            { htitle: `htitle B text`, group: 'A', label: 'Label B', toggle: { thisArg: this, fn: this._TriggerTest, arg: UI_FLAG.SELF }, flavor: COMMON_FLAG.WARNING },
            { htitle: `htitle C text`, group: 'A', icon: '_', label: 'Label C', toggle: { thisArg: this, fn: this._TriggerTest, arg: UI_FLAG.SELF } },
            { htitle: `htitle D text`, label: 'Label D', trigger: { thisArg: this, fn: this._TriggerTest, arg: UI_FLAG.SELF }, flavor: UI_FLAG.CTA },
            { htitle: `htitle E text`, icon: '_', trigger: { thisArg: this, fn: this._TriggerTest, arg: UI_FLAG.SELF }, variant: UI_FLAG.FRAME, flavor: COMMON_FLAG.WARNING }
        ];

        this._dialogInfos = POOL.Rent(DialogInfos);
        this._dialogInfos.options = {
            title: `Title`,
            message: `This is a message !`,
            content: [],
            actions: this._buttonConfigs
        };

        let newData = (p_id, p_dirty = false) => {
            let data = POOL.Rent(DataBlock);
            data.id = ID.New(p_id);
            if (p_dirty) { data.Dirty(); }
            return data;
        };

        this._fakeData = [
            newData(`Data A`),
            newData(`Data B`, true),
            newData(`Data C`, true),
            newData(`Data D`),
            newData(`Data E`)
        ]

        this._catalogSample = Catalog.CreateFrom({
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

        this._drawerCatalog = () => {
            return Catalog.CreateFrom({
                name: `Drawer Catalog`
            }, [
                { name: `View`, viewType: View, data: this._fakeData[0] },
                { name: `Editor`, viewType: Editor, data: this._fakeData[1] },
                { name: `Extended editor`, viewType: EditorEx, data: this._fakeData[2] },
                { name: `InspectorShell`, viewType: InspectorShell, data: this._fakeData[3] },
                { name: `Another View`, viewType: View, data: this._fakeData[4] },
            ]);
        };

        console.log(this._dialogInfos);

    }

    AppReady() {
        super.AppReady();

        let keys = UI.instance._uiTypes.keys;

        this._mainContainer.SetVariants([
            {
                cl: ButtonBase,
                variants: [
                    { size: UI_FLAG.SIZE_XS },
                    { size: UI_FLAG.SIZE_S },
                    { size: UI_FLAG.SIZE_L },
                    { size: UI_FLAG.SIZE_M, flavor: COMMON_FLAG.INFOS },
                    { size: UI_FLAG.SIZE_M, flavor: COMMON_FLAG.WARNING },
                    { size: UI_FLAG.SIZE_M, flavor: COMMON_FLAG.ERROR },
                    { size: UI_FLAG.SIZE_M, flavor: UI_FLAG.CTA },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.MINIMAL },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.MINIMAL, flavor: COMMON_FLAG.INFOS },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.MINIMAL, flavor: COMMON_FLAG.WARNING },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.MINIMAL, flavor: COMMON_FLAG.ERROR },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.MINIMAL, flavor: UI_FLAG.CTA },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.FRAME },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.FRAME, flavor: COMMON_FLAG.INFOS },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.FRAME, flavor: COMMON_FLAG.WARNING },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.FRAME, flavor: COMMON_FLAG.ERROR },
                    { size: UI_FLAG.SIZE_M, variant: UI_FLAG.FRAME, flavor: UI_FLAG.CTA },
                ], fn: this._Bind(this._OnButtonCreated)
            },
            {
                cl: InspectorShell, fn: this._Bind(this._Stretch)
            },
            {
                cl: InputBase,
                variants: [
                    { size: UI_FLAG.SIZE_XS },
                    { size: UI_FLAG.SIZE_S },
                    { size: UI_FLAG.SIZE_L },
                ]
            },
            {
                cl: Toolbar, not: [WorkspaceCellNav, DrawerNav],
                variants: [
                    { size: UI_FLAG.SIZE_XS },
                    { size: UI_FLAG.SIZE_S },
                    { size: UI_FLAG.SIZE_L },
                ], fn: this._Bind(this._FillToolbar)
            },
            {
                cl: Tag,
                variants: [
                    {},
                    { size: UI_FLAG.SIZE_XS, flavor: COMMON_FLAG.WARNING },
                    { size: UI_FLAG.SIZE_S, flavor: COMMON_FLAG.ERROR }
                ], fn: this._Bind(this._PopInTag)
            },
            { cl: DialogBox, fn: this._Bind(this._FillDialog) },
            { cl: Drawer, fn: this._Bind(this._FillDrawer) },
            { cl: TreeItem, fn: this._Bind(this._FillTreeItem) },
        ]);

        //for (let i = 0, n = keys.length; i < n; i++) {
        for (let i = keys.length - 1; i >= 0; i--) {
            let key = keys[i];
            if (this._ignore.includes(key)) { continue; }
            let cl = UI.instance._uiTypes.Get(key);
            this._mainContainer.Handle(cl, key);
        }

    }

    // ----

    _FillToolbar(p_toolbar) {
        if (U.isInstanceOf(p_toolbar, DrawerNav)) { return; }
        for (let i = 0, n = this._buttonConfigs.length; i < n; i++) {
            p_toolbar.CreateHandle(this._buttonConfigs[i]);
        }
    }

    _FillDialog(p_dialogBox) {
        p_dialogBox.data = this._dialogInfos;
    }

    _FillDrawer(p_drawer) {
        p_drawer.catalog = this._drawerCatalog();
        this._Stretch(p_drawer);
    }

    _FillTreeItem(p_citem) {
        p_citem.data = this._catalogSample;
    }

    _PopInTag(p_tagItem) {
        return;
        PopIn.Pop({
            content: TestWidget,
            anchor: p_tagItem,
            placement: UI_FLAG.TOP_LEFT
        });
    }

    // ----

    _OnButtonCreated(p_btn) {
        p_btn.trigger = { fn: (btn) => { btn._flags.Toggle(UI_FLAG.TOGGLED); }, arg: UI_FLAG.SELF };
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