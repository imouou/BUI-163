loader.define(function(require, exports, module) {

    var params = bui.history.getParams("url");
    var pageview = {
        init: function() {

            router.$(".bui-bar-main").text(params.name || "栏目")
            loader.delay({
                id: "#articlelist",
                param: params
            })
        }
    };

    pageview.init();

    return pageview;
})