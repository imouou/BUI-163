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

        },
        templateIcon: function(data) {
            var html = "";
            html += `<li class="bui-btn">
                    <div class="bui-icon">
                        <img src="images/icons/icon-group1.png" alt="">
                    </div>
                    <div class="item-title">关注肺炎疫情</div>
                    <div class="item-text">10万人关注</div>
                </li>`;
            return html;
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})