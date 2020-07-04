/**
 * 通用登录模板,包含输入交互,提交需要自己绑定验证
 * 默认模块名: pages/login/login
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {
        init: function() {

            // 绑定事件
            this.bind();
        },
        bind: function() {

            // 手机号,帐号是同个样式名, 获取值的时候,取的是最后一个focus的值
            var userInput = bui.input({
                    id: ".user-input",
                    callback: function(e) {
                        // 清空数据
                        this.empty();
                    }
                })
                // 密码显示或者隐藏
            var password = bui.input({
                id: ".password-input",
                iconClass: ".icon-eye",
                onBlur: function(e) {
                    if (e.target.value == '') { return false; }
                    // 注册的时候校验只能4-18位密码
                    var rule = /^[a-zA-Z0-9_-]{4,18}$/;
                    if (!rule.test(e.target.value)) {
                        bui.hint("密码只能由4-18位字母或者数字上下横杠组成");
                        return false;
                    }

                    return true;
                },
                callback: function(e) {
                    //切换类型
                    this.toggleType();
                    //
                    $(e.target).toggleClass("active")
                }
            })

            router.$("#btnCheckLogin").click(function() {
                var user = userInput.value();
                var pass = password.value();
                // 随机积分
                var randomGrade = parseInt(Math.random() * 1000);
                var param = {
                    user: "王小o",
                    name: user,
                    grade: randomGrade,
                    image: "images/logo2.png"
                };
                // 如果登录成功, 重新编译新的展示组件,并且关闭对话框
                loader.load({
                    id: "#userinfo",
                    url: "pages/components/userinfo/index.html",
                    param: param
                })

                bui.hint("登录成功");

                // module.id 为模块内部的id
                var dialog = bui.history.getPageDialog(module.id);
                dialog.close();
                // 存储本地信息, 
                appstorage.set("userinfo", param);
            })
        }
    };

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})