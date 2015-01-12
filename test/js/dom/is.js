/*

  Checks the current set of elements against
  the selector, if one matches return `true`.

  @param {string} selector The selector to check.
  @return {boolean}
  @this {junction}
 */
junction.fn.is = function (selector) {
    var returns;
    returns = false;
    this.each(function () {
        if (junction.inArray(this, junction(selector)) > -1) {
            returns = true;
        }
    });
    return returns;
};