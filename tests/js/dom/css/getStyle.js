(function () {
    var convertPropertyName, cssExceptions, vendorPrefixes, _getStyle;
    convertPropertyName = function (str) {
        return str.replace(/\-([A-Za-z])/g, function (match, character) {
            return character.toUpperCase();
        });
    };
    _getStyle = function (element, property) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    };
    cssExceptions = junction.cssExceptions;
    vendorPrefixes = ["", "-webkit-", "-ms-", "-moz-", "-o-", "-khtml-"];

/*
  
    Private function for getting the computed
    style of an element.
  
    NOTE** Please use the [css](../css.js.html) method instead.
  
    @method _getStyle
    @param {HTMLElement} element The element we want the style property for.
    @param {string} property The css property we want the style for.
   */
    return junction._getStyle = function (element, property) {
        var convert, exception, prefix, value, _i, _j, _len, _len1, _ref;
        if (cssExceptions[property]) {
            _ref = cssExceptions[property];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                exception = _ref[_i];
                value = _getStyle(element, exception);
                if (value) {
                    return value;
                }
            }
        }
        for (_j = 0, _len1 = vendorPrefixes.length; _j < _len1; _j++) {
            prefix = vendorPrefixes[_j];
            convert = convertPropertyName(prefix + property);
            value = _getStyle(element, convert);
            if (convert !== property) {
                value = value || _getStyle(element, property);
            }
            if (prefix) {
                value = value || _getStyle(element, prefix);
            }
            if (value) {
                return value;
            }
        }
        return void 0;
    };
})();