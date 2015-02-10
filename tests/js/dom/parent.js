/*

  Returns the set of first parents for each element
  in the current set.

  @return junction
  @this junction
 */
junction.fn.parent = function () {
    var returns;
    returns = [];
    this.each(function () {
        var parent;
        parent = (this === document.documentElement ? document : this.parentNode);
        if (parent && parent.nodeType !== 11) {
            returns.push(parent);
        }
    });
    return junction(returns);
};