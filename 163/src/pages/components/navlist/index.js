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
    var params = bui.history.getParams(module.id);

    // 获取导航组件实例
    var tab = bui.history.getComponent(params.id);
    var hasChange = false;
    // 初始化数据行为存储
    var bs = bui.store({
        el: ".page-navlist",
        scope: "navlist",
        data: {
            selected: [],
            unselect: [],
        },
        watch: {
            selected: function(data) {
                // 重新渲染, 每次操作都重新渲染比较消耗性能. 所以这里使用的是关闭菜单才重新渲染
                // tab.render(data);
                // 数据改变的状态, 关闭的时候要重新渲染
                hasChange = true;
            }
        },
        methods: {
            go: function(id, name) {
                bui.load({ url: "pages/article/index.html", param: { result: id, name: name } });
            },
            remove: function(id) {
                // 获取对应的值
                var item = this.$data.selected.$get(id, "id");
                // 删除
                this.selected.$delete(id, "id");
                // 新增
                this.unselect.push(item);

                event.stopPropagation();
            },
            add: function(id) {
                // 获取对应的值
                var item = this.$data.unselect.$get(id, "id");
                // 删除
                this.unselect.$delete(id, "id");
                // 新增
                this.selected.push(item);
            },
        },
        templates: {
            tplMine: function(data) {

                var html = "";
                data.forEach(function(item, index) {
                    html += `<div class="span1">
                            <div class="bui-tag" b-click="navlist.go(${item.id},${item.name})">${item.name} <i class="icon-removefill" b-click="navlist.remove(${item.id})"></i></div>
                        </div>`
                })
                return html;
            },
            tplMore: function(data) {
                var html = "";
                data.forEach(function(item, index) {
                    html += `<div class="span1">
                            <div class="bui-tag" b-click="navlist.add(${item.id})">${item.name}</div>
                        </div>`
                })
                return html;
            }
        },
        beforeMount: function() {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function() {
            // 数据解析后执行
            this.selected.$replace(tab.navData);

            // 获取弹窗的实例
            var dialog = bui.history.getPageDialog(module.id);

            // 关闭的时候触发
            dialog.on("close", function() {

                hasChange && tab.render(bs.selected);
                hasChange = false;
            })


        }
    })

    // 抛出模块
    return bs;
})