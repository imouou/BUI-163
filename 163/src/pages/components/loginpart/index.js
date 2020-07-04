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
    var loginPage = null;
    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);

            this.bind();
            // 注销掉信息
            this.loginout();
        },
        bind: function() {

            router.$("#btnLogin").click(function() {
                if (loginPage) {
                    loginPage.open();

                } else {
                    loginPage = bui.page({
                        url: "pages/login/index.html",
                        mask: true,
                        effect: "fadeInUp",
                        autoload: true,
                        close: true,
                        style: {
                            top: "40%"
                        }
                    })
                }
            })
        },
        loginout: function() {

            // 存储本地信息, 
            appstorage.remove("userinfo");
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})