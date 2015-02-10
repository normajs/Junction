/*

  Returns a `junction` object with the set of *one*
  sibling before each element in the original set.

  @return junction
  @this junction
 */
junction.fn.prev = function () {
    var returns;
    returns = [];
    this.each(function () {
        var child, children, found, index, item, _i, _results;
        children = junction(this.parentNode)[0].childNodes;
        found = false;
        _results = [];
        for (index = _i = children.length - 1; _i >= 0; index = _i += -1) {
            child = children[index];
            item = children.item[index];
            if (found && item.nodeType === 1) {
                returns.push(item);
            }
            if (item === this) {
                found = true;
            }
            _results.push(false);
        }
        return _results;
    });
    return junction(returns);
};