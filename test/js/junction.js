/*

  Junction Object Constructor
 */
var d, runable, w, xmlHttp, __indexOf = [].indexOf ||
function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

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
        var domFragment, element, elements, returnElements, selectorType;
        selectorType = typeof selector;
        returnElements = [];
        if (selector) {
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
                elements = document.querySelectorAll(selector);
                returnElements = (function () {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = elements.length; _i < _len; _i++) {
                        element = elements[_i];
                        _results.push(element);
                    }
                    return _results;
                })();
            } else if (Object.prototype.toString.call(selector) === "[object Array]" || selectorType === "object" && selector instanceof window.NodeList) {
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
        }
        returnElements = junction.extend(returnElements, junction.fn);
        returnElements.selector = selector;
        return returnElements;
    };
    junction.fn = {};
    junction.state = {};
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


/*

  Iterates over `junction` collections.

  @param {function} callback The callback to be invoked on
    each element and index
  @return junction
  @this junction
 */

junction.fn.each = function (callback) {
    return junction.each(this, callback);
};

junction.each = function (collection, callback) {
    var item, val, _i, _len;
    for (_i = 0, _len = collection.length; _i < _len; _i++) {
        item = collection[_i];
        val = callback.call(item, _i, item);
        if (val === false) {
            break;
        }
    }
    return collection;
};


/*

  Check for array membership.

  @param {object} element The thing to find.
  @param {object} collection The thing to find the needle in.
  @return {boolean}
  @this window
 */

junction.inArray = function (element, collection) {
    var exists, index, item, _i, _len;
    exists = -1;
    for (index = _i = 0, _len = collection.length; _i < _len; index = ++_i) {
        item = collection[index];
        if (collection.hasOwnProperty(index) && collection[index] === element) {
            exists = index;
        }
    }
    return exists;
};

junction.state.ready = false;

junction.readyQueue = [];


/*

  Bind callbacks to be run with the DOM is "ready"

  @param {function} fn The callback to be run
  @return junction
  @this junction
 */

junction.ready = function (fn) {
    if (junction.ready && fn) {
        fn.call(document);
    } else if (fn) {
        junction.readyQueue.push(fn);
    } else {
        junction.runReady();
    }
    return [document];
};

junction.fn.ready = function (fn) {
    junction.ready(fn);
    return this;
};

junction.runReady = function () {
    if (!junction.state.ready) {
        while (junction.readyQueue.length) {
            junction.readyQueue.shift().call(document);
        }
        return junction.state.ready = true;
    }
};


/*

  If DOM is already ready at exec time, depends on the browser.
  From:
  https://github.com/mobify/mobifyjs/blob/526841be5509e28fc949038021799e4223479f8d/src/capture.js#L128
 */

d = document;

w = window;

if (d.attachEvent) {
    runable = d.readyState === "complete";
} else {
    runable = d.readyState !== "loading";
}

if (runable) {
    junction.runReady();
} else {
    if (!w.document.addEventListener) {
        w.document.attachEvent("DOMContentLoaded", junction.runReady);
        w.document.attachEvent("onreadystatechange", junction.runReady);
    } else {
        w.document.addEventListener("DOMContentLoaded", junction.runReady, false);
        w.document.addEventListener("onreadystatechange", junction.runReady, false);
    }
    w.addEventListener("load", junction.runReady, false);
}


/*

  Get data attached to the first element or set data values on
  all elements in the current set

  @param {string} name The data attribute name
  @param {any} value The value assigned to the data attribute
  @return {any|junction}
  @this junction
 */

junction.fn.data = function (name, value) {
    if (name !== void 0) {
        if (value !== void 0) {
            return this.each(function () {
                if (!this.junctionData) {
                    this.junctionData = {};
                }
                this.junctionData[name] = value;
            });
        } else {
            if (this[0] && this[0].junctionData) {
                return this[0].junctionData[name];
            } else {
                return void 0;
            }
        }
    } else {
        if (this[0]) {
            return this[0].junctionData || {};
        } else {
            return void 0;
        }
    }
};


/*

  Remove data associated with `name` or all the data, for each
  element in the current set

  @param {string} name The data attribute name
  @return junction
  @this junction
 */

junction.fn.removeData = function (name) {
    return this.each(function () {
        if (name !== void 0 && this.junctionData) {
            this.junctionData[name] = void 0;
            delete this.junctionData[name];
        } else {
            this[0].junctionData = {};
        }
    });
};

