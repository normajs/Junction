/*

  Returns the last element of the set wrapped in a new `shoestring` object.

  @return junction
  @this junction
 */
junction.fn.last = function () {
    return this.eq(this.length - 1);
};