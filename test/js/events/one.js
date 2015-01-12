/*

  Bind a callback to an event for the currrent
  set of elements, unbind after one occurence.

  @param {string} event The event(s) to watch for.
  @param {function} callback Callback to invoke on the event.
  @return junction
  @this junction
 */
junction.fn.one = function (event, callback) {
    var evts;
    evts = event.split(" ");
    return this.each(function () {
        var $t, cbs, thisevt, _i, _len;
        cbs = {};
        $t = junction(this);
        for (_i = 0, _len = evts.length; _i < _len; _i++) {
            thisevt = evts[_i];
            cbs[thisevt] = function (e) {
                var j;
                $t = junction(this);
                for (j in cbs) {
                    $t.unbind(j, cbs[j]);
                }
                return callback.apply(this, [e].concat(e._args));
            };
            $t.bind(thisevt, cbs[thisevt]);
            return;
        }
    });
};