xmlHttp = function () {
    var e;
    try {
        return new XMLHttpRequest();
    } catch (_error) {
        e = _error;
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
};


/*

  Make an HTTP request to a url.

  NOTE** the following options are supported:

  - *method* - The HTTP method used with the request. Default: `GET`.
  - *data* - Raw object with keys and values to pass with request
      Default `null`.
  - *async* - Whether the opened request is asynchronouse. Default `true`.
  - *success* - Callback for successful request and response
      Passed the response data.
  - *error* - Callback for failed request and response.
  - *cancel* - Callback for cancelled request and response.

  @param {string} url The url to request.
  @param {object} options The options object, see Notes.
  @return junction
  @this junction
 */

junction.ajax = function (url, options) {
    var req, settings;
    req = xmlHttp();
    settings = junction.extend({}, junction.ajax.settings);
    if (options) {
        junction.extend(settings, options);
    }
    if (!url) {
        url = settings.url;
    }
    if (!req || !url) {
        return;
    }
    req.open(settings.method, url, settings.async);
    if (req.setRequestHeader) {
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }
    req.onreadystatechange = function () {
        var res;
        if (req.readyState === 4) {
            res = (req.responseText || "").replace(/^\s+|\s+$/g, "");
            if (req.status.toString().indexOf("0") === 0) {
                return settings.cancel(res, req.status, req);
            } else if (req.status.toString().match(/^(4|5)/) && RegExp.$1) {
                return settings.error(res, req.status, req);
            } else {
                return settings.success(res, req.status, req);
            }
        }
    };
    if (req.readyState === 4) {
        return req;
    }
    req.send(settings.data || null);
    return req;
};

junction.ajax.settings = {
    success: function () {},
    error: function () {},
    cancel: function () {},
    method: "GET",
    async: true,
    data: null
};


/*

  Helper function wrapping a call to [ajax](ajax.js.html)
  using the `GET` method.

  @param {string} url The url to GET from.
  @param {function} callback Callback to invoke on success.
  @return junction
  @this junction
 */

junction.get = function (url, callback) {
    return junction.ajax(url, {
        success: callback
    });
};


/*

  Load the HTML response from `url` into the current set of elements.

  @param {string} url The url to GET from.
  @param {function} callback Callback to invoke after HTML is inserted.
  @return junction
  @this junction
 */

junction.fn.load = function (url, callback) {
    var args, intCB, self;
    self = this;
    args = arguments;
    intCB = function (data) {
        self.each(function () {
            junction(this).html(data);
        });
        if (callback) {
            callback.apply(self, args);
        }
    };
    junction.ajax(url, {
        success: intCB
    });
    return this;
};


/*

  Helper function wrapping a call to [ajax](ajax.js.html)
  using the `POST` method.

  @param {string} url The url to POST to.
  @param {object} data The data to send.
  @param {function} callback Callback to invoke on success.
  @return junction
  @this junction
 */

junction.post = function (url, data, callback) {
    return junction.ajax(url, {
        data: data,
        method: "POST",
        success: callback
    });
};


/*

  Add elements matching the selector to the current set.

  @param {string} selector The selector for the elements to add from the DOM
  @return junction
  @this junction
 */

junction.fn.add = function (selector) {
    var ret;
    ret = [];
    this.each(function () {
        ret.push(this);
    });
    junction(selector).each(function () {
        ret.push(this);
    });
    return junction(ret);
};


/*

  Add a class to each DOM element in the set of elements.

  @param {string} className The name of the class to be added.
  @return junction
  @this junction
 */

junction.fn.addClass = function (className) {
    var classes;
    classes = className.replace(/^\s+|\s+$/g, "").split(" ");
    return this.each(function () {
        var klass, regex, withoutClass, _i, _len;
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
            klass = classes[_i];
            if (this.className !== void 0) {
                klass = klass.trim();
                regex = new RegExp("(?:^| )(" + klass + ")(?: |$)");
                withoutClass = !this.className.match(regex);
                if (this.className === "" || withoutClass) {
                    if (this.className === "") {
                        this.className += "" + klass;
                    } else {
                        this.className += " " + klass;
                    }
                    return;
                }
            }
        }
    });
};


/*

  Insert an element or HTML string after each element in the current set.

  @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
  @return junction
  @this junction
 */

junction.fn.after = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== void 0) {
        fragment = junction(fragment);
    }
    if (fragment.length > 1) {
        fragment = fragment.reverse();
    }
    return this.each(function (index) {
        var insertEl, piece, _i, _len;
        for (_i = 0, _len = fragment.length; _i < _len; _i++) {
            piece = fragment[_i];
            insertEl = (index > 0 ? piece.cloneNode(true) : piece);
            this.parentNode.insertBefore(insertEl, this.nextSibling);
            return;
        }
    });
};


/*

  Insert an element or HTML string as the last child of each element in the set.

  @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
  @return junction
  @this junction
 */

junction.fn.append = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== void 0) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var element, piece, _i, _len;
        for (_i = 0, _len = fragment.length; _i < _len; _i++) {
            piece = fragment[_i];
            element = (index > 0 ? piece.cloneNode(true) : piece);
            this.appendChild(element);
            return;
        }
    });
};


/*

  Insert the current set as the last child of the elements
  matching the selector.

  @param {string} selector The selector after which to append the current set.
  @return junction
  @this junction
 */

junction.fn.appendTo = function (selector) {
    return this.each(function () {
        junction(selector).append(this);
    });
};


/*

  Get the value of the first element of the set or set
  the value of all the elements in the set.

  @param {string} name The attribute name.
  @param {string} value The new value for the attribute.
  @return {junction|string|undefined}
  @this {junction}
 */

