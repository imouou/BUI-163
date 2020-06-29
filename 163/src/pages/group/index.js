loader.define(function(require, exports, module) {

    var pageview = {
        init: function() {
            // 选项卡 js 初始化:
            var uiTab = bui.tab({
                id: "#uiTabGroup",
                swipe: false,
            });

            uiTab.on("to", function() {

                var index = this.index();
                console.log(index)
                loader.delay({
                    id: "#grouptab" + index
                });

            }).to(0)
        }
    };

    pageview.init();
    return pageview;
})