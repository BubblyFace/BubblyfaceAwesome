<template>
    <div>
        <div class="common-article">
            <article-header>
            </article-header>
            <main>
                <input id="input-image" type="file" name="image" class="file" data-preview-file-type="text" multiple>
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
            showInput() {
                // with plugin options 
                $("#input-image").fileinput({
                    uploadUrl: "/postData/imgUpload",
                    allowedFileExtensions: ["jpg", "png", "gif"],
                    language: "zh",
                    showUploadedThumbs: false,
                    browseOnZoneClick: true,
                    maxFileSize: 10000,
                    maxFileCount:12,
                    uploadAsync: false,
                    uploadExtraData: {
                        id: `test`,
                    }
                }).on;
    
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        }
    }
</script>