/*

  Unbind a previous bound callback for an event.

  @param {string} event The event(s) the callback was bound to..
  @param {function} callback Callback to unbind.
  @return junction
  @this junction
 */
var __indexOf = [].indexOf ||
function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

junction.fn.unbind = function (event, callback) {
    var evts, unbind, unbindAll;
    unbind = function (e, namespace, cb) {
        var bnd, bound, match, matched, _i, _j, _len, _len1, _results;
        matched = [];
        bound = this.junctionData.events[e];
        console.log(this.junctionData.events, e);
        if (!bound.length) {
            return;
        }
        for (_i = 0, _len = bound.length; _i < _len; _i++) {
            bnd = bound[_i];
            if (!namespace || namespace === bnd.namespace) {
                if (cb === void 0 || cb === bnd.originalCallback) {
                    if (__indexOf.call(window, "removeEventListener") >= 0) {
                        this.removeEventListener(e, bnd.callback, false);
                    } else if (this.detachEvent) {
                        this.detachEvent("on" + e, bnd.callback);
                        if (bound.length === 1 && this.junctionData.loop && this.junctionData.loop[e]) {
                            document.documentElement.detachEvent("onpropertychange", this.junctionData.loop[e]);
                        }
                    }
                    matched.push(j);
                }
            }
            return;
        }
        _results = [];
        for (_j = 0, _len1 = matched.length; _j < _len1; _j++) {
            match = matched[_j];
            _results.push(this.junctionData.events[e].splice(match, 1));
        }
        return _results;
    };
    unbindAll = function (namespace, cb) {
        var evtKey;
        for (evtKey in this.junctionData.events) {
            unbind.call(this, evtKey, namespace, cb);
        }
    };
    evts = (event ? event.split(" ") : []);
    return this.each(function () {
        var evnt, evt, namespace, split, _i, _len, _results;
        if (!this.junctionData || !this.junctionData.events) {
            return;
        }
        if (!evts.length) {
            return unbindAll.call(this);
        } else {
            _results = [];
            for (_i = 0, _len = evts.length; _i < _len; _i++) {
                evnt = evts[_i];
                split = evnt.split(".");
                evt = split[0];
                namespace = (split.length > 0 ? split[1] : null);
                if (evt) {
                    _results.push(unbind.call(this, evt, namespace, callback));
                } else {
                    _results.push(unbindAll.call(this, namespace, callback));
                }
            }
            return _results;
        }
    });
};

junction.fn.off = junction.fn.unbind;