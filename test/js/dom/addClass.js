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