junction.fn.attr = function (name, value) {
    var nameStr;
    nameStr = typeof name === "string";
    if (value !== void 0 || !nameStr) {
        return this.each(function () {
            var i;
            if (nameStr) {
                this.setAttribute(name, value);
            } else {
                for (i in name) {
                    if (name.hasOwnProperty(i)) {
                        this.setAttribute(i, name[i]);
                    }
                }
            }
        });
    } else {
        if (this[0]) {
            return this[0].getAttribute(name);
        } else {
            return void 0;
        }
    }
};


/*

  Insert an element or HTML string before each
  element in the current set.

  @param {string|HTMLElement} fragment The HTML or HTMLElement to insert.
  @return junction
  @this junction
 */

junction.fn.before = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== undefined) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var insertEl, piece, _i, _len;
        for (_i = 0, _len = fragment.length; _i < _len; _i++) {
            piece = fragment[_i];
            insertEl = (index > 0 ? piece.cloneNode(true) : piece);
            this.parentNode.insertBefore(insertEl, this);
            return;
        }
    });
};


/*

  Get the children of the current collection.
  @return junction
  @this junction
 */

junction.fn.children = function () {
    var returns;
    returns = [];
    this.each(function () {
        var children, i, _results;
        children = this.children;
        i = -1;
        _results = [];
        while (i++ < children.length - 1) {
            if (junction.inArray(children[i], returns) === -1) {
                _results.push(returns.push(children[i]));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    });
    return junction(returns);
};


/*

  Clone and return the current set of nodes into a
  new `junction` object.

  @return junction
  @this junction
 */

junction.fn.clone = function () {
    var returns;
    returns = [];
    this.each(function () {
        returns.push(this.cloneNode(true));
    });
    return junction(returns);
};


/*

  Find an element matching the selector in the
  set of the current element and its parents.

  @param {string} selector The selector used to identify the target element.
  @return junction
  @this junction
 */

junction.fn.closest = function (selector) {
    var returns;
    returns = [];
    if (!selector) {
        return junction(returns);
    }
    this.each(function () {
        var $self, element;
        element = void 0;
        $self = junction(element = this);
        if ($self.is(selector)) {
            returns.push(this);
            return;
        }
        while (element.parentElement) {
            if (junction(element.parentElement).is(selector)) {
                returns.push(element.parentElement);
                break;
            }
            element = element.parentElement;
        }
    });
    return junction(returns);
};


/*

  Get the compute style property of the first
  element or set the value of a style property
  on all elements in the set.

  @method _setStyle
  @param {string} property The property being used to style the element.
  @param {string|undefined} value The css value for the style property.
  @return {string|junction}
  @this junction
 */

junction.fn.css = function (property, value) {
    if (!this[0]) {
        return;
    }
    if (typeof property === "object") {
        return this.each(function () {
            var key;
            for (key in property) {
                if (property.hasOwnProperty(key)) {
                    junction._setStyle(this, key, property[key]);
                }
            }
        });
    } else {
        if (value !== undefined) {
            return this.each(function () {
                junction._setStyle(this, property, value);
            });
        }
        return junction._getStyle(this[0], property);
    }
};

junction.cssExceptions = {
    'float': ['cssFloat', 'styleFloat']
};

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


/*

  Private function for setting/getting the offset
  property for height/width.

  NOTE** Please use the [width](width.js.html)
  or [height](height.js.html) methods instead.

  @param {junction} set The set of elements.
  @param {string} name The string "height" or "width".
  @param {float|undefined} value The value to assign.
  @return junction
  @this window
 */

junction._dimension = function (set, name, value) {
    var offsetName;
    if (value === undefined) {
        offsetName = name.replace(/^[a-z]/, function (letter) {
            return letter.toUpperCase();
        });
        return set[0]["offset" + offsetName];
    } else {
        value = (typeof value === "string" ? value : value + "px");
        return set.each(function () {
            this.style[name] = value;
        });
    }
};


/*

  Returns the indexed element wrapped in a new `junction` object.

  @param {integer} index The index of the element to wrap and return.
  @return junction
  @this junction
 */

junction.fn.eq = function (index) {
    if (this[index]) {
        return junction(this[index]);
    }
    return junction([]);
};


/*

  Filter out the current set if they do *not*
  match the passed selector or the supplied callback returns false

  @param {string,function} selector The selector or boolean return value callback used to filter the elements.
  @return junction
  @this junction
 */

junction.fn.filter = function (selector) {
    var returns;
    returns = [];
    this.each(function (index) {
        var context, filterSelector;
        if (typeof selector === "function") {
            if (selector.call(this, index) !== false) {
                returns.push(this);
            }
        } else {
            if (!this.parentNode) {
                context = junction(document.createDocumentFragment());
                context[0].appendChild(this);
                filterSelector = junction(selector, context);
            } else {
                filterSelector = junction(selector, this.parentNode);
            }
            if (junction.inArray(this, filterSelector) > -1) {
                returns.push(this);
            }
        }
    });
    return junction(returns);
};


/*

  Find descendant elements of the current collection.

  @param {string} selector The selector used to find the children
  @return junction
  @this junction
 */

junction.fn.find = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var e, finds, found, _i, _len, _results;
        try {
            finds = this.querySelectorAll(selector);
        } catch (_error) {
            e = _error;
            junction.error("queryselector", selector);
            return false;
        }
        _results = [];
        for (_i = 0, _len = finds.length; _i < _len; _i++) {
            found = finds[_i];
            _results.push(returns = returns.concat(found));
        }
        return _results;
    });
    return junction(returns);
};


