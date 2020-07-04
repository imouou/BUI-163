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
    var uiPage = null;
    var pageview = {
        init: function() {
            params = bui.history.getParams(module.id);
            console.log(params)
            this.renderNav(params);

            this.bind(params);

        },
        bind: function(opt) {
            // 绑定发布
            router.$(".btn-comment").click(function() {
                if (uiPage) {
                    uiPage.open();
                    return;
                }
                uiPage = bui.page({
                    url: "pages/components/comment/index.html",
                    close: true,
                    effect: "fadeInUp",
                    mask: true,
                    style: {
                        top: "50%"
                    },
                    param: params
                })
            })

            // 绑定发布
            router.$(".btn-commentlist").click(function() {

                bui.load({
                    url: "pages/article/comment/index.html",
                    param: params
                })
            })


            // 绑定分享
            var uiActionsheet = bui.actionsheet({
                trigger: ".btn-share",
                buttons: [{ name: "分享到微博", value: "weibo" }, { name: "朋友圈", value: "pyq" }],
                callback: function(e) {
                    var val = $(e.target).attr("value");
                    if (val == "cancel") {
                        this.hide();
                    }
                }
            })



        },
        templateIcon: function(data) {
            var html = "";
            html += `<div class="bui-btn btn-commentlist">
                        <i class="icon-comment"><span class="bui-badges">${bui.unit.numberunit(data.replyCount)}</span></i>
                    </div>
                    <div class="bui-btn btn-share"><i class="icon-share"></i></div>`;
            return html;
        },

        renderNav: function(data) {
            var html = this.templateIcon(data);
            bui.$(".bui-nav-icon").html(html);
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})