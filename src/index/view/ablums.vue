<template>
    <div>
        <div class="common-article">
            <article-header>
                <div slot="munuItems">
                    <el-menu theme="dark">
                        <el-menu-item index="1" @click="goAblumIndex">相册集</el-menu-item>
                        <el-menu-item index="2" @click="goAblumCreate">创建相册</el-menu-item>
                        <el-menu-item index="3">啦啦哦啊啊哈哈哈哈哈</el-menu-item>
                        <el-menu-item index="4">作者本人后台页</el-menu-item>
                    </el-menu>
                </div>
            </article-header>
            <main>
                <ablum-create v-if="show.ablumCreate">
                </ablum-create>
            </main>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<style scoped>
    
</style>

<script>
    import articleHeader from "../../components/articleHeader.vue";
    import ablumCreate from "../../components/ablumCreate.vue";
    
    function defaultData() {
        return {
            show: {
                ablumCreate: false,
                ablumIndex: false,
            }
        }
    }
    export default {
        data() {
            return defaultData()
    
        },
        components: {
            "article-header": articleHeader,
            "ablum-create": ablumCreate
        },
        methods: {
            init() {
                //接受ablumItem选择显示页面
                console.log(this.$route.params)
                var params = this.$route.params;
                this.show[params.ablumItem] = true;

            },
            goAblumCreate() {
                this.$router.push({
                    name: 'ablums',
                    params: {
                        ablumItem: "ablumCreate"
                    }
                })
            },
            goAblumIndex() {
                this.$router.push({
                    name: 'ablums',
                    params: {
                        ablumItem: "ablumIndex"
                    }
                })
            },
            goAblumDetail(){

            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        },
        beforeRouteUpdate(to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            next(vm => {
                vm.init()
            })
        },
    }
</script>