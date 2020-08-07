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
loader.define(function(require, exports, module, global) {
    // 定义
    var pageview = {
        init: function() {
            // 逻辑全在 pages/components/tab/index.js

            // this.bind();
        },
        bind: function() {

        }
    };

    // 第1次初始化
    pageview.init();

    // 抛出模块
    return pageview;
})