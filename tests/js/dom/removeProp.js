/*

  Remove a proprety from each element in the current set.

  @param {string} name The name of the property.
  @return junction
  @this junction
 */
junction.fn.removeProp = function (property) {
    var name;
    name = junction.propFix[property] || property;
    return this.each(function () {
        this[name] = undefined;
        delete this[name];
    });
};