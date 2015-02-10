/*

@function isElementInView()

@param {Element} element to check against

@return {Boolean} if element is in view
 */
junction.isElementInView = function (element) {
    var coords;
    if (element instanceof jQuery) {
        element = element.get(0);
    }
    coords = element.getBoundingClientRect();
    return (Math.abs(coords.left) >= 0 && Math.abs(coords.top)) <= (window.innerHeight || document.documentElement.clientHeight);
};