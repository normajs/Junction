/*

  Get data attached to the first element or set data values on
  all elements in the current set

  @param {string} name The data attribute name
  @param {any} value The value assigned to the data attribute
  @return {any|junction}
  @this junction
 */
junction.fn.data = function (name, value) {
    if (name !== void 0) {
        if (value !== void 0) {
            return this.each(function () {
                if (!this.junctionData) {
                    this.junctionData = {};
                }
                this.junctionData[name] = value;
            });
        } else {
            if (this[0] && this[0].junctionData) {
                return this[0].junctionData[name];
            } else {
                return void 0;
            }
        }
    } else {
        if (this[0]) {
            return this[0].junctionData || {};
        } else {
            return void 0;
        }
    }
};