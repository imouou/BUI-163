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
            params = bui.history.getParams(module.id);
            console.log(params)
            this.renderNav(params)
        },
        templateIcon: function(data) {
            var html = "";
            html += `<div class="bui-btn">
                        <i class="icon-comment"><span class="bui-badges">${pageview.getUnit(data.replyCount)}</span></i>
                    </div>
                    <div class="bui-btn"><i class="icon-share"></i></div>`;
            return html;
        },
        getUnit: function(data) {
            var num = data;
            if (data > 10000) {
                num = parseFloat(data / 10000).toFixed(1) + "万"
            } else if (data > 1000) {
                num = parseFloat(data / 1000).toFixed(1) + "千"
            } else {
                num = data;
            }
            return num;
        },
        renderNav: function(data) {
            var html = this.templateIcon(data);
            bui.$(".bui-nav-icon").html(html);
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})