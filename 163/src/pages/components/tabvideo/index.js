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
    var uiTab = null;
    var pageview = {
        init: function() {
            // 接收组件参数
            params = bui.history.getParams(module.id);

            // 分类示例数据
            bui.ajax({
                url: `${module.path}index.json`,
                // 可选参数
                method: "GET"
            }).then(function(result) {

                pageview.navData = result.data;

                // 渲染
                pageview.render(result.data);

                // 绑定导航的点击事件
                pageview.bind();

                uiTab = bui.tab({
                    id: `#${module.id} .bui-tab`,
                    menu: `#${module.id} .bui-nav`,
                });

                uiTab.on("to", function() {
                    var index = this.index();
                    loader.delay({
                        id: `#videotab${index}`
                    })
                }).to(0);

            }, function(result, status) {
                console.log(result)
                    // 失败 console.log(status)
            });

        },
        render: function(data) {
            // 渲染
            var navhtml = pageview.templateNav(data);
            var mainhtml = pageview.templateMain(data);

            bui.$(`#${module.id} .bui-nav`).html(navhtml);
            bui.$(`#${module.id} .bui-tab-main > ul`).html(mainhtml);

            // 重新初始化
            uiTab && uiTab.resize().to(0);
        },
        templateNav: function(data) {
            var html = ""
            if (data && bui.typeof(data) !== "array") {
                return html;
            }
            data.forEach(function(item, index) {
                var hasActive = index === 0 ? " active" : "";
                html += `<li class="bui-btn${hasActive}" data-id="${item.id}">${item.name}</li>`
            })
            return html;
        },
        templateMain: function(data) {
            var html = ""
            if (data && bui.typeof(data) !== "array") {
                return html;
            }
            data.forEach(function(item, index) {
                html += `<li style="display:none;">
                            <component id="videotab${index}" name="pages/components/list/index" class="fullheight" type="video" delay="true" result="${item.id}"></component>
                        </li>`
            })

            return html;
        },
        bind: function() {

        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})