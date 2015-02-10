/*

  @function isMobile()

  @return {Boolean} true if Mobile
 */
junction.isMobile = (function (_this) {
    return function () {
        return /(Android|iPhone|iPad|iPod|IEMobile)/g.test(navigator.userAgent);
    };
})(this);