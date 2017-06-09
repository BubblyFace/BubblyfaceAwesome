<template>
    <div>
        <div class="common-article">
            <article-header>
                <div slot="munuItems">
                    <el-menu theme="dark">
                        <el-menu-item index="1">作者介绍</el-menu-item>
                        <el-menu-item index="2">作者吐槽</el-menu-item>
                        <el-menu-item index="3">作者瞎想</el-menu-item>
                        <el-menu-item index="4" @click="articleAdd">作者本人后台页</el-menu-item>
                    </el-menu>
                </div>
            </article-header>
            <main>
                <input id="input-image" type="file" name="image" class="file" data-preview-file-type="text" multiple>
                </input>
                <input id="article-image" type="file" name="article" class="file" data-preview-file-type="text">
                </input>
            </main>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<style scoped>
    
</style>

<script>
    import articleHeader from "../../components/articleHeader.vue";
    
    function defaultData() {
        return {}
    }
    export default {
        data() {
            return defaultData({})
        },
        components: {
            "article-header": articleHeader
        },
        methods: {
            init() {
                this.showInput();
    
            },
            articleAdd(){
                
            },
            showInput() {
                // with plugin options 
                $("#input-image").fileinput({
                    uploadUrl: "/postData/imgUpload",
                    allowedFileExtensions: ["jpg", "png", "gif"],
                    language: "zh",
                    showUploadedThumbs: false,
                    browseOnZoneClick: true,
                    maxFileSize: 10000,
                    maxFileCount: 12,
                    uploadAsync: false,
                    uploadExtraData: {
                        id: `test`,
                    }
                });
                $("#article-image").fileinput({
                    uploadUrl: "/postData/articleUpload",
                    allowedFileExtensions: ["md"],
                    language: "zh",
                    showUploadedThumbs: false,
                    browseOnZoneClick: true,
                    maxFileSize: 10000,
                    maxFileCount: 12,
                    uploadAsync: false,
                    uploadExtraData: {
                        author: 'shw',
                        title: 'test',
                        extract: '这是一段测试数据'
                    }
                });
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        }
    }
</script>