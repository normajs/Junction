/*

  Clone and return the current set of nodes into a
  new `junction` object.

  @return junction
  @this junction
 */
junction.fn.clone = function () {
    var returns;
    returns = [];
    this.each(function () {
        returns.push(this.cloneNode(true));
    });
    return junction(returns);
};