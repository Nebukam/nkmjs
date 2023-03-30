'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`../signal`);
const IDS = require(`../ids`);
const SIMPLEX = require(`../simplex`);

const SimpleData = require(`../data/simple-data-block`);

class SearchHeader extends SimpleData {

    constructor() { super(); }

    static __VALUES = [
        { id: IDS.SEARCH_ENABLED, value: false },
        { id: IDS.SEARCH_TERMS, value: `` },
        { id: IDS.SEARCH_CASE_SENSITIVE, value: false },
        { id: IDS.SEARCH_EXACT_MATCH, value: false },
    ];

    static __VALUES_SIGNALS = {
        [IDS.SEARCH_ENABLED]: SIGNAL.SEARCH_TOGGLED
    }

    _Init() {
        super._Init();
        this._terms = [];
    }

    get enabled() { return this.Get(IDS.SEARCH_ENABLED); }

    CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent = false) {

        super.CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent);

        if (!this.enabled) { return; }

        let descriptor = SIMPLEX.GetDescriptor(p_id);

        if (!descriptor || !descriptor.recompute)
            return;

        this._RefreshParams();

    }

    _RefreshParams() {

        this._caseSensitive = this.Get(IDS.SEARCH_CASE_SENSITIVE);
        this._exactMatch = this.Get(IDS.SEARCH_EXACT_MATCH);

        this._terms = this._exactMatch ? this.Get(IDS.SEARCH_TERMS).trim() : this.Get(IDS.SEARCH_TERMS).split(` `);

        if (!this._caseSensitive) {
            for (let i = 0; i < this._terms.length; i++) {
                let t = this._terms[i].trim();
                if (t == ``) { this._terms.splice(i, 1); i--; }
                this._terms[i] = t;
            }
        }

        this.Broadcast(SIGNAL.SEARCH_PARAMS_UPDATED, this);

    }

    _Check(p_item, p_from) {

        let pass = false;

        if (this._terms.length != 0) {

            let list = p_from._identifiers;
            if (!pass && list.length) {

                identifierLoop: for (let i = 0, n = list.length; i < n; i++) {

                    let identifierValue = p_item[list[i]];
                    if (!identifierValue || u.isString(identifierValue)) { continue; }

                    if (this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

                    if (this._CheckTerms(identifierValue)) {
                        pass = true;
                        break identifierLoop;
                    }

                }
            }

            list = p_from._fetchFns
            if (!pass && list.length) {

                list = p_from._fetchFns;

                fetchLoop: for (let i = 0, n = list.length; i < n; i++) {

                    let identifierValue = list[i](p_item);
                    if (!identifierValue || u.isString(identifierValue)) { continue; }

                    if (this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

                    if (this._CheckTerms(identifierValue)) {
                        pass = true;
                        break fetchLoop;
                    }

                }

            }

            if (!pass && p_from._checkFn) { pass = u.Call(p_from._checkFn, p_item); }

            return pass;

        }

    }

    _CheckTerms(p_value) {

        if (this._exactMatch) {
            if (iValue == this._terms[0]) { return true; }
        } else {
            for (let t = 0, n = this._terms.length; i < n; i++) {
                if (iValue.includes(this._terms[i])) { return true; }
            }
        }

        return false;

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = SearchHeader;