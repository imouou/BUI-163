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
    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);

            // params.result = "T1348647853363";
            // 163新闻的url规则比较特殊,需要通过替换原本的url请求的方式, 正常不需要这样处理分页.
            // http://c.m.163.com/nc/article/headline/${params.result}/0-10.html
            // http://c.m.163.com/nc/article/headline/${params.result}/10-10.html
            // http://c.m.163.com/nc/article/headline/${params.result}/20-10.html

            // 初始化
            this.list = this.listInit(params);

        },
        listInit: function(opt) {
            var size = 10;
            var page = 0;
            var url = "";
            var result = "";
            // 文章url
            var articleurl = `http://c.m.163.com/nc/article/headline/${opt.result}/(page)-${size}.html`;
            // 视频url
            var videourl = `https://c.m.163.com/nc/subscribe/list/${opt.result}/video/(page)-${size}.html?w=202002201637`;
            // 直播url
            var liveurl = `https://c.m.163.com/nc/subscribe/list/${opt.result}/live/(page)-${size}.html`;

            switch (opt.type) {
                case "video":
                    url = videourl;
                    result = "tab_list";
                    break;
                case "live":
                    url = liveurl;
                    result = "tab_list";

                    break;
                default:
                    url = articleurl;
                    result = opt.result;
                    break;
            }
            // 列表控件 js 初始化: 
            var uiList = bui.list({
                id: `#${module.id} .bui-scroll`,
                url: url.replace("(page)", page),
                page: 0,
                pageSize: size,
                data: opt,
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "pageSize",
                    data: result
                },
                callback: function(e) {},
                template: this.templateNews,
                onBeforeRefresh: function(data, result) {
                    // 修改方法只修改, 并不执行, 所以需要在刷新前修改
                    page = 0;
                    uiList.modify({
                        url: url.replace("(page)", page)
                    });
                },
                onRefresh: function(data, res) {
                    // 刷新后重置新的分页
                    size = 10;
                    page = size;

                    uiList.modify({
                        url: url.replace("(page)", size)
                    });

                },
                onLoad: function(data, res) {

                    // 把返回的数据大小赋予新的分页
                    size = page + 10;
                    page = size;

                    this.modify({
                        url: url.replace("(page)", size)
                    })

                }
            });
        }
    };

    pageview.getUrl = function(el) {
        return `pages/article/article.html?id=${el.postid}`
    }

    pageview.templateList = function(data) {

        var html = "";
        data.forEach(function(el, index) {
            // 详情地址, 没有接口. https://c.m.163.com/news/a/FFDU0PLO0001899O.html?from=subscribe
            html += `<li class="bui-btn bui-box-align-top" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                <div class="bui-thumbnail"><img src="${el.videoinfo.cover}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${el.title}</h3>
                    <p class="item-text">${el.source} ${el.replyCount}跟帖</p>
                </div>
            </li>`
        });

        return html;
    }

    pageview.templateVideoList = function(el) {

        var html = "";
        // html += `<li class="bui-btn bui-box-align-top" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
        html += `<li class="bui-btn video-item" href="pages/article/article.html?id=${el.postid}&imgsrc=${el.imgsrc}&source=${el.source}&tname=${el.tname}" param='${JSON.stringify(el.videoinfo)}'>
                <div class="photo-title">
                    <h3 class="item-title">${el.title}</h3>
                    <img src="${el.imgsrc}" alt=""><div class="icons-play"></div>
                </div>
                <div class="bui-box-align-middle">
                        <div class="span1"><div class="bui-tag ring">${el.videosource || el.source} </div></div>
                        <div>
                            <ul class="bui-nav-icon bui-box">
                                <li><i class="icon-time"></i>${bui.date.fromnow(el.ptime)}</li>
                                <li><i class="icon-eye"></i>${bui.unit.numberunit(el.daynum)}</li>
                                <li><i class="icon-reply">&#xe633;</i>${el.replyCount}</li>
                            </ul>
                        </div>
                </div>
            </li>`

        return html;
    }

    // 专题
    pageview.templateTopic = function(el) {
        html = `<li class="bui-btn bui-box-vertical" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                    <h3 class="photo-title">${el.TAG || el.title}</h3>
                    <div class="span1">
                        <div class="bui-fluid-space-3 container-y container-full">`
        el.specialextra && el.specialextra.forEach(function(item, i) {
            if (i < 3) {
                // 显示3个专题图片
                html += `<div class="span1">
                            <div class="photo-item">
                                <img src="${item.imgsrc}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" />
                            </div>
                        </div>`
            }

        })
        html += `       </div>
                    </div>
                </li>`;
        return html;
    }

    // 多图展示
    pageview.templateMorePhoto = function(el) {
        var html = "";
        html += `<li class="bui-btn bui-box-vertical"  href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                            <h3 class="photo-title">${el.ltitle || el.title}</h3>
                            `;
        html += `<div class="span1">
                            <div class="bui-box-space ${el.imgextra ? "container-full" : ""}">
                                <div class="span1">
                                    <div class="photo-item">
                                        <img src="${el.picinfo.firstImage}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" alt="${el.ltitle||el.title}">
                                    </div>
                                </div>`
        el.imgextra && el.imgextra.forEach(function(item, i) {

            if (i < 2) {
                html += `<div class="span1">
                                    <div class="photo-item">
                                        <img src="${item.imgsrc}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" />
                                    </div>
                                </div>`
            }
        })
        html += `</div></div></li>`;
        return html;
    }
    pageview.templateSkipType = function(el) {
        var html = "";
        html += `<li class="bui-btn bui-box-vertical" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                        <h3 class="photo-title">${el.title}</h3>
                        <div class="span1">
                            <div class="bui-box-space">`;
        html += `       <div class="span1">
                                    <div class="photo-item">
                                        <img src="${el.imgsrc}" alt="${el.ltitle||el.title}">
                                    </div>
                                </div>`
        html += `</div></div></li>`;
        return html;
    }
    pageview.templateThunmbail = function(el) {
        var html = "";
        html += `<li class="bui-btn bui-box-align-top" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                    <div class="span1">
                        <h3 class="item-title">${el.title}</h3>
                        <p class="item-text">${bui.date.fromnow(el.ptime)} ${el.source} ${el.replyCount}跟帖</p>
                    </div>
                    <div class="bui-thumbnail"><img src="${el.imgsrc}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" alt=""></div>
                </li>`;
        return html;
    }

    pageview.templateHot = function(el, index) {
        var html = "";
        index = index + 1;
        index = index < 10 ? "0" + index : index;

        html += `<li class="bui-btn hot-item" href="pages/article/article.html?id=${el.postid}" param='${JSON.stringify(el)}'>
                    <div class="hot-tag"><span class="hot-tag-num">${index}</span><span class="hot-tag-text">${bui.unit.numberunit(el.votecount)||0}热度</span></div>
                    <div class="bui-box-align-top">
                        <div class="span1">
                            <h3 class="item-title bui-box-text-clip">${el.title}</h3>
                            <p class="item-text">${el.source} <span class="bui-tag ring">${bui.unit.numberunit(el.replyCount)||0}跟帖</span></p>
                        </div>
                        <div class="bui-thumbnail"><img src="${el.imgsrc}?imageView&thumbnail=234y146&quality=45&interlace=1&enlarge=1&type=webp" alt=""></div>
                    </div>
                </li>`;
        return html;
    }
    pageview.templateNews = function(data) {
        var html = "";
        var pagesize = this.config.page * this.config.pageSize;
        data.forEach(function(el, index) {
            if (params.type == "hot") {
                index =
                    // 实时热榜
                    html += pageview.templateHot(el, index);
            } else if (el.videoinfo) {
                html += pageview.templateVideoList(el, index);
            } else if (el.specialextra && el.specialextra.length) {
                // 专题模板
                html += pageview.templateTopic(el, index);
            } else if (el.picinfo) {
                // 多图模板
                html += pageview.templateMorePhoto(el, index);
            } else if (el.skipType) {
                // 大图在下面
                html += pageview.templateSkipType(el, index);
            } else {
                // 缩略图在右边
                html += pageview.templateThunmbail(el, index);
            }

        });

        return html;
    }

    // 第1次初始化
    pageview.init();

    // 抛出模块
    return pageview;
})