/*

  Returns the first element of the set wrapped in a new `shoestring` object.

  @return junction
  @this junction
 */

junction.fn.first = function () {
    return this.eq(0);
};


/*

  Returns the raw DOM node at the passed index.

  @param {integer} index The index of the element to wrap and return.
  @return HTMLElement
  @this junction
 */

junction.fn.get = function (index) {
    return this[index];
};


/*

  Returns a boolean if elements have the class passed

  @param {string} selector The selector to check.
  @return {boolean}
  @this {junction}
 */

junction.fn.hasClass = function (className) {
    var returns;
    returns = false;
    this.each(function () {
        var regex;
        regex = new RegExp(" " + className + " ");
        return returns = regex.test(" " + this.className + " ");
    });
    return returns;
};


/*

  Gets the height value of the first element or
  sets the height for the whole set.

  @param {float|undefined} value The value to assign.
  @return junction
  @this junction
 */

junction.fn.height = function (value) {
    return junction._dimension(this, "height", value);
};


/*

  Gets or sets the `innerHTML` from all the elements in the set.

  @param {string|undefined} html The html to assign
  @return {string|junction}
  @this junction
 */

junction.fn.html = function (html) {
    var pile, set;
    set = function (html) {
        var part, _i, _len;
        if (typeof html === "string") {
            return this.each(function () {
                this.innerHTML = html;
            });
        } else {
            part = "";
            if (typeof html.length !== "undefined") {
                for (_i = 0, _len = html.length; _i < _len; _i++) {
                    part = html[_i];
                    part += part.outerHTML;
                    return;
                }
            } else {
                part = html.outerHTML;
            }
            return this.each(function () {
                this.innerHTML = part;
            });
        }
    };
    if (typeof html !== "undefined") {
        return set.call(this, html);
    } else {
        pile = "";
        this.each(function () {
            pile += this.innerHTML;
        });
        return pile;
    }
};

(function () {
    var _getIndex;
    return _getIndex = function (set, test) {
        var element, item, _i, _len;
        for (_i = 0, _len = set.length; _i < _len; _i++) {
            item = set[_i];
            element = (set.item ? set.item(item) : item);
            if (test(element)) {
                return result;
            }
            if (element.nodeType === 1) {
                result++;
            }
        }
        return -1;

/*
    
      Find the index in the current set for the passed
      selector. Without a selector it returns the
      index of the first node within the array of its siblings.
    
      @param {string|undefined} selector The selector used to search for the index.
      @return {integer}
      @this {junction}
     */
        return junction.fn.index = function (selector) {
            var children, self;
            self = this;
            if (selector === undefined) {
                children = ((this[0] && this[0].parentNode) || document.documentElement).childNodes;
                return _getIndex(children, function (element) {
                    return self[0] === element;
                });
            } else {
                return _getIndex(self, function (element) {
                    return element === (junction(selector, element.parentNode)[0]);
                });
            }
        };
    };
})();


/*

  Insert the current set after the elements matching the selector.

  @param {string} selector The selector after which to insert the current set.
  @return junction
  @this junction
 */

junction.fn.insertAfter = function (selector) {
    return this.each(function () {
        junction(selector).after(this);
    });
};


/*

  Insert the current set after the elements matching the selector.

  @param {string} selector The selector after which to insert the current set.
  @return junction
  @this junction
 */

junction.fn.insertBefore = function (selector) {
    return this.each(function () {
        junction(selector).before(this);
    });
};


/*

  Checks the current set of elements against
  the selector, if one matches return `true`.

  @param {string} selector The selector to check.
  @return {boolean}
  @this {junction}
 */

junction.fn.is = function (selector) {
    var returns;
    returns = false;
    this.each(function () {
        if (junction.inArray(this, junction(selector)) > -1) {
            returns = true;
        }
    });
    return returns;
};


/*

  Returns the last element of the set wrapped in a new `shoestring` object.

  @return junction
  @this junction
 */

junction.fn.last = function () {
    return this.eq(this.length - 1);
};


/*

  Returns a `junction` object with the set of siblings of each element in the original set.

  @return junction
  @this junction
 */

junction.fn.next = function () {
    var returns;
    returns = [];
    this.each(function () {
        var child, children, found, index, item, _i, _len, _results;
        children = junction(this.parentNode)[0].childNodes;
        found = false;
        _results = [];
        for (index = _i = 0, _len = children.length; _i < _len; index = ++_i) {
            child = children[index];
            item = children.item[index];
            if (found && item.nodeType === 1) {
                returns.push(item);
            }
            if (item === this) {
                found = true;
            }
            _results.push(false);
        }
        return _results;
    });
    return junction(returns);
};


