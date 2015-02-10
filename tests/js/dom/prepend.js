/*

  Add an HTML string or element before the children
  of each element in the current set.

  @param {string|HTMLElement} fragment The HTML string or element to add.
  @return junction
  @this junction
 */
junction.fn.prepend = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== undefined) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var insertEl, piece, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = fragement.length; _i < _len; _i++) {
            piece = fragement[_i];
            insertEl = (index > 0 ? piece.cloneNode(true) : piece);
            if (this.firstChild) {
                _results.push(this.insertBefore(insertEl, this.firstChild));
            } else {
                _results.push(this.appendChild(insertEl));
            }
        }
        return _results;
    });
};