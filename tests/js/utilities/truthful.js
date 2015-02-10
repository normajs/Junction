/*

@function truthful()

@param {Array} any array to be tested for true values

@return {Array} array without false values

@note
  Handy for triming out all falsy values from an array.
 */
junction.truthful = function (array) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        if (item) {
            _results.push(item);
        }
    }
    return _results;
};