/*

  Get the compute style property of the first
  element or set the value of a style property
  on all elements in the set.

  @method _setStyle
  @param {string} property The property being used to style the element.
  @param {string|undefined} value The css value for the style property.
  @return {string|junction}
  @this junction
 */
junction.fn.css = function (property, value) {
    if (!this[0]) {
        return;
    }
    if (typeof property === "object") {
        return this.each(function () {
            var key;
            for (key in property) {
                if (property.hasOwnProperty(key)) {
                    junction._setStyle(this, key, property[key]);
                }
            }
        });
    } else {
        if (value !== undefined) {
            return this.each(function () {
                junction._setStyle(this, property, value);
            });
        }
        return junction._getStyle(this[0], property);
    }
};