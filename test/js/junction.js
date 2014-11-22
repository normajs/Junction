/*

  Junction Object Constructor
 */
(function () {

/*
  
    @param {string, object} selector
      The selector to find or element to wrap
    @param {object} context
      The context in which to match the selector
    @returns junction
    @this window
   */
    var junction;
    junction = function (selector, context) {
        var domFragment, e, element, elements, isObject, returnElements, selectorType;
        selectorType = typeof selector;
        returnElements = [];
        if (!selector) {
            return;
        }
        isObject = Object.prototype.toString.call(selector) === '[object Array]' || selectorType === 'object' && selector instanceof window.NodeList;
        if (selectorType === "string" && selector.indexOf("<") === 0) {
            domFragment = document.createElement("div");
            domFragment.innerHTML = selector;
            return junction(domFragment).children().each(function () {
                return domFragment.removeChild(this);
            });
        } else if (selectorType === "function") {
            return junction.ready(selector);
        } else if (selectorType === "string") {
            if (context) {
                return junction(context).find(selector);
            }
            if (selector.indexOf("#") === 0) {
                try {
                    element = document.getElementByID(selector);
                    elements = [element];
                } catch (_error) {
                    e = _error;
                    junction.error('Id selector', selector);
                }
            } else {
                try {
                    elements = document.querySelectorAll(selector);
                } catch (_error) {
                    e = _error;
                    junction.error('Query selector', selector);
                }
            }
            returnElements = (function () {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = elements.length; _i < _len; _i++) {
                    element = elements[_i];
                    _results.push(element);
                }
                return _results;
            })();
        } else if (isObject) {
            returnElements = (function () {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = selector.length; _i < _len; _i++) {
                    element = selector[_i];
                    _results.push(element);
                }
                return _results;
            })();
        } else {
            returnElements = returnElements.concat(selector);
        }
        returnElements = junction.extend(returnElements, junction.fn);
        returnElements.selector = selector;
        return returnElements;
    };
    junction.fn = {};
    junction.extend = function (first, second) {
        var key;
        for (key in second) {
            if (second.hasOwnProperty(key)) {
                first[key] = second[key];
            }
        }
        return first;
    };
    return window["junction"] = junction;
})();