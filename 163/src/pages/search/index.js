/**
 * 搜索列表页模板
 * 默认模块名: pages/searchbar/searchbar
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {
    var pageview = {
        init: function() {

            this.bind()
        },
        bind: function() {
            var that = this;
            that.listpage = bui.page({
                url: "pages/components/list/index.html",
                id: "searchresult",
                style: {
                    top: ".9rem"
                },
                effect: "showIn",
                autoload: false,
                param: {
                    type: "search",
                    result: "T1467284926140"
                }
            });
            router.$("#btnSearch").click(function() {
                // list1为id
                var searchbarDistace = bui.history.getComponent("searchbar");
                var val = searchbarDistace.searchbar.value();
                // 没搜索词不做处理
                if (!val) {
                    return;
                }
                // 历史记录
                var historyDistace = bui.history.getComponent("searchhistory");
                // 增加历史记录
                historyDistace.add(val);
                // 重新加载关键词
                if (that.listpage) {
                    that.listpage.open();
                    that.listpage.reload({
                        param: {
                            keyword: searchbarDistace.searchbar.value()
                        }
                    });
                    return;
                };

            })
        }
    };

    // 执行初始化
    pageview.init();

    return pageview;
})