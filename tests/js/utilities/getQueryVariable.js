/*

  @function getQueryVariable()

  @param {Val}

  @return {Array} array of query values in url string matching the value
 */
junction.getQueryVariable = function (val) {
    var query, results, vars;
    query = window.location.search.substring(1);
    vars = query.split("&");
    results = vars.filter(function (element) {
        var pair;
        pair = element.split("=");
        if (decodeURIComponent(pair[0]) === val) {
            return decodeURIComponent(pair[1]);
        }
    });
    return results;
};