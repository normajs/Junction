/*

  Remove an attribute from each element in the current set.

  @param {string} name The name of the attribute.
  @return junction
  @this junction
 */
junction.fn.removeAttr = function (name) {
    return this.each(function () {
        this.removeAttribute(name);
    });
};