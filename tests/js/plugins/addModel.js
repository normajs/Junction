junction.addModel = function (scope, model, attr, cb, force) {
    var target, _i, _len, _ref;
    _ref = scope.querySelectorAll(attr);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        target = _ref[_i];
        this.nameSpace(target, attr, model, force);
    }
    if (scope.querySelectorAll(attr).length) {
        if (typeof cb === "function") {
            return cb();
        }
    }
};