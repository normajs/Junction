junction.flattenObject = (function (_this) {
    return function (object) {
        var array, value;
        array = [];
        for (value in object) {
            if (object.hasOwnProperty(value)) {
                array.push(object[value]);
            }
        }
        return array;
    };
})(this);