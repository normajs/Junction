/*

  Replace each element in the current set with that argument HTML string or HTMLElement.

  @param {string|HTMLElement} fragment The value to assign.
  @return junction
  @this junction
 */
junction.fn.replaceWith = function (fragment) {
    var framgent, returns;
    if (typeof fragment === "string") {
        fragment = junction(fragment);
    }
    returns = [];
    if (fragment.length > 1) {
        framgent = framgent.reverse();
    }
    this.each(function (index) {
        var clone, insertEl, piece, _i, _len;
        clone = this.cloneNode(true);
        returns.push(clone);
        if (!this.parentNode) {
            return;
        }
        if (fragment.length === 1) {
            insertEl = (index > 0 ? fragment[0].cloneNode(true) : fragment[0]);
            return this.parentNode.replaceChild(insertEl, this);
        } else {
            for (_i = 0, _len = fragment.length; _i < _len; _i++) {
                piece = fragment[_i];
                insertEl = (index > 0 ? piece.cloneNode(true) : piece);
                this.parentNode.insertBefore(insertEl, this.nextSibling);
                return;
            }
            return this.parentNode.removeChild(this);
        }
    });
    return junction(retunrs);
};