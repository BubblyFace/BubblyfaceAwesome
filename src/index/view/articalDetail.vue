<template>
    <div>
        <div class="common-article">
            <article-header>
            </article-header>
            <main id="content" class="content" name="content">
                <div class="common-article-title ">
                    {{article.title}}
                </div>
                <div class="common-article-container" v-html="content">
                </div>
                <div class="common-article-footer">
                    <time class="common-date">{{article.createdTime}}</time>
                </div>
                <footer>
    
                </footer>
            </main>
        </div>
    </div>
</template>

<style scoped>
    
</style>

<script>
    import articleHeader from "../../components/articleHeader.vue";
    // import test from "../../public/md/test.md"
    // var md = window.markdownit();
    // var result = md.render('# markdown-it rulezz!');
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
            return defaultData({
            })
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
                    //this.content = this.getMarkdownFile(this.article.content) 
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