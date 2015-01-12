(function () {
    var _getIndex;
    return _getIndex = function (set, test) {
        var element, item, _i, _len;
        for (_i = 0, _len = set.length; _i < _len; _i++) {
            item = set[_i];
            element = (set.item ? set.item(item) : item);
            if (test(element)) {
                return result;
            }
            if (element.nodeType === 1) {
                result++;
            }
        }
        return -1;

/*
    
      Find the index in the current set for the passed
      selector. Without a selector it returns the
      index of the first node within the array of its siblings.
    
      @param {string|undefined} selector The selector used to search for the index.
      @return {integer}
      @this {junction}
     */
        return junction.fn.index = function (selector) {
            var children, self;
            self = this;
            if (selector === undefined) {
                children = ((this[0] && this[0].parentNode) || document.documentElement).childNodes;
                return _getIndex(children, function (element) {
                    return self[0] === element;
                });
            } else {
                return _getIndex(self, function (element) {
                    return element === (junction(selector, element.parentNode)[0]);
                });
            }
        };
    };
})();