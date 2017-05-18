<style scoped>
    .grid {
        overflow: hidden;
    }

    .grid > .child {
        float: left
    }
    .grid > .child:last-child:after {
        content: "";
        display: table;
        clear: both;
    }
</style>
<script>
    export default{
        data(){
            return {
                width: window.innerWidth,
                size: {
                    childWidth: 0,
                    columns: 0,
                    gap: 0
                }
            }
        },
        methods: {
            getPadding() {
                if (!this.$el || !this.$el.nodeType) {
                    return 0
                }
                let style = window.getComputedStyle(this.$el, null);

                function parsePadding(which) {
                    let re = style ? parseInt(style.getPropertyValue("padding-" + which)) : 0
                    return re >= 0 ? re : 0
                }

                return parsePadding('left') + parsePadding('right');
            }
        },
        computed: {
            calSize() {
                let width = this.width - this.getPadding()

                let childWidth = this.childWidth
                let columns = this.columns
                let gap = this.minGap
                if (columns > 0) {
                    childWidth = Math.floor((width + gap) / columns) - gap
                } else {
                    columns = Math.floor((width + gap) / (this.childWidth + gap))
                    if (columns > 1) {
                        gap = Math.floor((width - columns * childWidth) / (columns - 1))
                    }
                }

                this.size.childWidth = childWidth
                this.size.gap = gap
                this.size.columns = columns
                return {
                    gap, childWidth, columns
                }
            }
        },
        render(createElement) {
            let size = this.calSize

            let childrenNum = this.$slots.default && this.$slots.default.length || 0
            for (let i = 0; i < childrenNum; i++) {
                let s = this.$slots.default[i]

                let marginLeft = `${i % size.columns == 0 ? 0 : size.gap}px`
                let width = `${size.childWidth}px`
                if (!s.data
                        || !s.data.style
                        || s.data.style['margin-left'] != marginLeft
                        || s.data.style.width != width) {
                    s.data = Object.create(s.data || {})
                    let style = s.data.staticStyle = Object.create(s.data.staticStyle || {})
                    style.width = width
                    if (this.isSquare) {
                        style.height = width
                    }
                    style['margin-left'] = marginLeft

                    if (!s.data.class) {
                        s.data.class = 'child'
                    } else {
                        s.data.class += ' child'
                    }
                }
            }

            return createElement(
                    'div',
                    {'class': 'grid'},
                    this.$slots.default
            )
        },
        mounted() {
            this.width = this.$el.clientWidth || this.width

            //虽然width可能不变，但还是要强行update，因为padding可能变了。需要先更新computed，
            //然后render
            this.$nextTick(() => {
                this._watchers && this._watchers.map(item => item.update())
            })
        },
        created() {
            if (this.childWidth <= 0 && this.columns <= 0) {
                throw 'childWidth 和 columns 至少提供一个'
            }
        },
        props: {
            childWidth: {
                type: Number,
                default: 0
            },
            columns: {
                type: Number,
                default: 0
            },
            minGap: {
                type: Number,
                default: 0
            },
            isSquare: {
                type: Boolean,
                default: true
            }
        },
    }
</script>
