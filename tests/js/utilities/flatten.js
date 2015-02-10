/*

  @function flatten()

  @param {Array} single or multilevel array

  @return {Array} a flattened version of an array.

  @note
    Handy for getting a list of children from the nodes.
 */
junction.flatten = function (array) {
    var element, flattened, _i, _len;
    flattened = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
        element = array[_i];
        if (element instanceof Array) {
            flattened = flattened.concat(this.flatten(element));
        } else {
            flattened.push(element);
        }
    }
    return flattened;
};