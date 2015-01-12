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