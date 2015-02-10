junction.addPlugin = function (name, obj, attr, cb) {
    var plugin, savePlugin, _i, _len, _ref;
    savePlugin = (function (_this) {
        return function (name, obj, attr, cb) {
            return _this['plugins'][name] = {
                _id: name,
                model: obj,
                attr: attr,
                callback: cb
            };
        };
    })(this);
    if (this.plugins.length) {
        _ref = this.plugins;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            plugin = _ref[_i];
            if (plugin._id === obj.name) {
                savePlugin(name, obj, attr, cb);
            }
            this.addModel(document, obj, attr, cb);
            return;
        }
    } else {
        savePlugin(name, obj, attr, cb);
    }
    return this.addModel(document, obj, attr, cb);
};