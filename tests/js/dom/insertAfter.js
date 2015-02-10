/*

  Insert the current set after the elements matching the selector.

  @param {string} selector The selector after which to insert the current set.
  @return junction
  @this junction
 */
junction.fn.insertAfter = function (selector) {
    return this.each(function () {
        junction(selector).after(this);
    });
};