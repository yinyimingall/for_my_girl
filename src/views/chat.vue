<template>
    <div class="chat-box">
        <header>
            <p>{{headerText}}</p>
        </header>
        <main id="main-chat">

        </main>
        <footer :class="{shake}" @click="OpenMessage">
            <p>Send a Message...</p>
        </footer>
    </div>
</template>

<script>
import { say, iSay, sheSay } from '../components/bubbleDialog/index.js'
import { dialogs } from './dialogContent.js'
import { setTimeout, setInterval } from 'timers';
export default {
    name: 'chat',
    data() {
        return {
            headerText: '喜欢着你的人',
            shake: false
        }
    },
    components: {
    },
    mounted() {
        const self = this;
        let dialogList = [...dialogs]
        function* gen() {
            for (let i of dialogList) {
                yield i
            }
        }
        let g = gen();
        function start(delay = 0) {
            let gItem = g.next()
            let item = gItem.value;
            if (item) {
                say(item.who, item.content)
                self.headerText = item.who === 1 ? '对方正在输入中...' : '喜欢着你的人'
            } else {
                item = {
                    delay: 0
                }
            }
            setTimeout(function () {
                if (!gItem.done) {
                    start(item.delay)
                } else {
                    self.afterDialog()
                }
            }, item.delay)
        }
        start()
    },
    methods: {
        afterDialog() {
            this.shake = true;
        },
        OpenMessage(){
            this.shake = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
pink = #a131f8
purple = #6c27c2
header-hight = 50px
.chat-box
    width 100%
    color #fff
    header
        z-index 9999
        position fixed
        top 0
        font-size 18px
        line-height header-hight
        text-align center
        height header-hight
        width 100%
        background linear-gradient(30deg, purple, pink)
    main#main-chat
        margin-top header-hight
        width 100%
        padding 10px
        margin-bottom 50px
    footer
        background #fff
        box-shadow 0 4px 16px 0 rgba(52, 73, 94, 0.2)
        position fixed
        width 90%
        bottom 18px
        left 5%
        z-index 9999
        height 40px
        border 1px solid #f0f0f0
        border-radius 50px
        color #4d5f6f
        font-size 0.8rem
        p
            line-height 40px
            padding-left 30px
.shake
    animation shake 1.2s  ease-in-out infinite
    @keyframes shake
        0%
            transform rotateZ(0deg)
        10%
            transform rotateZ(1deg)
        20%
            transform rotateZ(-1deg)
        30%
            transform rotateZ(0deg)
        75%
            transform rotateZ(0deg)
        100%
            transform rotateZ(0deg)
</style>

