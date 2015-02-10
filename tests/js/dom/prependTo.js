/*

  Add each element of the current set before the
  children of the selected elements.

  @param {string} selector The selector for the elements to add the current set to..
  @return junction
  @this junction
 */
junction.fn.prependTo = function (selector) {
    return this.each(function () {
        junction(selector).prepend(this);
    });
};