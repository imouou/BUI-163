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

    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);

            // 初始化数据行为存储
            var bs = bui.store({
                el: `#${module.id}`,
                scope: "categoryhot",
                data: {
                    title: "",
                    result: [{
                            "id": "T1348647909107",
                            "name": "头条"
                        },
                        {
                            "id": "T1348649079062",
                            "name": "体育"
                        },
                        {
                            "id": "T1348649145984",
                            "name": "NBA"
                        }
                    ]
                },
                templates: {
                    tplList: function(data) {
                        var html = "";
                        data.forEach(function(item, index) {
                            html += `<div class="span1">
                                    <div class="bui-btn ring" href="pages/article/index.html?result=${item.id}&name=${item.name}">${item.name}</div>
                                </div>`
                        })

                        return html;
                    }
                },
                mounted: function() {
                    // 数据解析后执行
                    this.title = params.title;
                }
            })

        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})