<template>
  <div>
    <div class="cake">
      <div class="candle">
        <div class="flame"></div>
        <div class="stripe" v-for="item in '1234'"></div>
      </div>
      <div class="piece piece-3">
        <div class="cele">
          <div
            class="circle"
            v-for="item in '123123123123'"
          ></div>
        </div>
      </div>
      <div class="piece piece-2">
        <div class="cele">
          <div
            class="circle"
            v-for="item in '123123123123'"
          ></div>
        </div>
      </div>
      <div class="piece piece-1">
        <div class="cele">
          <div
            class="circle"
            v-for="item in '123123123123'"
          ></div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.flame
  position absolute
  top -12px
  width 10px
  height 10px
  background-color #ffee86
  border-radius 100%
  box-shadow inset 0 0 0 0.1em #ffee86
  transform rotateY(30deg)
  animation burn 3s ease-in-out infinite
  &:after
    position absolute
    content ''
    width 5px
    height 5px
    bottom 10%
    left calc(50% - 2px)
    background-color #ff3200
    border-radius 100%
    animation burnInner 3s ease-in-out infinite
.candle
  position relative
  width 10px
  height 50px
  background-color #fff
  margin auto
  border-top-left-radius 3px
  border-top-right-radius 3px
  .stripe
    position absolute
    top 10px
    left -1px
    width 12px
    height 1px
    background-color #ff4b6f
    transform rotate(25deg)
    border-radius 100%
  .stripe:nth-child(2)
    top 20px
  .stripe:nth-child(3)
    top 30px
  .stripe:nth-child(4)
    top 40px
.cake
  background transparent
  position relative
  display inline-block
.piece
  width 160px
  height 30px
  border-radius 2px
  background-color #ae610b
  margin auto
  position relative
  overflow hidden
.piece-1
  background-color #383041
.piece-2
  background-color #f7df66
.piece-3
  background-color #ff654d
.thin
  height 5px
  background-color #985004
.bottom
  width 200px
  height 5px
  border-radius 10px
  background-color #fff
.cele
  height 5px
  width 160px
  border-radius 0
  background-color #fcf7c7
  position absolute
  display flex
  .circle
    background-color #fcf7c7
    width 15px
    height 15px
    border-radius 50%
    transform translateY(-5px)

@keyframes burn 
  0% 
    transform rotateY(30deg) scaleY(1.3)
  50% 
    transform rotateY(0deg) scaleY(1)
    opacity .9
  100% 
    transform rotateY(30deg) scaleY(1.3)
@keyframes burnInner
  0%
    transform rotateX(0deg) scaleY(1)
  50% 
    transform rotateX(30deg) scaleY(1.4)
  100% 
    transform rotateX(0deg) scaleY(1)
</style>
