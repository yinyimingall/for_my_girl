<template>
    <div>
        <div class="dialog" :class="dialogClass">
            <p @click.self="onBubbleClick($event)" :class="{'link-style': linkStyle}">{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bubble-dialog',
    props: {
        direction: String, // left right 
        message: String,
        payload: Object
    },
    data() {
        return {
            dialogClass: {
                [this.direction]: true
            },
            linkStyle: false

        }
    },
    mounted() {
        if (this.payload && this.payload.url) {
            this.linkStyle = true
        }
    },
    methods: {
        onBubbleClick() {
            if (this.payload) {
                this.$eventBus.$emit('bubble-clicked', this.payload)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
pink = #a131f8
purple = #6c27c2
.dialog
    word-break break-all
    min-height 46px
    font-size 16px
    background #fff
    box-shadow 0 4px 20px 0 rgba(52, 73, 94, 0.2)
    padding 10px
    border-radius 20px
    z-index 998
    position relative
    transform scale(0)
    transition transform 0.3s cubic-bezier(0.25, 0.1, 0, 0.99)
    &.left
        color #33465d
        background-color #eef6f8
        border-bottom-left-radius 0
        transform-origin left bottom
    &.right
        color #fff
        background linear-gradient(-30deg, purple, pink)
        border-bottom-right-radius 0
        transform-origin right bottom
    p
        line-height 1.5rem
    &:before
        display block
        content ''
        position absolute
        width 0
        height 0
.bubble-item.show .dialog
    transform scale(1)
.link-style
    // text-decoration underline
    animation playcolor 1s ease-in-out infinite
    @keyframes playcolor
        0%
            color #aa0ddb
        33%
            color #dd70ff
        100%
            color #aa0ddb
</style>

