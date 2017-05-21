<template>
    <div>
        <div class="common-container">
            <header class="index-header">
                <div id="bgIndex" :class="{ blur: showIntroduce }" >
                    <img src="../../public/images/bg_2.jpg">
                </div>
                <div id="blog-logo" @click="goHome">B</div>
                <div class="common-vertical">
                    <div class="page-title" @click="showIntroduce=!showIntroduce" v-show="!showIntroduce">
                        BubblyFace Awesome
                    </div>
                </div>
                <div id="homeIntroduce" v-if="showIntroduce">
                    <el-row>
                        <el-col :span="24"><div class="titleComntainer" @click="showIntroduce=!showIntroduce">
                            <h1 class="common-title">Welcome</h1>
                        </div></el-col>
                    </el-row>
                </div>
                <a class="showContent"  href="javascript:void(0)" @click="goAnchor('#content')">
                    <i class="el-icon-arrow-down"></i>
                </a>
            </header>
            <main id="content" class="content" name="content">
                <article class="common-article" v-for="(article, index) in articles">
                    <common-article v-bind:articleData="article"></common-article>
                </article>
            </main>
        </div>
    </div>
</template>
<style scoped>
    #bgIndex{
        min-width: 1200px;
        height: 100vh;
        width: 100%;
        overflow-y: hidden;
        background-color: #8f8f8f;
        position: relative;
        transition: filter 1s;
    }
    #bgIndex>img{
        width: 100%;
    }
    #blog-logo{
        background-color: rgba(0,0,0,0.7);
        color: #999;
        text-align: center;
        line-height: 40px;
        font-size: 28px;
        font-family: fibre;
        width: 40px;
        height: 40px;
        position: absolute;
        z-index: 20;
        left:80px;
        top: 40px;
        border: 1px;
        border-radius: 20px;
        transition: color,background-color .5s;
        cursor: default;
    }
    #blog-logo:hover{
        color: #fff;
        background-color: rgba(0,0,0,1);
    }
    .page-title{
        font-size: 50px;
        font-family: fibre;
        color: rgba(256,256,256,1);
        z-index: 999;
        text-align: center;
        position: absolute;
        top: 50vh;
        left:50vw;
        margin-left: -201px;
        margin-top: -25px;
        animation: pulse 2s;
        transition: display,visibility .5s;
    }
    .page-title:hover{
        animation: pulse 2s  infinite;
        cursor: default;
    }
    #homeIntroduce{
        position: absolute;
        background: rgba(0,0,0,.5);
        width: 500px;
        left:50vw;
        margin-left: -250px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
    }
    .titleComntainer{
        text-align: center;
    }
    .showContent{
        color: rgba(256,256,256,.7);
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
    .showContent:hover{
        -webkit-animation: jello 2s infinite;
        -o-animation: jello 2s infinite;
        animation: jello 2s infinite;
    }
    .index-header{
        margin-bottom: 60px;
        position: relative;
    }

</style>
<script>
    import commonArticle from "../../components/article.vue";
    var fakeArticle =[
        {
            title:"test",
            id:"test",
            author:"shw",
            createdTime:"26 Fri 2017",
            extract:"前言   首页的高速加载和渲染一直是前端开发者们津津乐道的事情，因此各种技术也应运而生。在 HTTP1.1 时代，为了减少请求的发送，加快首页加载，压缩和合并成了必不可少的技术，其中包括了 JavaScript 文件的压缩、混淆和合并，还有 CSS 文件的压缩和合并，最后还有一个是针对小图片的请求优化，也就是 CSS Sprite，也叫 雪碧图 或"
        },
        {
            title:"test",
            id:"test",
            author:"shw",
            createdTime:"26 Fri 2017",
            extract:"前言   首页的高速加载和渲染一直是前端开发者们津津乐道的事情，因此各种技术也应运而生。在 HTTP1.1 时代，为了减少请求的发送，加快首页加载，压缩和合并成了必不可少的技术，其中包括了 JavaScript 文件的压缩、混淆和合并，还有 CSS 文件的压缩和合并，最后还有一个是针对小图片的请求优化，也就是 CSS Sprite，也叫 雪碧图 或"
        }
    ]
    function defaultData() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            showIntroduce:false,
            showContent:false,
            articles:[]
        }
    }

    export default{
        data(){
            return defaultData({
                articles:[]
            })
        },
        components:{
            "common-article":commonArticle
        },
        methods:{
            init(){
                this.getArticles();
            },
            getArticles(){
                this.articles=fakeArticle
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            goHome(){
                console.log(this.articles)
            },
            showContentClick(){
                this.showContent=true;
            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                $('body').animate({
                    scrollTop: anchor.offsetTop
                },500);
            }

        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                    vm.init()
            })
        }
    }
</script>