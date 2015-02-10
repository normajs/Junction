/*

@function getKeys()

@param {Object}
@param {value}

@return {Array} array of keys that match on a certain value

@note
  helpful for searching objects


@todo add ability to search string and multi level
 */
junction.getKeys = function (obj, val) {
    var element, objects;
    objects = [];
    for (element in obj) {
        if (!obj.hasOwnProperty(element)) {
            continue;
        }
        if (obj[element] === "object") {
            objects = objects.concat(this.getKeys(obj[element], val));
        } else {
            if (obj[element] === val) {
                objects.push(element);
            }
        }
    }
    return objects;
};