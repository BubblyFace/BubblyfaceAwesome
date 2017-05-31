<template>
    <header class="article-header">

    </header>
</template>
<style scoped>
</style>
<script>

    export default{
        name:"article-header",
        props:{
            article: Object
        },
        methods: {
            goHome(){
                alert(1);
            },
            handleSelect(){
                alert(1);
            },
            activeIndex(){
                alert(1);
            }
        }
    }
</script>