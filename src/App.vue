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
            musicUrl: './Ed Sheeran - Thinking Out Loud.mp3',

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
