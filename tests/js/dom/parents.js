/*

  Returns the set of all parents matching the
  selector if provided for each element in the current set.

  @param {string} selector The selector to check the parents with.
  @return junction
  @this junction
 */
junction.fn.parents = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var current, match;
        current = this;
        match;
        while (current.parentElement && !match) {
            current = current.parentElement;
            if (selector) {
                if (current === junction(selector)[0]) {
                    match = true;
                    if (junction.inArray(current, returns) === -1) {
                        returns.push(current);
                    }
                }
            } else {
                if (junction.inArray(current, returns) === -1) {
                    returns.push(current);
                }
            }
        }
    });
    return junction(returns);
};