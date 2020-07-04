/**
 * 搜索列表页模板
 * 默认模块名: pages/searchbar/searchbar
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {
    var pageview = {
        init: function() {
            var params = bui.history.getParams(module.id);

            if (params.keyword) {
                // 第1种, 有传关键词时, 等待子组件加载完成以后, 调用搜索
                loader.wait(["searchbar"], function(distance) {
                    var searchbarDistace = distance.exports;

                    var val = params.keyword;
                    // 没搜索词不做处理
                    if (!val) {
                        return;
                    }
                    searchbarDistace.searchbar.value(val);
                    searchbarDistace.searchbar.search(val);
                })
            }
            // 绑定自定义按钮的搜索事件.
            this.bind()
        },
        bind: function() {

            router.$("#btnSearch").click(function() {
                // 第2种, 点击的时候,子组件都会加载完毕,直接获取子组件,调用搜索方法
                var searchbarDistace = bui.history.getComponent("searchbar");

                var val = searchbarDistace.searchbar.value();
                // 没搜索词不做处理
                if (!val) {
                    return;
                }

                searchbarDistace.searchbar.search(val);

            })
        }
    };

    // 执行初始化
    pageview.init();

    return pageview;
})