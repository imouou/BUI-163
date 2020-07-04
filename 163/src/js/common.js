// 这个文件用来存储一些公共的配置及方法
// 定义常用的方法或变量, 通过这个定义以后, npm run build 打包才不会把变量变成局部.
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
        test2: function() {
            console.log("输出test2")
        }
    }
})