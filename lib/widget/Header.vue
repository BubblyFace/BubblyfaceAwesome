<template>
    <header class="mint-header" v-if="isShow" :class="{ 'is-fixed': fixed }">
        <div class="mint-header-button is-left">
            <mt-button icon="back" @click.native="backClick">{{androidTitle}}</mt-button>
            <slot name="left"></slot>
        </div>
        <div class="mint-header-title">{{iosTitle}}</div>
        <div class="mint-header-button is-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>
<script>
    var lastIsShow = false;
    import Util from 'Util'
    export default{
        name: 'mt-header',
        props: {
            fixed: Boolean,
            title: String,

            //iOS and android share the same style
            sameStyle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            backClick() {
                window.goBack && window.goBack(false)
            },
            getHeaderHeight() {
                return window.isIOS && !this.sameStyle ? 64 : 50;
            }
        },
        data() {
            return {
                isShow: window.__HEADER__
            }
        },
        computed: {
            androidTitle() {
                return window.isIOS ? '' : this.title
            },
            iosTitle() {
                return window.isIOS ? this.title : ''
            }
        },
        created() {
            if (!lastIsShow && this.isShow) {
                var offset = this.getHeaderHeight()
                var css = `.mint-content {
                                top: ${offset}px;
                            }
                            .mint-navbar.is-fixed {
                                top: ${offset}px;
                            }`
                if (window.isIOS && !this.sameStyle) {
                    css += `.mint-header {
                                height:64px;
                                padding-top: 20px;
                            }`
                }
                Util.insertCss(css);
                lastIsShow = true;
            }
        }
    }
</script>