/*

  Removes elements from the current set.

  @param {string} selector The selector to use when removing the elements.
  @return junction
  @this junction
 */

junction.fn.not = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var found;
        found = junction(selector, this.parentNode);
        if (junction.inArray(this, found) === -1) {
            returns.push(this);
        }
    });
    return junction(returns);
};


/*

  Returns an object with the `top` and `left`
  properties corresponging to the first elements offsets.

  @return object
  @this junction
 */

junction.fn.offset = function () {
    return {
        top: this[0].offsetTop,
        left: this[0].offsetLeft
    };
};


/*

  Returns the set of first parents for each element
  in the current set.

  @return junction
  @this junction
 */

junction.fn.parent = function () {
    var returns;
    returns = [];
    this.each(function () {
        var parent;
        parent = (this === document.documentElement ? document : this.parentNode);
        if (parent && parent.nodeType !== 11) {
            returns.push(parent);
        }
    });
    return junction(returns);
};


/*

  Returns the set of all parents matching the
  selector if provided for each element in the current set.

  @param {string} selector The selector to check the parents with.
  @return junction
  @this junction
 */

junction.fn.parents = function (selector) {
    var returns;
    returns = [];
    this.each(function () {
        var current, match;
        current = this;
        match;
        while (current.parentElement && !match) {
            current = current.parentElement;
            if (selector) {
                if (current === junction(selector)[0]) {
                    match = true;
                    if (junction.inArray(current, returns) === -1) {
                        returns.push(current);
                    }
                }
            } else {
                if (junction.inArray(current, returns) === -1) {
                    returns.push(current);
                }
            }
        }
    });
    return junction(returns);
};


/*

  Add an HTML string or element before the children
  of each element in the current set.

  @param {string|HTMLElement} fragment The HTML string or element to add.
  @return junction
  @this junction
 */

junction.fn.prepend = function (fragment) {
    if (typeof fragment === "string" || fragment.nodeType !== undefined) {
        fragment = junction(fragment);
    }
    return this.each(function (index) {
        var insertEl, piece, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = fragement.length; _i < _len; _i++) {
            piece = fragement[_i];
            insertEl = (index > 0 ? piece.cloneNode(true) : piece);
            if (this.firstChild) {
                _results.push(this.insertBefore(insertEl, this.firstChild));
            } else {
                _results.push(this.appendChild(insertEl));
            }
        }
        return _results;
    });
};


/*

  Add each element of the current set before the
  children of the selected elements.

  @param {string} selector The selector for the elements to add the current set to..
  @return junction
  @this junction
 */

junction.fn.prependTo = function (selector) {
    return this.each(function () {
        junction(selector).prepend(this);
    });
};


/*

  Returns a `junction` object with the set of *one*
  sibling before each element in the original set.

  @return junction
  @this junction
 */

junction.fn.prev = function () {
    var returns;
    returns = [];
    this.each(function () {
        var child, children, found, index, item, _i, _results;
        children = junction(this.parentNode)[0].childNodes;
        found = false;
        _results = [];
        for (index = _i = children.length - 1; _i >= 0; index = _i += -1) {
            child = children[index];
            item = children.item[index];
            if (found && item.nodeType === 1) {
                returns.push(item);
            }
            if (item === this) {
                found = true;
            }
            _results.push(false);
        }
        return _results;
    });
    return junction(returns);
};


/*

  Returns a `junction` object with the set of *all*
  siblings before each element in the original set.

  @return junction
  @this junction
 */

junction.fn.prevAll = function () {
    var returns;
    returns = [];
    this.each(function () {
        var $previous;
        $previous = junction(this).prev();
        while ($previous.length) {
            returns.push($previous[0]);
            $previous = $previous.prev();
        }
    });
    return junction(returns);
};


/*

  Gets the property value from the first element
  or sets the property value on all elements of the currrent set.

  @param {string} name The property name.
  @param {any} value The property value.
  @return {any|junction}
  @this junction
 */

junction.fn.prop = function (name, value) {
    if (!this[0]) {
        return;
    }
    name = junction.propFix[name] || name;
    if (value !== undefined) {
        return this.each(function () {
            this[name] = value;
        });
    } else {
        return this[0][name];
    }
};

junction.propFix = {
    "class": "className",
    "contenteditable": "contentEditable",
    "for": "htmlFor",
    "readonly": "readOnly",
    "tabindex": "tabIndex"
};


/*

  Remove the current set of elements from the DOM.

  @return junction
  @this junction
 */

junction.fn.remove = function () {
    return this.each(function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    });
};


/*

  Remove an attribute from each element in the current set.

  @param {string} name The name of the attribute.
  @return junction
  @this junction
 */

junction.fn.removeAttr = function (name) {
    return this.each(function () {
        this.removeAttribute(name);
    });
};


/*

  Remove a class from each DOM element in the set of elements.

  @param {string} className The name of the class to be removed.
  @return junction
  @this junction
 */

