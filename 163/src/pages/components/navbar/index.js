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

            // 分类示例数据
            bui.ajax({
                url: `${module.path}index.json`,
                // 可选参数
                method: "GET"
            }).then(function(result) {

                pageview.navData = result.data;

                pageview.render(result.data);

                pageview.bind();

            }, function(result, status) {
                console.log(result)
                    // 失败 console.log(status)
            });

        },
        render: function(data) {
            // 渲染
            var html = pageview.template(data);

            bui.$(`#${module.id} ul`).html(html);
        },
        template: function(data) {
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
        bind: function() {
            router.$("#showMoreMenu").click(function() {
                if (pagenav) {
                    pagenav.open();
                    return;
                }
                pagenav = bui.page({
                    url: "pages/components/navlist/index.html",
                    style: {
                        top: ".9rem"
                    },
                    close: true
                })
            })
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})