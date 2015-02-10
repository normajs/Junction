/*

  Private function for setting/getting the offset
  property for height/width.

  NOTE** Please use the [width](width.js.html)
  or [height](height.js.html) methods instead.

  @param {junction} set The set of elements.
  @param {string} name The string "height" or "width".
  @param {float|undefined} value The value to assign.
  @return junction
  @this window
 */
junction._dimension = function (set, name, value) {
    var offsetName;
    if (value === undefined) {
        offsetName = name.replace(/^[a-z]/, function (letter) {
            return letter.toUpperCase();
        });
        return set[0]["offset" + offsetName];
    } else {
        value = (typeof value === "string" ? value : value + "px");
        return set.each(function () {
            this.style[name] = value;
        });
    }
};