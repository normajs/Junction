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