'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`../signal`);
const IDS = require(`../ids`);
const SIMPLEX = require(`../simplex`);

const SimpleData = require(`../data/simple-data-block`);

class SearchHeader extends SimpleData {

    constructor() { super(); }

    static __VALUES = {
        [IDS.SEARCH_ENABLED]: { value: false, signal: SIGNAL.SEARCH_TOGGLED },
        [IDS.SEARCH_TERMS]: { value: `` },
        [IDS.SEARCH_CASE_SENSITIVE]: { value: false },
        [IDS.SEARCH_EXACT_MATCH]: { value: false },
    };

    _Init() {
        super._Init();
        this._terms = [];
    }

    get enabled() { return this.Get(IDS.SEARCH_ENABLED); }

    CommitValueUpdate(p_id, p_newValue, p_oldValue, p_silent = false) {

        super.CommitValueUpdate(p_id, p_newValue, p_oldValue, p_silent);

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

        //Remove blanks
        for (let i = 0; i < this._terms.length; i++) {
            if (this._terms[i] == `` || this._terms[i].trim() == ``) {
                this._terms.splice(i, 1);
                i--;
            }
        }

        // Uppercase all
        if (!this._caseSensitive) {
            for (let i = 0; i < this._terms.length; i++) {
                this._terms[i] = this._terms[i].toUpperCase();
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
                    if (!identifierValue || !u.isString(identifierValue)) { continue; }

                    if (!this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

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
                    if (!identifierValue || !u.isString(identifierValue)) { continue; }

                    if (!this._caseSensitive) { identifierValue = identifierValue.toUpperCase(); }

                    if (this._CheckTerms(identifierValue)) {
                        pass = true;
                        break fetchLoop;
                    }

                }

            }

        }

        if (!pass && p_from._checkFn) { pass = u.Call(p_from._checkFn, p_item); }
        else if (!pass && !this._terms.length) { pass = true; }

        return pass;

    }

    _CheckTerms(p_value) {

        if (this._exactMatch) {
            if (p_value == this._terms[0]) { return true; }
        } else {
            for (let i = 0, n = this._terms.length; i < n; i++) {
                if (p_value.includes(this._terms[i])) { return true; }
            }
        }

        return false;

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = SearchHeader;