junction.fn.removeClass = function (className) {
    var classes;
    classes = className.replace(/^\s+|\s+$/g, "").split(" ");
    return this.each(function () {
        var klass, newClassName, regex, _i, _len;
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
            klass = classes[_i];
            if (this.className !== undefined) {
                regex = new RegExp("(^|\\s)" + klass + "($|\\s)", "gmi");
                newClassName = this.className.replace(regex, " ");
                this.className = newClassName.replace(/^\s+|\s+$/g, "");
            }
            return;
        }
    });
};


/*

  Remove a proprety from each element in the current set.

  @param {string} name The name of the property.
  @return junction
  @this junction
 */

junction.fn.removeProp = function (property) {
    var name;
    name = junction.propFix[property] || property;
    return this.each(function () {
        this[name] = undefined;
        delete this[name];
    });
};


/*

  Replace each element in the current set with that argument HTML string or HTMLElement.

  @param {string|HTMLElement} fragment The value to assign.
  @return junction
  @this junction
 */

junction.fn.replaceWith = function (fragment) {
    var framgent, returns;
    if (typeof fragment === "string") {
        fragment = junction(fragment);
    }
    returns = [];
    if (fragment.length > 1) {
        framgent = framgent.reverse();
    }
    this.each(function (index) {
        var clone, insertEl, piece, _i, _len;
        clone = this.cloneNode(true);
        returns.push(clone);
        if (!this.parentNode) {
            return;
        }
        if (fragment.length === 1) {
            insertEl = (index > 0 ? fragment[0].cloneNode(true) : fragment[0]);
            return this.parentNode.replaceChild(insertEl, this);
        } else {
            for (_i = 0, _len = fragment.length; _i < _len; _i++) {
                piece = fragment[_i];
                insertEl = (index > 0 ? piece.cloneNode(true) : piece);
                this.parentNode.insertBefore(insertEl, this.nextSibling);
                return;
            }
            return this.parentNode.removeChild(this);
        }
    });
    return junction(retunrs);
};

junction.inputTypes = ["text", "hidden", "password", "color", "date", "datetime", "email", "month", "number", "range", "search", "tel", "time", "url", "week"];

junction.inputTypeTest = new RegExp(junction.inputTypes.join("|"));


/*

  Serialize child input element values into an object.

  @return junction
  @this junction
 */

junction.fn.serialize = function () {
    var data;
    data = {};
    junction("input, select", this).each(function () {
        var name, type, value;
        type = this.type;
        name = this.name;
        value = this.value;
        if (junction.inputTypeTest.test(type) || (type === "checkbox" || type === "radio") && this.checked) {
            data[name] = value;
        } else if (this.nodeName === "select") {
            data[name] = this.options[this.selectedIndex].nodeValue;
        }
    });
    return data;
};


/*

  Get all of the sibling elements for each element in the current set.

  @return junction
  @this junction
 */

junction.fn.siblings = function () {
    var el, siblings;
    if (!this.length) {
        return junction([]);
    }
    siblings = [];
    el = this[0].parentNode.firstChild;
    while (true) {
        if (el.nodeType === 1 && el !== this[0]) {
            siblings.push(el);
        }
        el = el.nextSibling;
        if (!el) {
            break;
        }
    }
    return junction(siblings);
};


/*

  Recursively retrieve the text content of the each element in the current set.

  @return junction
  @this junction
 */

junction.fn.text = function () {
    var getText;
    getText = function (elem) {
        var i, node, nodeType, text;
        text = "";
        nodeType = elem.nodeType;
        i = 0;
        if (!nodeType) {
            while (node = elem[i++]) {
                text += getText(node);
            }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === "string") {
                return elem.textContent;
            } else {
                elem = elem.firstChild;
                while (elem) {
                    ret += getText(elem);
                    elem = elem.nextSibling;
                }
            }
        } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
        }
        return text;
    };
    return getText(this);
};


/*

  Toggles class of elements in selector

  @param {string} className Class to be toggled
  @return junction
  @this junction
 */

junction.fn.toggleClass = function (className) {
    if (this.hasClass(className)) {
        return this.removeClass(className);
    } else {
        return this.addClass(className);
    }
};


/*

  Get the value of the first element or set the value
  of all elements in the current set.

  @param {string} value The value to set.
  @return junction
  @this junction
 */

junction.fn.val = function (value) {
    var el;
    if (value !== undefined) {
        return this.each(function () {
            var i, inArray, newIndex, optionSet, options, values;
            if (this.tagName === "SELECT") {
                options = this.options;
                values = [];
                i = options.length;
                values[0] = value;
                while (i--) {
                    options = options[i];
                    inArray = junction.inArray(option.value, values) >= 0;
                    if ((option.selected = inArray)) {
                        optionSet = true;
                        newIndex = i;
                    }
                }
                if (!optionSet) {
                    return this.selectedIndex = -1;
                } else {
                    return this.selectedIndex = newIndex;
                }
            } else {
                return this.value = value;
            }
        });
    } else {
        el = this[0];
        if (el.tagName === "SELECT") {
            if (el.selectedIndex < 0) {
                return "";
            }
        } else {
            return el.value;
        }
    }
};


