<template>
    <header class="article-header">
        <div id="blog-logo">B</div>
        <div class="menu">
            <el-button type="primary" class="menu-button" @click="showMenuFn"><i class="menu-icon" aria-hidden="true">
                                        </i>MENU
            </el-button>
            <div class="common-menu-container">
                <slot name="munuItems">
                    <el-menu theme="dark">
                        <el-menu-item index="1">Article List</el-menu-item>
                        <el-menu-item index="2">Some Photos</el-menu-item>
                        <el-menu-item index="3">About Author</el-menu-item>
                        <el-menu-item index="4">Things Said By an Erbi</el-menu-item>
                    </el-menu>
                </slot>
            </div>
        </div>
    </header>
</template>

<style scoped>
    
</style>

<script>
    export default {
        data() {
            return {
                showMenu: false
            }
        },
        name: "article-header",
        methods: {
            goHome() {
                alert(1);
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
            activeIndex() {
                alert(1);
            }
        }
    }
</script>