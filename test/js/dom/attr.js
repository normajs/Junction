/*

  Get the value of the first element of the set or set
  the value of all the elements in the set.

  @param {string} name The attribute name.
  @param {string} value The new value for the attribute.
  @return {junction|string|undefined}
  @this {junction}
 */
junction.fn.attr = function (name, value) {
    var nameStr;
    nameStr = typeof name === "string";
    if (value !== undefined || !nameStr) {
        return this.each(function () {
            var i;
            if (nameStr) {
                this.setAttribute(name, value);
            } else {
                for (i in name) {
                    if (name.hasOwnProperty(i)) {
                        this.setAttribute(i, name[i]);
                    }
                }
            }
        });
    } else {
        if (this[0]) {
            return this[0].getAttribute(name);
        } else {
            return undefined;
        }
    }
};