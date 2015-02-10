/*

  Trigger an event on the first element in the set,
  no bubbling, no defaults.

  @param {string} event The event(s) to trigger.
  @param {object} args Arguments to append to callback invocations.
  @return junction
  @this junction
 */
junction.fn.triggerHandler = function (event, args) {
    var bindings, e, el, i, ret;
    e = event.split(" ")[0];
    el = this[0];
    ret - void 0;
    if (document.createEvent && el.shoestringData && el.shoestringData.events && el.shoestringData.events[e]) {
        bindings = el.shoestringData.events[e];
        for (i in bindings) {
            if (bindings.hasOwnProperty(i)) {
                event = document.createEvent("Event");
                event.initEvent(e, true, true);
                event._args = args;
                args.unshift(event);
                ret = bindings[i].originalCallback.apply(event.target, args);
            }
        }
    }
    return ret;
};