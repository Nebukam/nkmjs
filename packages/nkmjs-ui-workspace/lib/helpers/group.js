const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const base = ui.WidgetOrientable;

class Group extends base {
    constructor() { super(); }

    static GROUP_CREATED = Symbol(`groupCreated`);

    _Init() {
        super._Init();
        this._header = null;
        this._footer = null;

        this._groupMap = new collections.Dictionary();
        this._groupList = [];

    }

    // ----> DOM

    get header() { return this._header; }
    get body() { return this._wrapper; }
    get footer() { return this._footer; }

    static _Style() {
        return {
            ':host': {
                ...style.rules.pos.rel,
                ...style.rules.display.flex,
                ...style.rules.item.fill,
                'margin-bottom': `20px`
            },
            '.header': {
                ...style.rules.pos.rel,
                ...style.rules.item.fixed,
            },
            '.footer': {
                ...style.rules.pos.rel,
                ...style.rules.item.fixed,
            },
            '.body': {
                ...style.rules.pos.rel,
                ...style.rules.item.fill,
            },
            ':host(.horizontal) .body': {
                ...style.rules.flex.row.wrap,
                'align-content': `flex-start`,
                'align-items': `flex-start`,
            },
            ':host(.vertical) .body': {
                ...style.rules.flex.column.nowrap,
                ...style.rules.flex.stretch,
            }

        }
    }

    _Render() {
        this._header = ui.dom.El(`div`, { class: `header` }, this._host);
        this._wrapper = ui.dom.El(`div`, { class: `body` }, this._host);
        this._footer = ui.dom.El(`div`, { class: `footer` }, this._host);
    }

    _GetOrCreateGroup(p_key, p_flags = null, p_class = null) {
        p_class = (p_class || Group);
        let group = this._groupMap.Get(p_key);
        if (!group) {

            group = this.Attach(p_class, `group tile-ctnr`, this._viewport.wrapper);
            this._groupMap.Set(p_key, group);
            this._groupList.push(group);

            if (p_flags) {
                for (let member in p_flags) {
                    group._flags.Set(member, p_flags[member]);
                }
            }

            this._OnGroupCreated(p_key, group);
            this.Broadcast(Group.GROUP_CREATED, this, group);
        }
        return group;
    }

    _OnGroupCreated(p_key, p_group) {

    }

    _ClearGroup(p_key) {
        let group = this._groupMap.Get(p_key);
        if (group) {
            let index = this._groupList.indexOf(group);
            this._groupList.splice(index, 1);
            this._groupMap.Remove(p_key);
            group.Release();
        }
    }

    _ClearAllGroups() {
        this._groupMap.Clear();
        let list = this._groupList;
        for (let i = 0, n = list.length; i < n; i++) {
            list[i].Release();
        }
        list.length = 0;
    }

    _CleanUp() {
        super._CleanUp();
        this._ClearAllGroups();
    }

}

module.exports = Group;
ui.Register('nkmjs-group', Group);