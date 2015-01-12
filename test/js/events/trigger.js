/*

  Trigger an event on each of the DOM elements in the current set.

  @param {string} event The event(s) to trigger.
  @param {object} args Arguments to append to callback invocations.
  @return junction
  @this junction
 */
junction.fn.trigger = function (event, args) {
    var evts;
    evts = event.split(" ");
    return this.each(function () {
        var evnt, evt, namespace, split, _i, _len;
        for (_i = 0, _len = evts.length; _i < _len; _i++) {
            evnt = evts[_i];
            split = evnt.split(".");
            evt = split[0];
            namespace = (split.length > 0 ? split[1] : null);
            if (evt === "click") {
                if (this.tagName === "INPUT" && this.type === "checkbox" && this.click) {
                    this.click();
                    return false;
                }
            }
            if (document.createEvent) {
                event = document.createEvent("Event");
                event.initEvent(evt, true, true);
                event._args = args;
                event._namespace = namespace;
                this.dispatchEvent(event);
            } else if (document.createEventObject) {
                if (("" + this[evt]).indexOf("function") > -1) {
                    this.ssEventTrigger = {
                        _namespace: namespace,
                        _args: args
                    };
                    this[evt]();
                } else {
                    document.documentElement[evt] = {
                        el: this,
                        _namespace: namespace,
                        _args: args
                    };
                }
            }
        }
    });
};