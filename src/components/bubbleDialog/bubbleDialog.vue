<template>
    <div>
        <div class="dialog" :class="dialogClass">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bubble-dialog',
    props: {
        direction: String, // left right 
        message: String
    },
    data(){
        return {
            dialogClass: {
                [this.direction]: true
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
pink = #a131f8
purple = #6c27c2
.dialog
    word-break: break-all
    min-height 46px
    font-size 16px
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(52,73,94,.2);
    padding: 10px;
    border-radius: 20px;
    z-index: 998;
    position relative
    transform scale(0)
    transition transform .3s cubic-bezier(0.25, 0.1, 0, 0.99)
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
    // &.left:before, &.right:before
    //     border-top: 10px solid transparent;
    //     border-bottom:  10px solid transparent;
    //     bottom 13px
    // &.right:before
    //     border-left 10px solid #fff
    //     right -10px
    //     filter: drop-shadow(2px 0 2px rgba(52,73,94,.1))
    // &.left:before
    //     border-right: 10px solid #fff
    //     left: -10px
    //     filter: drop-shadow(-2px 0 2px rgba(52,73,94,.1))
.bubble-item.show .dialog
    transform scale(1)
</style>

