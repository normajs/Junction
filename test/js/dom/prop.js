/*

  Gets the property value from the first element
  or sets the property value on all elements of the currrent set.

  @param {string} name The property name.
  @param {any} value The property value.
  @return {any|junction}
  @this junction
 */
junction.fn.prop = function (name, value) {
    if (!this[0]) {
        return;
    }
    name = junction.propFix[name] || name;
    if (value !== undefined) {
        return this.each(function () {
            this[name] = value;
        });
    } else {
        return this[0][name];
    }
};