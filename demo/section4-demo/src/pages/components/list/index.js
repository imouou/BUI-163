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
            // 这里初始化
            params = bui.history.getParams(module.id);
            console.log(params)

            // 列表控件 js 初始化: 
            var uiList = bui.list({
                // id改成通过父级id初始化
                id: `#${module.id} .bui-scroll`,
                url: `${module.path}index.json`,
                pageSize: 5,
                data: {
                    type: params.type
                },
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "pageSize",
                    data: "data"
                },
                callback: function(e) {},
                template: this.template
            });

        },
        template: function(data) {
            var html = "";
            switch (params.type) {
                case "article":
                    html = pageview.templateList(data);
                    break;
                case "video":
                    html = pageview.templateVideo(data);
                    break;
                default:
                    html = pageview.templateList(data);
                    break;
            }
            return html;
        },
        templateMorePhoto: function(el) {
            // 多图展示
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
        },
        templateSkipType: function(el) {
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
        },
        templateList: function(data) {

            var html = "";
            data.forEach(function(el, index) {

                html += `<li class="bui-btn bui-box">
                    <div class="span1">
                        <h3 class="item-title bui-box-text-hide">${el.title}</h3>
                        <p class="item-text bui-box-text-hide">${el.digest}</p>
                    </div>
                    <div class="bui-thumbnail"><img src="${el.imgsrc}" alt=""></div>
                </li>`
            });

            return html;
        }
    };

    // 第1次初始化
    pageview.init();

    // 抛出模块
    return pageview;
})