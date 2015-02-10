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