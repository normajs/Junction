junction.nameSpace = function (target, attribute, obj, force) {
    var originalAttr, params;
    originalAttr = attribute.replace(/[\[\]']+/g, '');
    params = target.attributes[originalAttr].value.split(',');
    params = params.map(function (param) {
        return param.trim();
    });
    attribute = originalAttr.split('-');
    if (!this[attribute[1]]) {
        this[attribute[1]] = {};
    }
    if (!this[attribute[1]][params[0]] || force) {
        this[attribute[1]][params[0]] = null;
        return this[attribute[1]][params[0]] = new obj(target, originalAttr);
    }
};