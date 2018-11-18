<template>
    <div class="bubble-item" :class="{[direction]:true}">
        <div class="img-box">
            <img class="avatar" :src="imgUrl" alt="null">
        </div>
        <bubble-dialog :message="message" :direction="direction" :payload="payload"></bubble-dialog>
    </div>
</template>
<script>
import BubbleDialog from './bubbleDialog'
export default {
    // props: {
    //     direction: String,
    //     message: String,
    //     img: String // me or her
    // },
    components: {
        BubbleDialog
    },
    data() {
        return {
            direction: 'left',
            message: '',
            img: ''
        }
    },
    computed: {
        imgUrl() {
            return this.img === 'me' ? 'me.jpg' : 'her.jpg'
        }
    },
    mounted() {

    }
}
</script>

<style lang="stylus">
.bubble-item
    color #000
    display flex
    align-items flex-end
    margin-bottom 18px
    &.right
        flex-direction row-reverse
    .img-box
        width 46px
        height 46px
    .avatar
        width 46px
        height 46px
        border-radius 50%
        transform scale(0)
        transform-origin center
        transition transform .3s cubic-bezier(0.25, 0.1, 0, 0.99)
    &.show .avatar
        transform scale(1)
    &.left .img-box
        margin-right 1rem
    &.right .img-box
        margin-left 1rem
</style>