/*

  Gets the width value of the first element or
  sets the width for the whole set.

  @param {float|undefined} value The value to assign.
  @return junction
  @this junction
 */

junction.fn.width = function (value) {
    return junction._dimension(this, "width", value);
};


/*

  Wraps the child elements in the provided HTML.

  @param {string} html The wrapping HTML.
  @return junction
  @this junction
 */

junction.fn.wrapInner = function (html) {
    return this.each(function () {
        var inH;
        inH = this.innerHTML;
        this.innerHTML = "";
        junction(this).append(junction(html).html(inH));
    });
};


/*

  Bind a callback to an event for the currrent set of elements.

  @param {string} evt The event(s) to watch for.
  @param {object,function} data Data to be included
    with each event or the callback.
  @param {function} originalCallback Callback to be
    invoked when data is define.d.
  @return junction
  @this junction
 */

junction.fn.bind = function (evt, data, originalCallback) {
    var addtoEventCaches, docEl, encasedCallback, evts, initEventCache, propChange, reorderEvents;
    initEventCache = function (el, evtt) {
        if (!el.junctionData) {
            el.junctionData = {};
        }
        if (!el.junctionData.events) {
            el.junctionData.events = {};
        }
        if (!el.junctionData.loop) {
            el.junctionData.loop = {};
        }
        if (!el.junctionData.events[evtt]) {
            return el.junctionData.events[evtt] = [];
        }
    };
    addtoEventCaches = function (el, evtt, eventInfo) {
        var obj;
        obj = {};
        obj.isCustomEvent = eventInfo.isCustomEvent;
        obj.callback = eventInfo.callfunc;
        obj.originalCallback = eventInfor.originalCallback;
        obj.namespace = eventInfo.namespace;
        el.junctionData.events[evtt].push(obj);
        if (eventInfo.customEventLoop) {
            return el.junctionData.loop[evtt] = eventInfo.customEventLoop;
        }
    };
    console.log(addtoEventCaches);

/*
  
    In IE8 the events trigger in a reverse order (LIFO).
    This code unbinds and rebinds all callbacks on an
    element in the a FIFO order.
   */
    reorderEvents = function (node, eventName) {
        var event, otherEvents, _i, _results;
        if (node.addEventListener || !node.junctionData || !node.junctionData.events) {
            return;
        }
        otherEvents = node.junctionData.events[eventName] || [];
        _results = [];
        for (_i = otherEvents.length - 1; _i >= 0; _i += -1) {
            event = otherEvents[_i];
            if (!event.isCustomEvent) {
                node.deatchEvent("on" + eventName, event.callback);
                _results.push(node.attachEvent("on" + eventName, event.callback));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };
    if (typeof data === "function") {
        originalCallback = data;
        data = null;
    }
    evts = evt.split(" ");
    docEl = document.documentElement;
    encasedCallback = function (e, namespace, triggeredElement) {
        var originalPreventDefault, preventDefaultConstructor, result, returnTrue;
        if (e._namespace && e._namespace !== namespace) {
            return;
        }
        e.data = data;
        e.namespace = e._namespace;
        returnTrue = function () {
            return true;
        };
        e.isDefaultPrevented = function () {
            return false;
        };
        originalPreventDefault = e.preventDefault;
        preventDefaultConstructor = function () {
            if (originalPreventDefault) {
                return function () {
                    e.isDefaultPrevented = returnTrue;
                    originalPreventDefault.call(e);
                };
            } else {
                return function () {
                    e.isDefaultPrevented = returnTrue;
                    e.returnValue = false;
                };
            }
        };
        e.target = triggeredElement || e.target || e.srcElement;
        e.preventDefault = preventDefaultConstructor();
        e.stopPropagation = e.stopPropagation ||
        function () {
            e.cancelBubble = true;
        };
        if (originalCallback) {
            result = originalCallback.apply(this, [e].concat(e._args));
        } else {
            result = false;
        }
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    };
    propChange = function (originalEvent, boundElement, namespace) {
        var bnChEl, boundCheckElement, lastEventInfo, trEl, triggeredElement;
        lastEventInfo = document.documentElement[originalEvent.propertyName];
        triggeredElement = lastEventInfo.el;
        boundCheckElement = boundElement;
        if (boundElement === document && triggeredElement !== document) {
            boundCheckElement = document.documentElement;
        }
        trEl = triggeredElement;
        bnChEl = boundCheckElement;
        if (trEl !== void 0 && junction(trEl).closest(bnChEl).length) {
            originalEvent._namespace = lastEventInfo._namespace;
            originalEvent._args = lastEventInfo._args;
            encasedCallback.call(boundElement, originalEvent, namespace, triggeredElement);
        }
    };
    console.log(addToEventCache);
};

junction.fn.on = junction.fn.bind;


/*

  Bind a callback to an event for the currrent
  set of elements, unbind after one occurence.

  @param {string} event The event(s) to watch for.
  @param {function} callback Callback to invoke on the event.
  @return junction
  @this junction
 */

junction.fn.one = function (event, callback) {
    var evts;
    evts = event.split(" ");
    return this.each(function () {
        var $t, cbs, thisevt, _i, _len;
        cbs = {};
        $t = junction(this);
        for (_i = 0, _len = evts.length; _i < _len; _i++) {
            thisevt = evts[_i];
            cbs[thisevt] = function (e) {
                var j;
                $t = junction(this);
                for (j in cbs) {
                    $t.unbind(j, cbs[j]);
                }
                return callback.apply(this, [e].concat(e._args));
            };
            $t.bind(thisevt, cbs[thisevt]);
            return;
        }
    });
};


/*

  Trigger an event on each of the DOM elements in the current set.

  @param {string} event The event(s) to trigger.
  @param {object} args Arguments to append to callback invocations.
  @return junction
  @this junction
 */

junction.fn.trigger = function (event, args) {
    var evts;
    evts = event.split(" ");
    return this.each(function () {
        var evnt, evt, namespace, split, _i, _len;
        for (_i = 0, _len = evts.length; _i < _len; _i++) {
            evnt = evts[_i];
            split = evnt.split(".");
            evt = split[0];
            namespace = (split.length > 0 ? split[1] : null);
            if (evt === "click") {
                if (this.tagName === "INPUT" && this.type === "checkbox" && this.click) {
                    this.click();
                    return false;
                }
            }
            if (document.createEvent) {
                event = document.createEvent("Event");
                event.initEvent(evt, true, true);
                event._args = args;
                event._namespace = namespace;
                this.dispatchEvent(event);
            } else if (document.createEventObject) {
                if (("" + this[evt]).indexOf("function") > -1) {
                    this.ssEventTrigger = {
                        _namespace: namespace,
                        _args: args
                    };
                    this[evt]();
                } else {
                    document.documentElement[evt] = {
                        el: this,
                        _namespace: namespace,
                        _args: args
                    };
                }
            }
        }
    });
};


/*

  Trigger an event on the first element in the set,
  no bubbling, no defaults.

  @param {string} event The event(s) to trigger.
  @param {object} args Arguments to append to callback invocations.
  @return junction
  @this junction
 */

junction.fn.triggerHandler = function (event, args) {
    var bindings, e, el, i, ret;
    e = event.split(" ")[0];
    el = this[0];
    ret - void 0;
    if (document.createEvent && el.shoestringData && el.shoestringData.events && el.shoestringData.events[e]) {
        bindings = el.shoestringData.events[e];
        for (i in bindings) {
            if (bindings.hasOwnProperty(i)) {
                event = document.createEvent("Event");
                event.initEvent(e, true, true);
                event._args = args;
                args.unshift(event);
                ret = bindings[i].originalCallback.apply(event.target, args);
            }
        }
    }
    return ret;
};


/*

  Unbind a previous bound callback for an event.

  @param {string} event The event(s) the callback was bound to..
  @param {function} callback Callback to unbind.
  @return junction
  @this junction
 */

junction.fn.unbind = function (event, callback) {
    var evts, unbind, unbindAll;
    unbind = function (e, namespace, cb) {
        var bnd, bound, match, matched, _i, _j, _len, _len1, _results;
        matched = [];
        bound = this.junctionData.events[e];
        console.log(this.junctionData.events, e);
        if (!bound.length) {
            return;
        }
        for (_i = 0, _len = bound.length; _i < _len; _i++) {
            bnd = bound[_i];
            if (!namespace || namespace === bnd.namespace) {
                if (cb === void 0 || cb === bnd.originalCallback) {
                    if (__indexOf.call(window, "removeEventListener") >= 0) {
                        this.removeEventListener(e, bnd.callback, false);
                    } else if (this.detachEvent) {
                        this.detachEvent("on" + e, bnd.callback);
                        if (bound.length === 1 && this.junctionData.loop && this.junctionData.loop[e]) {
                            document.documentElement.detachEvent("onpropertychange", this.junctionData.loop[e]);
                        }
                    }
                    matched.push(j);
                }
            }
            return;
        }
        _results = [];
        for (_j = 0, _len1 = matched.length; _j < _len1; _j++) {
            match = matched[_j];
            _results.push(this.junctionData.events[e].splice(match, 1));
        }
        return _results;
    };
    unbindAll = function (namespace, cb) {
        var evtKey;
        for (evtKey in this.junctionData.events) {
            unbind.call(this, evtKey, namespace, cb);
        }
    };
    evts = (event ? event.split(" ") : []);
    return this.each(function () {
        var evnt, evt, namespace, split, _i, _len, _results;
        if (!this.junctionData || !this.junctionData.events) {
            return;
        }
        if (!evts.length) {
            return unbindAll.call(this);
        } else {
            _results = [];
            for (_i = 0, _len = evts.length; _i < _len; _i++) {
                evnt = evts[_i];
                split = evnt.split(".");
                evt = split[0];
                namespace = (split.length > 0 ? split[1] : null);
                if (evt) {
                    _results.push(unbind.call(this, evt, namespace, callback));
                } else {
                    _results.push(unbindAll.call(this, namespace, callback));
                }
            }
            return _results;
        }
    });
};

junction.fn.off = junction.fn.unbind;