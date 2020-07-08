/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};

    // 模块初始化定义
    pageview.init = function() {

        var uiAccordion = bui.accordion({
            id: "#uiAccordion"
        });

        var uiDropdown = bui.dropdown({
            id: "#uiDropdown",
            data: [{
                name: "广州",
                value: "广州"
            }],
            //设置relative为false,二级菜单继承父层宽度
            relative: false,
            callback: function(e) {}
        });
    }

    // 初始化
    pageview.init();

    // 输出模块
    return pageview;
})