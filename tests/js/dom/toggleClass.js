/*

  Toggles class of elements in selector

  @param {string} className Class to be toggled
  @return junction
  @this junction
 */
junction.fn.toggleClass = function (className) {
    if (this.hasClass(className)) {
        return this.removeClass(className);
    } else {
        return this.addClass(className);
    }
};