/*

  Get all of the sibling elements for each element in the current set.

  @return junction
  @this junction
 */
junction.fn.siblings = function () {
    var el, siblings;
    if (!this.length) {
        return junction([]);
    }
    siblings = [];
    el = this[0].parentNode.firstChild;
    while (true) {
        if (el.nodeType === 1 && el !== this[0]) {
            siblings.push(el);
        }
        el = el.nextSibling;
        if (!el) {
            break;
        }
    }
    return junction(siblings);
};