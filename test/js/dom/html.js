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