(function () {
    var MutationObsever, mutationHandler, myObserver, obsConfig;
    MutationObsever = window.MutationObserver || window.WebKitMutationObserver;
    if (!MutationObsever) {
        return;
    }
    mutationHandler = function (mutations) {
        var changed, whiteList, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = mutations.length; _i < _len; _i++) {
            changed = mutations[_i];
            whiteList = ["HEAD", "HTML", "BODY", "TITLE", "SCRIPT"];
            if (whiteList.indexOf(changed.target.nodeName) > -1 || changed.addedNodes.length === 0) {
                continue;
            }
            _results.push(junction.updateModels(changed.target));
        }
        return _results;
    };
    myObserver = new MutationObsever(mutationHandler);
    obsConfig = {
        childList: true,
        characterData: true,
        attributes: true,
        subtree: true
    };
    myObserver.observe(document, obsConfig);
})();