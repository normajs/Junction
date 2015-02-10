/*

  Insert an element or HTML string before each
  element in the current set.

  @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
  @return junction
  @this junction
 */
junction.fn.before = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== undefined) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var insertEl, piece, _i, _len;
        for (_i = 0, _len = fragment.length; _i < _len; _i++) {
            piece = fragment[_i];
            insertEl = (index > 0 ? piece.cloneNode(true) : piece);
            this.parentNode.insertBefore(insertEl, this);
            return;
        }
    });
};