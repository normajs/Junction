junction.isElement = function (el) {
    if (typeof HTMLElement === "object") {
        return el instanceof HTMLElement;
    } else {
        return el && typeof el === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName === "string";
    }
};