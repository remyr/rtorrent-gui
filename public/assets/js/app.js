(function () {

    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var element = document.querySelector('.sidebar')
    var top = element.getBoundingClientRect().top + scrollY()

    var onScroll = function() {
        var hasClassFixed = element.classList.contains('sidebar-fixed')
        if (scrollY() > top && !hasClassFixed) {
            element.classList.add('sidebar-fixed')
        } else if (scrollY() < top && hasClassFixed) {
            element.classList.remove('sidebar-fixed')
        }
    }

    window.addEventListener('scroll', onScroll)

})()