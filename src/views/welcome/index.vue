<template>
    <div>
        <header></header>
        <div class="music">
            <p>需要背景音乐吗？</p>
            <img class="headset" ref="headset" @click="playMusic" :class="{shake}" :src="'ear.png'"></img>
        </div>
        <div>
            <p>开启我们的对话</p>
            <div class="open-btn" @click="gotoChat">开启</div>
        </div>

    </div>
</template>
<script>
import {getMusicState, setMusicState} from '../../store.js'

export default {
    name: 'welcome',
    data() {
        return {
            shake: false
        }
    },
    mounted() {
        if (getMusicState()) {
            this.shake = true
        } else {
            this.shake = false;
        }
    },
    methods: {
        gotoChat() {
            this.$router.push({
                path: '/chat'
            })
        },
        playMusic() {
            if ([...this.$refs.headset.classList].indexOf('shake') !== -1) {
                this.shake = false;
                setMusicState(false)
            } else {
                this.shake = true;
                setMusicState(true)
            }
            this.$eventBus.$emit('play-music');
        }
    }
}
</script>

<style lang="stylus" scoped>
p
    text-align center
header
    height 180px
    background linear-gradient(150deg, #6812d3, #c91d8b)
    // -webkit-mask-image url('./masks.svg#header-mask')
    // -webkit-mask-size cover
    // mask-position center
    // clip-path url('/masks')
.open-btn
    width 140px
    height 46px
    margin auto
    font-size 0.8rem
    color #fff
    box-shadow 1px 3px 10px 0px rgba(52, 73, 94, 0.5)
    line-height 46px
    text-align center
    border-top-left-radius 5px
    border-top-right-radius 30px
    border-bottom-left-radius 30px
    border-bottom-right-radius 30px
    background linear-gradient(120deg, #cc208e, #640cd2)
.music
    text-align center
.headset
    width 85px
    height 77px
.shake
    animation shake 1s ease-in-out infinite
    @keyframes shake
        0%
            transform rotateZ(0deg)
        25%
            transform rotateZ(-10deg)
        50%
            transform rotateZ(0deg)
        75%
            transform rotateZ(10deg)
        100%
            transform rotateZ(0deg)
</style>

