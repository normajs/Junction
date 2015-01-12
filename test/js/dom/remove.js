/*

  Remove the current set of elements from the DOM.

  @return junction
  @this junction
 */
junction.fn.remove = function () {
    return this.each(function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    });
};