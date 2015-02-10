/*

  Returns a boolean if elements have the class passed

  @param {string} selector The selector to check.
  @return {boolean}
  @this {junction}
 */
junction.fn.hasClass = function (className) {
    var returns;
    returns = false;
    this.each(function () {
        var regex;
        regex = new RegExp(" " + className + " ");
        return returns = regex.test(" " + this.className + " ");
    });
    return returns;
};