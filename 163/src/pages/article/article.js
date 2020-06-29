loader.define(function(require, exports, module) {

    var params = bui.history.getParams("url");
    var pageview = {
        init: function() {
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
            console.log(params)

            // 渲染正文
            pageview.render(params);
            // 获取关联文章
            pageview.getRelative(params);

            loader.delay({
                id: "#commentbar",
                param: params
            })

        },
        getRelative: function(params) {

            // 关联文章
            bui.ajax({
                url: `https://c.m.163.com/news/relativeArticle/${params.id}`,
                data: {}, //接口请求的参数
                // 可选参数
                method: "GET"
            }).then(function(result) {
                // 成功
                var html = pageview.templateRelated(result);
                bui.$("#relatedlist").html(html);
            }, function(result, status) {
                // 失败 console.log(status)
            });
        },
        render: function(data) {
            var html = this.templateArticle(data);
            bui.$(".bui-article").html(html)
        },
        templateArticle: function(data) {
            var html = "";
            html += `<h1>${data.title}</h1>
                        <div class="article-info bui-box">
                        <span class="article-from">${data.source||""}</span>
                        <div class="span1"> <i class="icon-time"> ${bui.date.fromnow(data.ptime)}</i></div>
                    </div>
                    <section>
                        <p><img src="${data.imgsrc}"/> </p>

                        <p>${data.digest||""} </p>
                    </section>
                    <div class="article-info bui-box">
                        <span class="article-from">${data.tname||""}</span>
                        <div class="span1"></div>
                        <i class="icon-comment"> ${data.replyCount||0}</i>
                        <i class="icon-eye"> ${data.daynum||0}</i>
                    </div>`;


            return html;
        },
        templateVideo: function(data) {
            var html = `<p><video cover="${data.cover}" height="360px">
                            <source src="${data.mp4_url}"></source>
                        </video></p>`

            return html;
        },
        templateRelated: function(data) {
            var html = "";
            data.forEach(function(el, index) {

                html += `<li class="bui-btn bui-box" href="pages/article/article.html?id=${el.docId}" param='${JSON.stringify(el)}'>
                    <div class="bui-thumbnail"><img src="${el.imgsrc}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" alt=""></div>
                    <div class="span1">
                        <h3 class="item-title bui-box-text-hide">${el.title}</h3>
                        <p class="item-text">${bui.date.fromnow(el.ptime)}</p>
                    </div>
                </li>`;
            })

            return html;
        }
    };

    pageview.init();

    return pageview;
})