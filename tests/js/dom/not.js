/*

  Removes elements from the current set.

  @param {string} selector The selector to use when removing the elements.
  @return junction
  @this junction
 */
junction.fn.not = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var found;
        found = junction(selector, this.parentNode);
        if (junction.inArray(this, found) === -1) {
            returns.push(this);
        }
    });
    return junction(returns);
};