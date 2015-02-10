/*

  Get the children of the current collection.
  @return junction
  @this junction
 */
junction.fn.children = function () {
    var returns;
    returns = [];
    this.each(function () {
        var children, i, _results;
        children = this.children;
        i = -1;
        _results = [];
        while (i++ < children.length - 1) {
            if (junction.inArray(children[i], returns) === -1) {
                _results.push(returns.push(children[i]));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    });
    return junction(returns);
};