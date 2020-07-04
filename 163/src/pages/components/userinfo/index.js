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

            console.log(params)

            // 初始化数据行为存储
            var bs = bui.store({
                el: `#${module.id}`,
                scope: "userinfo",
                data: {
                    info: {
                        name: "",
                        grade: 0,
                        image: "",
                        user: ""
                    },
                },
                methods: {
                    toggle: function() {
                        var that = this;
                        bui.confirm("您确定要切换帐号吗?", function(e) {

                            var text = $(e.target).text();
                            if (text == "确定") {
                                //打开登录对话框
                                that.openLogin()
                            }
                            this.close();
                        });
                    },
                    logout: function() {
                        var that = this;

                        bui.confirm("您确定要注销吗?", function(e) {

                            var text = $(e.target).text();
                            if (text == "确定") {
                                //打开登录对话框

                                loader.load({
                                    id: "#userinfo",
                                    url: "pages/components/loginpart/index.html"
                                })
                            }
                            this.close();
                        });
                    },
                    openLogin: function() {
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
                    }
                },
                watch: {},
                computed: {},
                templates: {},
                beforeMount: function() {
                    // 数据解析前执行, 修改data的数据示例
                    // this.$data.a = 2
                },
                mounted: function() {
                    // 数据解析后执行
                    this.info = params;
                }
            })

        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})