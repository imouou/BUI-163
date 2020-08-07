// 这个文件用来存储一些公共的配置及方法
// 1.6.2 新增global方法, 定义常用的方法或变量, 通过这个定义以后, npm run build 打包才不会把变量变成局部.
/* 
1. 局部调用
loader.define(function(require,exports,module,global){
    // 可以调用到方法
    global.test() 
})

2. 全局调用
bui.ready(function(){
    loader.globals.test();
}) 

*/
loader.global(function() {


    return {
        test: function() {
            console.log("输出test")
        },
        setStatubarColor: function(id) {

            // 设置全屏的状态栏颜色
            var headerColor = router.$(`#${id} .bui-bar`).css("background-color");
            try {
                plus.navigator.setStatusBarBackground(headerColor || "#e2262a");
            } catch (e) {}
        }
    }
})