<template>
    <div>
        <div class="common-article">
            <article-header>
                <div slot="munuItems">
                    <el-menu theme="dark">
                        <el-menu-item index="3">啦啦哦啊啊哈哈哈哈哈</el-menu-item>
                        <el-menu-item index="4">作者本人后台页</el-menu-item>
                    </el-menu>
                </div>
            </article-header>
            <main>
                <photo-upload v-bind:ablum-id='ablumId' v-bind:ablumId="ablumId">
                </photo-upload>
            </main>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<style scoped>
    
</style>

<script>
    import articleHeader from "../../components/articleHeader.vue";
    import photoUpload from "../../components/photoUpload.vue";

    function defaultData() {
        return {
            ablumId :''
        }
    }
    export default {
        data() {
            return defaultData()
    
        },
        components: {
            "article-header": articleHeader,
            "photo-upload": photoUpload
        },
        methods: {
            init() {
                //接受ablumItem选择显示页面
                var params = this.$route.params;
                this.ablumId = params.id;
                console.log(this.ablumId)
                //this.getAblumData(ablumId);
            },
            getAblumData(){
                               
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        },
        beforeRouteUpdate(to, from, next) {
            next(vm => {
                vm.init()
            })
        },
    }
</script>