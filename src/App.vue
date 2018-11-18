<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <audio id="musicPlayer" :src="musicUrl" loop="loop"></audio>
    </div>
</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            musicUrl: 'http://dl.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?vkey=91A134958047EC04A21B8BFB7E9107BACB69E05A534FE40D340F735D128ADD558310154230F4BC6CE6710F441F0CB82636782DE73A72ABD4&fromtag=66',

        }
    },
    mounted(){
        this.$eventBus.$on('play-music', ()=> {
            this.playMusic()
        })
    },
    methods: {
        playMusic() {
            const $player = document.querySelector('#musicPlayer')
            if ($player) {
                if ($player.paused) {
                    $player.play()
                } else {
                    $player.pause()
                }
            }
        },
    }
}
</script>

<style lang="stylus">
*
    margin 0
    padding 0
    box-sizing border-box
    overflow none
.fade-enter-active, .fade-leave-active
    transition opacity 0.5s
.fade-enter, .fade-leave-to
    opacity 0
</style>
