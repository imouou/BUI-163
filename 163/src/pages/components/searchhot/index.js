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
                scope: "hotlist",
                data: {
                    result: [{
                        id: "a1",
                        title: "导演乔舒马赫去世",
                        count: 24624,
                        isup: true
                    }, {
                        id: "a2",
                        title: "21世纪最晚端午节",
                        count: 23952,
                        isup: true
                    }, {
                        id: "a3",
                        title: "莫向晚被砸蛋糕",
                        count: 23945,
                        isup: true
                    }, {
                        id: "a4",
                        title: "雨桐道歉",
                        count: 23087,
                        isup: false
                    }, {
                        id: "a5",
                        title: "KTV消费不超2小时",
                        count: 21844,
                        isup: true
                    }],
                },
                templates: {
                    tplList: function(data) {
                        var html = "";
                        data.forEach(function(item, index) {
                            var hasIcon = item.isup ? `<i class="icon-up">&#xe647;</i>` : `<i class="icon-down">&#xe64b;</i>`;
                            html += `<li class="bui-btn bui-box">
                                    <div class="icon">${index+1}</div>
                                    <div class="span1">${item.title}</div>
                                    <div class="count">${item.count}</div>
                                    ${hasIcon}
                                </li>`
                        })

                        return html;
                    }
                },
                mounted: function() {
                    // 数据解析后执行
                }
            })

        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})