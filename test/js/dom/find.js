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
        var e, elements, found, m, match, rquickExpr, _i, _len, _results;
        try {
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
            if (match = rquickExpr.exec(selector)) {
                if ((m = match[1])) {
                    elements = [document.getElementById(m)];
                } else if (match[2]) {
                    elements = this.getElementsByTagName(selector);
                } else if ((m = match[3])) {
                    elements = this.getElementsByClassName(m);
                }
            } else {
                elements = this.querySelectorAll(selector);
            }
        } catch (_error) {
            e = _error;
            return false;
        }
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
            found = elements[_i];
            _results.push(returns = returns.concat(found));
        }
        return _results;
    });
    return junction(returns);
};