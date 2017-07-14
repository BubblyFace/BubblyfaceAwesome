<template>
    <div>
        <div class="common-article">
            <article-header>
            </article-header>
            <main id="content" class="content" name="content">
                <div class="common-article-title ">
                    <h1>{{article.title}}</h1>
                </div>
                <div class="common-article-container" v-html="content">
                </div>
                <div class="common-article-footer">
                    <time class="common-date">{{article.createdTime}}</time>
                </div>
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
        return {
            activeIndex: '1',
            activeIndex2: '1',
            showIntroduce: false,
            showContent: false,
            article: {
                _id: null,
                title: null,
                id: null,
                author: null,
                extract: null,
                content: null,
                __v: 0,
                meta: {
                    updateAt: null,
                    createAt: null
                }
            },
            articleId: null,
            content: null
        }
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
                console.log(this.$route.params.articleId);
                this.params = this.$route.params;
                this.articleId = this.params.articleId;
                this.getArticleDetail(this.articleId);
            },
            getArticleDetail(id) {
                this.$http({
                    method: "GET",
                    url: "/getData/getArticleDetail",
                    params: {
                        id: id
                    },
                }).then(response => {
                    this.article = response.data.article;
                    this.content = response.data.content;
                })
            },
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        }
    }
</script>