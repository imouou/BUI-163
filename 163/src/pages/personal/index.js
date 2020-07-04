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
        loginStatus: false,
        init: function() {

            this.checkLogin();

            // 这里初始化
            this.bind();
        },
        bind: function() {

        },
        checkLogin: function() {
            var userinfo = appstorage.get("userinfo", 0);

            // 有登录时
            if (userinfo) {
                loader.load({
                    id: "#userinfo",
                    url: "pages/components/userinfo/index.html",
                    param: userinfo
                })
            } else {
                loader.load({
                    id: "#userinfo",
                    url: "pages/components/loginpart/index.html"
                })
            }
        }
    };

    // 第1次初始化
    pageview.init();

    // 抛出模块
    return pageview;
})