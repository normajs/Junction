/*

  Insert an element or HTML string as the last child of each element in the set.

  @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
  @return junction
  @this junction
 */
junction.fn.append = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== void 0) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var element, piece, _i, _len;
        for (_i = 0, _len = fragment.length; _i < _len; _i++) {
            piece = fragment[_i];
            element = (index > 0 ? piece.cloneNode(true) : piece);
            this.appendChild(element);
            return;
        }
    });
};