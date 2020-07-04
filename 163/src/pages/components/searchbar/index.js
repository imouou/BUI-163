/**
 * 搜索条, 如果有传keyword关键词, 默认会打开搜索结果, 外部调用 searchbar.search("搜索词") 就可以打开搜索结果,并且会存储起来.
 * 默认模块名为路径: pages/components/searchhistory/index
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   <component id="searchbar" name="pages/components/searchbar/index"></component>
 */
loader.define(function(require, exports, module) {
    // 定义
    var params = null;
    var pagenav = null;
    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);
            var urlparams = bui.history.getParams("url");

            var resultDialog = null;

            var that = this;

            // 有传关键词自动搜索
            if (urlparams.keyword) {

                that.resultdialog = bui.page({
                    url: "pages/components/list/index.html",
                    dialogid: "searchresult",
                    style: {
                        top: ".9rem"
                    },
                    effect: "showIn",
                    autoload: true,
                    param: {
                        type: "search",
                        result: "T1467284926140",
                        value: urlparams.keyword
                    }
                });
            } else {

                that.resultdialog = bui.page({
                    url: "pages/components/list/index.html",
                    dialogid: "searchresult",
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
            }
            // var n = 0;
            //搜索条的初始化
            this.searchbar = bui.searchbar({
                id: `#${module.id} .bui-searchbar`,
                onInput: function(e, keyword) {
                    //实时搜索
                    // console.log(++n)
                },
                onRemove: function(e, keyword) {
                    //删除关键词需要做什么其它处理
                    // console.log(keyword);
                    that.resultdialog.close();

                },
                callback: function(e, keyword) {

                }
            });

            // 触发搜索的时候, 打开历史对话框,并增加历史记录
            this.searchbar.on("search", function(e, val) {

                // 没搜索词不做处理
                if (!val) {
                    return;
                }
                // 重新加载关键词
                that.resultdialog.open();
                that.resultdialog.reload({
                    param: {
                        keyword: val
                    }
                });

                // 历史记录
                var historyDistace = bui.history.getComponent("searchhistory");
                // 增加历史记录
                historyDistace.add(val);
                return;
            })

            this.bind(params)

        },
        bind: function(opt) {
            // 只读的点击会跳转
            if (opt.readonly) {
                router.$(".bui-searchbar input").attr("readonly", true);
                router.$(".bui-searchbar").click(function(e) {
                    bui.load({
                        url: "pages/search/index.html"
                    })
                })
            }

        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})