<template>
    <div class="common-container">
        <header class="common-article-header">
            <h2 class="common-article-title" >
                {{articleData.title}}
            </h2>
        </header>
        <section class="common-article-excerpt">
            <p>{{articleData.extract}}</p>
        </section>
        <footer class="common-article-footer">
            <time class="common-date">{{articleData.createdTime}}</time>
        </footer>
    </div>

</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return{}
        },
        name:"common-article",
        props: {
            articleData:{
                title:String,
                id:String,
                author:String,
                createdTime:String,
                extract:String
            },

        },
        
    }
</script>