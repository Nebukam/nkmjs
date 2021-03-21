'use strict';

class Movement {
    constructor() {
        this._x = 0;
        this._y = 0;

        this._pinX = 0;
        this._pinY = 0;
        this._pinOffsetX = 0;
        this._pinOffsetY = 0;
        this._pinDist = 0;

        this._moveX = 0;
        this._moveY = 0;
        this._moveDist = 0;
    }

    set x(p_value) {
        this._x = p_value;
    }

    set y(p_value) {
        this._y = p_value;
    }

    /**
     * Pin the current position (and eventually sets it)
     * as the "origin".
     * @param {*} p_x 
     * @param {*} p_y 
     */
    Pin(p_x = null, p_y = null) {

        if (p_x) { this._x = p_x; }
        if (p_y) { this._y = p_y; }

        this._pinX = this._x;
        this._pinY = this._y;
        this._pinDist = 0;
        
    }

    /**
     * Call an update with current position offset by given values
     * @param {*} p_x 
     * @param {*} p_y 
     */
    Move(p_x = 0, p_y = 0) {
        this.Update(this._x + p_x, this._y + p_y);
    }

    /**
     * Set the current position & compute offset
     * based on last position
     * @param {*} p_x 
     * @param {*} p_y 
     */
    Update(p_x = null, p_y = null) {

        let prev_x = this._x,
            prev_y = this._y;

        if (p_x) { this._x = p_x; }
        if (p_y) { this._y = p_y; }

        // Update offset values

        this._moveX = this._x - prev_x;
        this._moveY = this._y - prev_y;

        let a = -this._moveX,
            b = -this._moveY;

        this._moveDist = Math.sqrt(a * a + b * b);

        // Update pin values

        this._pinOffsetX = this._x - this._pinX;
        this._pinOffsetY = this._y - this._pinY;

        a = -this._pinOffsetX;
        b = -this._pinOffsetY;

        this._pinDist = Math.sqrt(a * a + b * b);

    }



}

module.exports = Movement;