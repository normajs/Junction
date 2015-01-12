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