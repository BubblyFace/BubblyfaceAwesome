<template>
    <div>
        <div class="common-container">
            <header class="index-header">
                <div id="bgIndex" :class="{ blur: showIntroduce }">
                    <img src="../../public/images/bg_2.jpg">
                </div>
                <div id="blog-logo" @click="goHome">B</div>
                <div class="menu">
                    <el-button type="primary" class="menu-button" @click="showMenuFn"><i class="menu-icon" aria-hidden="true">
                                                    </i>MENU
                    </el-button>
                    <div class="common-menu-container">
                        <el-menu theme="dark">
                            <el-menu-item index="1" @click="goMySelf">Article List</el-menu-item>
                            <el-menu-item index="2" @click="goAblum">Some Photos</el-menu-item>
                            <el-menu-item index="3">About Author</el-menu-item>
                            <el-menu-item index="4">Things Said By an Erbi</el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="common-vertical">
                    <div class="page-title" @click="showIntroduce=!showIntroduce" v-show="!showIntroduce">
                        BubblyFace Awesome
                    </div>
                </div>
                <div id="homeIntroduce" v-if="showIntroduce">
                    <el-row>
                        <el-col :span="24">
                            <div class="titleComntainer" @click="showIntroduce=!showIntroduce">
                                <h1 class="common-title">Welcome</h1>
                            </div>·
                        </el-col>
                    </el-row>
                </div>
                <a class="showContent" href="javascript:void(0)" @click="goAnchor('#content')">
                    <i class="el-icon-arrow-down"></i>
                </a>
            </header>
            <main id="content" class="content" name="content">
                <article class="common-article" v-for="(article, index) in articles" @click="goArticleDetail(article._id)">
                    <common-article v-bind:articleData="article"></common-article>
                </article>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="50">
                    </el-pagination>
                </div>
            </main>
        </div>
        <common-footer></common-footer>
    </div>
</template>

<style scoped>
    .menu-icon {
        background: url("../../public/icons/all.svg");
    }
    
    #bgIndex {
        min-width: 1200px;
        width: 100%;
        height: 100vh;
        overflow-y: hidden;
        background-color: #fff;
        position: relative;
        transition: filter 1s;
    }
    
    #bgIndex>img {
        width: 100%;
    }
    
    .page-title {
        font-size: 50px;
        font-family: fibre;
        color: rgba(256, 256, 256, 1);
        z-index: 999;
        text-align: center;
        position: absolute;
        top: 50vh;
        left: 50vw;
        margin-left: -201px;
        margin-top: -25px;
        animation: pulse 2s;
        transition: display, visibility .5s;
    }
    
    .page-title:hover {
        animation: pulse 2s infinite;
        cursor: default;
    }
    
    #homeIntroduce {
        position: absolute;
        background: rgba(0, 0, 0, .5);
        width: 500px;
        left: 50vw;
        margin-left: -250px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
    }
    
    .titleComntainer {
        text-align: center;
    }
    
    .showContent {
        color: rgba(256, 256, 256, .7);
        display: block;
        position: absolute;
        z-index: 100;
        bottom: 45px;
        left: 50%;
        margin-left: -16px;
        width: 34px;
        height: 34px;
        text-align: center;
        text-decoration: none;
        font-size: 34px;
        line-height: 34px;
    }
    
    .showContent:hover {
        -webkit-animation: jello 2s infinite;
        -o-animation: jello 2s infinite;
        animation: jello 2s infinite;
    }
    
    .index-header {
        margin-bottom: 60px;
        position: relative;
    }
</style>

<script>
    import commonArticle from "../../components/article.vue";
    
    function defaultData() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            showIntroduce: false,
            showContent: false,
            articles: [],
        }
    }
    
    export default {
        data() {
            return defaultData({
                articles: []
            })
        },
        components: {
            "common-article": commonArticle,
        },
        methods: {
            init() {
                this.getArticles();
            },
            getArticles() {
                //接下来封装
                this.$http.get('/getData').then(response => {
                    this.articles = response.data.articles;
                    console.log(response.data)
                }, err => {
                    alert('err');
                    console.log(err);
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            showMenuFn() {
                if (!this.showMenu) {
                    $('.common-menu-container').animate({
                        right: "0"
                    }, 500);
                    $('.menu-button')
                        .html('<i class="el-icon-menu"></i>')
                        .addClass("menu-button-open");
                    this.showMenu = !this.showMenu;
                } else {
                    $('.common-menu-container').animate({
                        right: "-300px"
                    }, 500);
                    $('.menu-button')
                        .html("MENU")
                        .removeClass("menu-button-open");
                    this.showMenu = !this.showMenu;
                }
            },
            goHome() {
                console.log(this.$store)
            },
            goMySelf() {
                this.$router.push(
                    {
                        name: 'myself',
                        params: {
                            id: 'shw',
                            Item: 'test',
                        }
                    }
                )
    
            },
            goAblum() {
                this.$router.push({
                    name: 'ablums',
                    params: {
                        ablumItem: "ablumIndex"
                    }
                })
            },
            showContentClick() {
                this.showContent = true;
            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                $('body').animate({
                    scrollTop: anchor.offsetTop
                }, 500);
            },
            goArticleDetail(articleId) {
                this.$router.push({
                    name: 'articleDetail',
                    params: {
                        articleId: articleId
                    }
                })
            }
    
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.init()
            })
        }
    }
</script>