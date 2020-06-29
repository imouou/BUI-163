/**
 * 朋友圈
 * 默认模块名: pages/blog/blog
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    // 接收url传参
    var pageParams = router.getPageParams();

    var pageview = {
        init: function(opt) {


        }
    };

    pageview.init();
    // 输出模块
    return pageview;
})