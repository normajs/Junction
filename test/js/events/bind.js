/*

  Bind a callback to an event for the currrent set of elements.

  @param {string} evt The event(s) to watch for.
  @param {object,function} data Data to be included
    with each event or the callback.
  @param {function} originalCallback Callback to be
    invoked when data is define.d.
  @return junction
  @this junction
 */
var addToEventCache, initEventCache;

initEventCache = function (el, evt) {
    if (!el.junctionData) {
        el.junctionData = {};
    }
    if (!el.junctionData.events) {
        el.junctionData.events = {};
    }
    if (!el.junctionData.loop) {
        el.junctionData.loop = {};
    }
    if (!el.junctionData.events[evt]) {
        return el.junctionData.events[evt] = [];
    }
};

addToEventCache = function (el, evt, eventInfo) {
    var obj;
    obj = {};
    obj.isCustomEvent = eventInfo.isCustomEvent;
    obj.callback = eventInfo.callfunc;
    obj.originalCallback = eventInfo.originalCallback;
    obj.namespace = eventInfo.namespace;
    el.junctionData.events[evt].push(obj);
    if (eventInfo.customEventLoop) {
        return el.junctionData.loop[evt] = eventInfo.customEventLoop;
    }
};

junction.fn.bind = function (evt, data, originalCallback) {
    var docEl, encasedCallback, evts;
    if (typeof data === "function") {
        originalCallback = data;
        data = null;
    }
    evts = evt.split(" ");
    docEl = document.documentElement;
    encasedCallback = function (e, namespace, triggeredElement) {
        var originalPreventDefault, preventDefaultConstructor, result, returnTrue;
        if (e._namespace && e._namespace !== namespace) {
            return;
        }
        e.data = data;
        e.namespace = e._namespace;
        returnTrue = function () {
            return true;
        };
        e.isDefaultPrevented = function () {
            return false;
        };
        originalPreventDefault = e.preventDefault;
        preventDefaultConstructor = function () {
            if (originalPreventDefault) {
                return function () {
                    e.isDefaultPrevented = returnTrue;
                    originalPreventDefault.call(e);
                };
            } else {
                return function () {
                    e.isDefaultPrevented = returnTrue;
                    e.returnValue = false;
                };
            }
        };
        e.target = triggeredElement || e.target || e.srcElement;
        e.preventDefault = preventDefaultConstructor();
        e.stopPropagation = e.stopPropagation ||
        function () {
            e.cancelBubble = true;
        };
        result = originalCallback.apply(this, [e].concat(e._args));
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    };
    return this.each(function () {
        var customEventCallback, customEventLoop, domEventCallback, evnObj, evnt, namespace, oEl, split, _i, _len;
        oEl = this;
        for (_i = 0, _len = evts.length; _i < _len; _i++) {
            evnt = evts[_i];
            split = evnt.split(".");
            evt = split[0];
            namespace = (split.length > 0 ? split[1] : null);
            domEventCallback = function (originalEvent) {
                if (oEl.ssEventTrigger) {
                    originalEvent._namespace = oEl.ssEventTrigger._namespace;
                    originalEvent._args = oEl.ssEventTrigger._args;
                    oEl.ssEventTrigger = null;
                }
                return encasedCallback.call(oEl, originalEvent, namespace);
            };
            customEventCallback = null;
            customEventLoop = null;
            initEventCache(this, evt);
            if ("addEventListener" in this) {
                this.addEventListener(evt, domEventCallback, false);
            } else if (this.attachEvent) {
                if (this["on" + evt] !== void 0) {
                    this.attachEvent("on" + evt, domEventCallback);
                }
            }
            evnObj = {
                callfunc: customEventCallback || domEventCallback,
                isCustomEvent: !! customEventCallback,
                customEventLoop: customEventLoop,
                originalCallback: originalCallback,
                namespace: namespace
            };
            addToEventCache(this, evt, evnObj);
            return;
        }
    });
};

junction.fn.on = junction.fn.bind;