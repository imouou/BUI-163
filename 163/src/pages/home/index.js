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
    var pageview = {
        init: function() {
            // 这里初始化
            // 选项卡 js 初始化:
            var uiTab = bui.tab({
                id: "#uiTab"
            });

            // 列表控件 js 初始化: 
            var uiList = bui.list({
                id: "#uiList",
                url: "http://rap2api.taobao.org/app/mock/84605/example/getNews",
                pageSize: 5,
                data: {},
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "pageSize",
                    data: "data"
                },
                callback: function(e) {},
                template: function(data) {
                    var html = "";
                    data.forEach(function(el, index) {

                        html += `<li class="bui-btn bui-box">
                            <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                            <div class="span1">
                                <h3 class="item-title">${el.name}</h3>
                                <p class="item-text">${el.address}</p>
                                <p class="item-text">${el.distance}公里</p>
                            </div>
                            <span class="price"><i>￥</i>${el.price}</span>
                        </li>`
                    });

                    return html;
                }
            });
        }
    };

    // 第1次初始化
    pageview.init();

    // 抛出模块
    return pageview;
})