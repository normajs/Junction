/*

  Returns a `junction` object with the set of siblings of each element in the original set.

  @return junction
  @this junction
 */
junction.fn.next = function () {
    var returns;
    returns = [];
    this.each(function () {
        var child, children, found, index, item, _i, _len, _results;
        children = junction(this.parentNode)[0].childNodes;
        found = false;
        _results = [];
        for (index = _i = 0, _len = children.length; _i < _len; index = ++_i) {
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