/*
@class Debouncer

@author
  James E Baxley III
  NewSpring Church

@version 0.3

@note
  Handles debouncing of events via requestAnimationFrame
    @see http://www.html5rocks.com/en/tutorials/speed/animations/
 */
var __bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

junction._debounce = (function () {
    function _debounce(data) {
        this.data = data;
        this.handleEvent = __bind(this.handleEvent, this);
        this.requestTick = __bind(this.requestTick, this);
        this.update = __bind(this.update, this);
        console.log(this.data);
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        this.callback = this.data;
        this.ticking = false;
    }

    _debounce.prototype.update = function () {
        this.callback && this.callback();
        return this.ticking = false;
    };

    _debounce.prototype.requestTick = function () {
        if (!this.ticking) {
            requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
            return this.ticking = true;
        }
    };

    _debounce.prototype.handleEvent = function () {
        return this.requestTick();
    };

    return _debounce;

})();

junction.debounce = function (callback) {
    return new this._.debounce(callback);
};