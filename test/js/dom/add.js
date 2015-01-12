/*

  Add elements matching the selector to the current set.

  @param {string} selector The selector for the elements to add from the DOM
  @return junction
  @this junction
 */
junction.fn.add = function (selector) {
    var ret;
    ret = [];
    this.each(function () {
        ret.push(this);
    });
    junction(selector).each(function () {
        ret.push(this);
    });
    return junction(ret);
};