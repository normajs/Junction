/*

  Gets the height value of the first element or
  sets the height for the whole set.

  @param {float|undefined} value The value to assign.
  @return junction
  @this junction
 */
junction.fn.height = function (value) {
    return junction._dimension(this, "height", value);
};