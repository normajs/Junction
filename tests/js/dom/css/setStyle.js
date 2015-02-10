(function () {
    var convertPropertyName, cssExceptions;
    convertPropertyName = function (str) {
        return str.replace(/\-([A-Za-z])/g, function (match, character) {
            return character.toUpperCase();
        });
    };
    cssExceptions = junction.cssExceptions;

/*
  
    Private function for setting the style of an element.
  
    NOTE** Please use the [css](../css.js.html) method instead.
  
    @method _setStyle
    @param {HTMLElement} element The element we want to style.
    @param {string} property The property being used to style the element.
    @param {string} value The css value for the style property.
   */
    return junction._setStyle = function (element, property, value) {
        var convertedProperty, exception, _i, _len, _ref;
        convertedProperty = convertPropertyName(property);
        element.style[property] = value;
        if (convertedProperty !== property) {
            element.style[convertedProperty] = value;
        }
        if (cssExceptions[property]) {
            _ref = cssExceptions[property];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                exception = _ref[_i];
                element.style[exception] = value;
                return;
            }
        }
    };
})();