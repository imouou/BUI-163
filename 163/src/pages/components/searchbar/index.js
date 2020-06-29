/**
 * 空模块, xxx 为创建时候起的模块名
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   loader.require(["pages/xxx/xxx"],function(mod){
      // mod 指向xxx 抛出的方法
      mod.init()
   })
 */
loader.define(function(require, exports, module) {
    // 定义
    var params = null;
    var pagenav = null;
    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);

            var resultDialog = null;
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
                    if (resultDialog) {
                        resultDialog.close();
                    } else {
                        // 关闭搜索结果框
                        resultDialog = bui.history.getPageDialog("searchresult")
                        resultDialog.close();
                    }
                },
                callback: function(e, keyword) {

                }
            });

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