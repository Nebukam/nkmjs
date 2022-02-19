'use strict';

const isVoid = require(`./helpers/isVoid`);

/**
 * A list of item that does not accept duplicates nor null values.
 * @class
 * @memberof collections
 */
class List {

    constructor(p_length = 0) {
        this._array = new Array(p_length);
    }

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    get internalArray() { return this._array; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty() { return (this._array.length === 0); }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._array.length; }

    /**
     * @description TODO
     * @type {*}
     * @customtag read-only
     */
    get first() { return this._array[0]; }

    /**
     * @description TODO
     * @type {*}
     * @customtag read-only
     */
    get last() { return this._array[this._array.length - 1]; }

    /**
     * @description Return whether or not the List contains the given item.
     * @param {*} p_item 
     */
    Contains(p_item) {
        return this._array.includes(p_item);
    }

    /**
     * @description TODO
     * @param {*} p_item 
     */
    IndexOf(p_item) {
        return this._array.indexOf(p_item);
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {boolean} True if the item has been added to the list, otherwise false.
    */
    Add(p_item) {
        if (isVoid(p_item)) { return false; }
        if (this._array.includes(p_item)) { return false; }
        this._array.push(p_item);
        return true;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {boolean} True if the item has been added to the list, otherwise false.
    */
    Unshift(p_item){
        if (isVoid(p_item)) { return false; }
        if (this._array.includes(p_item)) { 
            let index = this._array.indexOf(p_item);
            if(index != 0){this._array.splice(index, 1); }
        }
        this._array.unshift(p_item);
        return true;
    }


    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*} 
     */
    Remove(p_item) {
        if (isVoid(p_item)) { return false; }
        return this.RemoveAt(this._array.indexOf(p_item));
    }

    /**
     * @description TODO
     * @param {*} p_index 
     * @returns {*} 
     */
    RemoveAt(p_index) {
        if (p_index < 0 || p_index >= this._array.length) { return false; }
        return this._array.splice(p_index, 1)[0];
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @param {*} p_index 
     * @returns {*} 
     */
    Insert(p_item, p_index) {
        if (isVoid(p_item)) { return false; }

        let index = this._array.indexOf(p_item);
        if (index != -1) { return; }
        if (p_index >= this._array.length) {
            this._array.push(p_item);
            return p_item;
        }
        this._array.splice(p_index, 0, p_item);
        return p_item;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @param {*} p_index 
     * @returns {*} 
     */
    Move(p_item, p_index) {
        if (isVoid(p_item)) { return false; }
        let index = this._array.indexOf(p_item);
        if (index == -1) { return false; }
        this._array.splice(index, 1);
        if (p_index >= this._array.length) { this._array.push(p_item); }
        else { this._array.splice(p_index, 0, p_item); }
        return p_item;
    }

    MoveBefore(p_item, p_beforeItem) {
        if (isVoid(p_item) || isVoid(p_beforeItem)) { return false; }
        let index = this._array.indexOf(p_item),
            indexBefore = this._array.indexOf(p_beforeItem);
        if (index == -1 || indexBefore == -1) { return false; }
        if (index < indexBefore) { indexBefore--; }
        this._array.splice(index, 1);
        this._array.splice(indexBefore, 0, p_item);
        return p_item;
    }

    MoveAfter(p_item, p_afterItem) {
        if (isVoid(p_item) || isVoid(p_afterItem)) { return false; }
        let index = this._array.indexOf(p_item),
            indexAfter = this._array.indexOf(p_afterItem);
        if (index == -1 || indexAfter == -1) { return false; }
        this._array.splice(index, 1);
        indexAfter = index < indexAfter ? indexAfter : indexAfter + 1;
        if (indexAfter >= this._array.length) { this._array.push(p_item); }
        else { this._array.splice(indexAfter, 0, p_item); }
        return p_item;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*}
     */
    ToStart(p_item) {
        if (isVoid(p_item)) { return false; }
        let index = this._array.indexOf(p_item);
        if (index == -1) { return false; }
        this._array.splice(index, 1);
        this._array.unshift(p_item);
        return p_item;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*}
     */
    ToEnd(p_item) {
        if (isVoid(p_item)) { return false; }
        let index = this._array.indexOf(p_item);
        if (index == -1) { return false; }
        this._array.splice(index, 1);
        this._array.push(p_item);
        return p_item;
    }

    /**
     * @description TODO
     * @param {number} p_index 
     * @returns {*} 
     */
    At(p_index) {
        return this._array[p_index];
    }

    /**
     * @description TODO
     * @returns {*} 
     */
    Pop() {
        return this._array.pop();
    }

    /**
     * @description TODO
     * @returns {*} 
     */
    Shift() {
        return this._array.shift();
    }

    /**
     * @description Loops through all items in List. Callback should match the signature : (item, index)
     * @param {function} p_fn
     * @param {object} p_this
     * @param {boolean} p_reverse
     */
    ForEach(p_fn, p_this = null, p_reverse = false) {

        let n = this._array.length;

        if (p_reverse) {
            for (let i = n - 1; i >= 0; i--) {
                p_fn.call(p_this, this._array[i], i);
            }
        }
        else {
            for (let i = 0; i < n; i++) {
                p_fn.call(p_this, this._array[i], i);
            }
        }
    }

    /**
     * @description Clears the List
     */
    Clear() {
        this._array.length = 0;
    }

}

module.exports = List;