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

    // 初始化数据行为存储
    var bs = bui.store({
        el: ".page-setting",
        scope: "setting",
        data: {
            deepskin: false,
        },
        methods: {
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
        },
        watch: {
            deepskin: function(val) {
                if (val) {
                    // 添加深夜模式  第2个参数为指定一个id,便于切换找到指定dom
                    loader.importCss("css/bui-skindeep.css", "deepskin");
                } else {
                    // 移除深夜模式
                    $("#deepskin").remove();
                }
            }
        },
        computed: {},
        templates: {},
        beforeMount: function() {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function() {
            // 数据解析后执行
            this.checkLogin();
        }
    })

    // 抛出模块
    return bs;
})