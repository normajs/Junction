/*

  Iterates over `junction` collections.

  @param {function} callback The callback to be invoked on
    each element and index
  @return junction
  @this junction
 */
junction.fn.each = function (callback) {
    return junction.each(this, callback);
};

junction.each = function (collection, callback) {
    var item, val, _i, _len;
    for (_i = 0, _len = collection.length; _i < _len; _i++) {
        item = collection[_i];
        val = callback.call(item, _i, item);
        if (val === false) {
            break;
        }
    }
    return collection;
};