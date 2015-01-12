/*

  Find descendant elements of the current collection.

  @param {string} selector The selector used to find the children
  @return junction
  @this junction
 */
junction.fn.find = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var e, finds, found, _i, _len, _results;
        try {
            finds = this.querySelectorAll(selector);
        } catch (_error) {
            e = _error;
            junction.error("queryselector", selector);
            return false;
        }
        _results = [];
        for (_i = 0, _len = finds.length; _i < _len; _i++) {
            found = finds[_i];
            _results.push(returns = returns.concat(found));
        }
        return _results;
    });
    return junction(returns);
};