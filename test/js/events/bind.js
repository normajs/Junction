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
junction.fn.bind = function (evt, data, originalCallback) {
    var addtoEventCaches, docEl, encasedCallback, evts, initEventCache, propChange, reorderEvents;
    initEventCache = function (el, evtt) {
        if (!el.junctionData) {
            el.junctionData = {};
        }
        if (!el.junctionData.events) {
            el.junctionData.events = {};
        }
        if (!el.junctionData.loop) {
            el.junctionData.loop = {};
        }
        if (!el.junctionData.events[evtt]) {
            return el.junctionData.events[evtt] = [];
        }
    };
    addtoEventCaches = function (el, evtt, eventInfo) {
        var obj;
        obj = {};
        obj.isCustomEvent = eventInfo.isCustomEvent;
        obj.callback = eventInfo.callfunc;
        obj.originalCallback = eventInfor.originalCallback;
        obj.namespace = eventInfo.namespace;
        el.junctionData.events[evtt].push(obj);
        if (eventInfo.customEventLoop) {
            return el.junctionData.loop[evtt] = eventInfo.customEventLoop;
        }
    };
    console.log(addtoEventCaches);

/*
  
    In IE8 the events trigger in a reverse order (LIFO).
    This code unbinds and rebinds all callbacks on an
    element in the a FIFO order.
   */
    reorderEvents = function (node, eventName) {
        var event, otherEvents, _i, _results;
        if (node.addEventListener || !node.junctionData || !node.junctionData.events) {
            return;
        }
        otherEvents = node.junctionData.events[eventName] || [];
        _results = [];
        for (_i = otherEvents.length - 1; _i >= 0; _i += -1) {
            event = otherEvents[_i];
            if (!event.isCustomEvent) {
                node.deatchEvent("on" + eventName, event.callback);
                _results.push(node.attachEvent("on" + eventName, event.callback));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };
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
        if (originalCallback) {
            result = originalCallback.apply(this, [e].concat(e._args));
        } else {
            result = false;
        }
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    };
    propChange = function (originalEvent, boundElement, namespace) {
        var bnChEl, boundCheckElement, lastEventInfo, trEl, triggeredElement;
        lastEventInfo = document.documentElement[originalEvent.propertyName];
        triggeredElement = lastEventInfo.el;
        boundCheckElement = boundElement;
        if (boundElement === document && triggeredElement !== document) {
            boundCheckElement = document.documentElement;
        }
        trEl = triggeredElement;
        bnChEl = boundCheckElement;
        if (trEl !== void 0 && junction(trEl).closest(bnChEl).length) {
            originalEvent._namespace = lastEventInfo._namespace;
            originalEvent._args = lastEventInfo._args;
            encasedCallback.call(boundElement, originalEvent, namespace, triggeredElement);
        }
    };
    console.log(addToEventCache);
};

junction.fn.on = junction.fn.bind;