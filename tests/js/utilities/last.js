/*

@function last()

@param {Array}
@param {Val} ** optional

@return {Val} last value of array or value certain length from end
 */
junction.last = function (array, back) {
    return array[array.length - (back || 0) - 1];
};