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
    var pagenav = null;
    // 最多存储5条历史, 新的会覆盖
    var wordstorage = bui.storage({
        size: 5,
        reverse: false // 最新的数据在第1个, 保持跟这里数组的操作方式一致.
    })
    var bs = null;
    var pageview = {
        init: function() {
            // 这里初始化
            params = bui.history.getParams(module.id);

            // 关闭搜索结果框
            var resultDialog = bui.history.getPageDialog("searchresult")


            // 初始化数据行为存储
            bs = bui.store({
                el: `#${module.id}`,
                scope: module.id, //searchhistory
                data: {
                    title: "",
                    result: []
                },
                methods: {
                    clear: function() {
                        this.result.$empty();
                        wordstorage.clear();
                    },
                    open: function(val) {
                        // 获取对话框
                        var resultDialog = bui.history.getPageDialog("searchresult");
                        // 打开对话框
                        resultDialog && resultDialog.open();
                        // 获取父级(最后页面)抛出的实例方法
                        var resultDistance = bui.history.getParentComponent();

                        // 调用page的reload方法
                        resultDistance && resultDistance.listpage.reload({
                            param: {
                                keyword: val
                            }
                        });

                        // 获取搜索条
                        var searchbarDistance = bui.history.getComponent("searchbar");

                        // 设置关键字
                        searchbarDistance && searchbarDistance.searchbar.value(val);

                    }
                },
                templates: {
                    tplList: function(data) {
                        var html = "";
                        data.forEach(function(item, index) {
                            html += `<div class="span1">
                                    <div class="bui-btn ring" b-click="${module.id}.open(${item})">${item}</div>
                                </div>`
                        })

                        return html;
                    }
                },
                mounted: function() {
                    // 数据解析后执行
                    this.title = params.title;
                    // 如果为空数组,加一个示例数据, 默认拿id作为存储的键名,因此id应该是固定的,如果随机生成则会又多个
                    this.result.$replace(wordstorage.get(module.id) || ["长征五B首飞成功"]);
                }
            })

        },
        add: function(val) {
            // 新增历史
            val && bs.result.unshift(val);
            val && wordstorage.set(module.id, val);

            if (bs.$data.result.length > 5) {

                bs.result.$deleteIndex(bs.$data.result.length - 1)
            }
        }
    };

    pageview.init();

    // 抛出模块
    return pageview;
})