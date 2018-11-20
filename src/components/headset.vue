<template>
    <div class="box">
        <div class="outer-circle">
            <div class="inner-circle"></div>
        </div>
        <div class="left">
            <div></div>
        </div>
        <div class="right">
            <div></div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<style lang="stylus" scoped>
.box
    width 85px
    height 77px
    position relative
.outer-circle
    position absolute
    top 0
    left 6px
    width 72px
    height 72px
    z-index 10
    background #27d7cc
    border-radius 50%
    // clip-path circle(41% at 50% 50%)
.inner-circle
    position absolute
    top 6px
    left 6px
    width 60px
    height 60px
    z-index 20
    border-radius 50%
    background linear-gradient(180deg , #8e16b7, #9517b2)
.left>div, .right>div
    background #000d20
    width 7px
    height 40px
    border-radius 10px
    position absolute
    top -2px
.left
    position absolute
    width 34px
    height 34px
    background #fc6933
    border-radius 50%
    z-index 30
    bottom 0
    left 0
    &>div
        left 17px
.right
    position absolute
    width 34px
    height 34px
    background #fc6933
    border-radius 50%
    z-index 30
    bottom 0
    right: 0
    &>div
        right 17px

.mask
    position absolute
    width 37px
    height 37px
    background linear-gradient(180deg, #9217b4, #9717af)
    bottom 0
    left 24px
    z-index 60
</style>

