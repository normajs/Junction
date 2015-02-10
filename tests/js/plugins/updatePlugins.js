junction.updateModels = function (scope, force) {
    var plugin, _i, _len, _ref, _results;
    _ref = this.flattenObject(this['plugins']);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        _results.push(this.addModel(scope, plugin.model, plugin.attr, false, force));
    }
    return _results;
};