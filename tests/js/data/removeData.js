/*

  Remove data associated with `name` or all the data, for each
  element in the current set

  @param {string} name The data attribute name
  @return junction
  @this junction
 */
junction.fn.removeData = function (name) {
    return this.each(function () {
        if (name !== void 0 && this.junctionData) {
            this.junctionData[name] = void 0;
            delete this.junctionData[name];
        } else {
            this[0].junctionData = {};
        }
    });
};