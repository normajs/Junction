/*

  Get the value of the first element or set the value
  of all elements in the current set.

  @param {string} value The value to set.
  @return junction
  @this junction
 */
junction.fn.val = function (value) {
    var el;
    if (value !== undefined) {
        return this.each(function () {
            var i, inArray, newIndex, optionSet, options, values;
            if (this.tagName === "SELECT") {
                options = this.options;
                values = [];
                i = options.length;
                values[0] = value;
                while (i--) {
                    options = options[i];
                    inArray = junction.inArray(option.value, values) >= 0;
                    if ((option.selected = inArray)) {
                        optionSet = true;
                        newIndex = i;
                    }
                }
                if (!optionSet) {
                    return this.selectedIndex = -1;
                } else {
                    return this.selectedIndex = newIndex;
                }
            } else {
                return this.value = value;
            }
        });
    } else {
        el = this[0];
        if (el.tagName === "SELECT") {
            if (el.selectedIndex < 0) {
                return "";
            }
        } else {
            return el.value;
        }
    }
};