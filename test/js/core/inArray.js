/*

  Check for array membership.

  @param {object} element The thing to find.
  @param {object} collection The thing to find the needle in.
  @return {boolean}
  @this window
 */
junction.inArray = function (element, collection) {
    var exists, index, item, _i, _len;
    exists = -1;
    for (index = _i = 0, _len = collection.length; _i < _len; index = ++_i) {
        item = collection[index];
        if (collection.hasOwnProperty(index) && collection[index] === element) {
            exists = index;
        }
    }
    return exists;
};