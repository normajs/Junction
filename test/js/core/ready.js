var d, runable, w;

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