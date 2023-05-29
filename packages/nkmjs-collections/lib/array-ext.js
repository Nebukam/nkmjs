
Object.defineProperty(Array.prototype, 'sortf', {
    value: function (compare) { return [].concat(this).sort(compare); }
});

const isVoid = function (p_value) { return (typeof p_value === 'undefined' || p_value === null); };

/**
 * Adds the given value to the array if it was not already present, and returns it.
 * @param {*} p_value 
 * @returns {*} p_value
 */
Object.defineProperty(Array.prototype, 'Add', {
    value: function (p_value) {
        if (isVoid(p_value)) { return false; }
        if (this.includes(p_value)) { return p_value; }
        this.push(p_value);
        return p_value;
    }
});

/**
 * Adds the given value to the array and returns it if it was not already present, otherwise returns false.
 * @param {*} p_value 
 * @returns {*} p_value
 */
Object.defineProperty(Array.prototype, 'AddNew', {
    value: function (p_value) {
        if (isVoid(p_value) || this.includes(p_value)) { return false; }
        this.push(p_value);
        return p_value;
    }
});

/**
 * Adds the given value to the array at the specified index if it was not already present, and returns it.
 * If the value was already present but at a different index, it will be moved.
 * @param {*} p_value 
 * @param {number} p_targetIndex 
 * @returns 
 */
Object.defineProperty(Array.prototype, 'AddAt', {
    value: function (p_value, p_targetIndex) {

        if (isVoid(p_value)) { return false; }

        let currentIndex = this.indexOf(p_value);
        if (currentIndex !== -1) {
            if (currentIndex === p_targetIndex) { return p_value; }
            this.splice(currentIndex, 1);
            if (p_targetIndex > currentIndex) { p_targetIndex--; }
        }

        if (p_targetIndex >= this.length) { this.push(p_value); }
        else if (p_targetIndex === 0) { this.unshift(p_value); }
        else { this.splice(p_targetIndex, 0, p_value); }

        return p_value;

    }
});

/**
 * Adds the given value to the array before the specified target value if it was not already present, and returns it.
 * If the value was already present but at a different index, it will be moved.
 * If the target cannot be found, the value will be added at the beginning of the array.
 * @param {*} p_value 
 * @param {number} p_target 
 * @returns 
 */
Object.defineProperty(Array.prototype, 'AddBefore', {
    value: function (p_value, p_target) {
        if (isVoid(p_value) || isVoid(p_target)) { return false; }
        let targetIndex = this.indexOf(p_target);
        if (targetIndex > 0) { targetIndex--; }
        return this.AddAt(p_value, targetIndex < 0 ? 0 : targetIndex);
    }
});

/**
 * Adds the given value to the array after the specified target value if it was not already present, and returns it.
 * If the value was already present but at a different index, it will be moved.
 * If the target cannot be found, the value will be added at the beginning of the array.
 * @param {*} p_value 
 * @param {number} p_target 
 * @returns 
 */
Object.defineProperty(Array.prototype, 'AddAfter', {
    value: function (p_value, p_target) {
        if (isVoid(p_value) || isVoid(p_target)) { return false; }
        let targetIndex = this.indexOf(p_target);
        if (targetIndex != -1) { targetIndex++; }
        return this.AddAt(p_value, targetIndex < 0 ? this.length : targetIndex);
    }
});

/**
 * Adds the given value at the beginning of the array if it was not already present, and returns it.
 * If the value was already present but at a different index, it will be moved.
 * @param {*} p_value 
 * @returns p_value
 */
Object.defineProperty(Array.prototype, 'Unshift', {
    value: function (p_value) { return this.AddAt(p_value, 0); }
});

/**
 * Removes the given value from the array, and returns it.
 * @param {*} p_value 
 * @returns Removed value if it was present, otherwise false.
 */
Object.defineProperty(Array.prototype, 'Remove', {
    value: function (p_value) {
        if (isVoid(p_value)) { return false; }
        return this.RemoveAt(this.indexOf(p_value));
    }
});

/**
 * Removes the given value from the array.
 * @param {number} p_targetIndex 
 * @returns Removed value if it was within bounds, otherwise false.
 */
Object.defineProperty(Array.prototype, 'RemoveAt', {
    value: function (p_targetIndex) {
        if (p_targetIndex < 0 || p_targetIndex >= this.length) { return false; }
        return this.splice(p_targetIndex, 1)[0];
    }
});

/**
 * Move a given value to the end of the array.
 * @param {*} p_value 
 * @returns Removed value if it was within bounds, otherwise false.
 */
Object.defineProperty(Array.prototype, 'ToEnd', {
    value: function (p_value) {
        if (isVoid(p_value)) { return false; }
        let index = this.indexOf(p_value);
        if (index == -1) { return false; }
        this.splice(index, 1);
        this.push(p_value);
        return p_value;
    }
});

/**
 * Move a given value to the end of the array.
 * @param {*} p_value 
 * @returns Removed value if it was within bounds, otherwise false.
 */
Object.defineProperty(Array.prototype, 'ToStart', {
    value: function (p_value) {
        if (isVoid(p_value)) { return false; }
        let index = this.indexOf(p_value);
        if (index == -1) { return false; }
        this.splice(index, 1);
        this.unshift(p_value);
        return p_value;
    }
});

/**
 * Removes the given value from the array.
 * @param {number} p_targetIndex 
 * @returns Removed value if it was within bounds, otherwise false.
 */
Object.defineProperty(Array.prototype, 'Clear', {
    value: function () { this.length = 0; }
});


Object.defineProperty(Array.prototype, 'last', {
    get() { return this.length ? this[this.length - 1] : null; }
});

Object.defineProperty(Array.prototype, 'first', {
    get() { return this.length ? this[0] : null; }
});

Object.defineProperty(Array.prototype, 'isEmpty', {
    get() { return this.length > 0 ? false : true; }
});

module.exports = { isVoid: isVoid }