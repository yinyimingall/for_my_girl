<template>
    <div class="chat-box">
        <header>
            <p>{{headerText}}</p>
        </header>
        <main id="main-chat">

        </main>
        <footer :class="{shake}" @click.stop="OpenMessage" :style="footerStyle">
            <p v-if="!questionShow">Send a Message...</p>
            <div v-if="questionShow" ref="$question">
                <p v-for="(item, index) in questionList" @click.stop="sendMe(item)" class="question">{{item.question}}</p>
            </div>
        </footer>
    </div>
</template>

<script>
import { say, iSay, sheSay } from '../../components/bubbleDialog/index.js'
import { dialogs } from './dialogContent.js'
import { questions } from './questionContent.js'
export default {
    name: 'chat',
    data() {
        return {
            timers: [],
            dialoging: true,
            headerText: '喜欢着你的人',
            shake: false,
            questionShow: false,
            footerStyle: {
                height: '40px',
                borderRadius: '50px'
            },
            questionList: questions
        }
    },
    components: {
    },
    mounted() {
        const self = this;
        let dialogList = [...dialogs]
        this.playDialog(dialogList)
        this.onBubbleClicked()
        document.addEventListener('click', function (e) {
            if (self.questionShow) {
                self.closeMessage()
            }
        })
    },
    methods: {
        playDialog(dialogList) {
            this.dialoging = true;
            const self = this;
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
                    say(item.who, item.content, item.payload)
                    self.headerText = item.who === 1 ? '对方正在输入中...' : '喜欢着你的人(๑• . •๑)'
                } else {
                    item = {
                        delay: 0
                    }
                }
                let timer = setTimeout(function () {
                    if (!gItem.done) {
                        start(item.delay)
                    } else {
                        self.afterDialog()
                    }
                }, item.delay)
                self.timers.push(timer)
            }
            start()
        },
        closeMessage() {
            this.questionShow = false;
            this.footerStyle = {
                height: '40px',
                borderRadius: '50px',
            }
        },
        afterDialog() {

            this.shake = true;
            this.dialoging = false;
        },
        OpenMessage() {
            if (this.dialoging) return false;
            const self = this;
            this.shake = false;
            this.questionShow = true;
            this.$nextTick(function () {
                // DOM 现在更新了
                // `this` 绑定到当前实例
                let h = self.$refs.$question.offsetHeight;
                self.footerStyle = {
                    height: h + 'px',
                    borderRadius: '10px',
                }
            })
        },
        sendMe(item) {
            let self = this;
            let answer = item.answer;
            this.dialoging = true;
            this.closeMessage();
            sheSay(item.question)
            setTimeout(function () {
                self.playDialog(item.answer)
            }, item.delay)

        },
        onBubbleClicked() {
            this.$eventBus.$on('bubble-clicked', (payload) => {
                console.log(payload)
                this.$router.push({
                    path: payload.url
                })
            })
        }
    },
    destroyed() {
        this.timers.forEach((item) => {
            window.clearTimeout(item)
        })
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
        overflow hidden
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
        transition all 0.2s ease-in-out
        p
            line-height 40px
            padding-left 30px
.question
    background #fff
p.question:active
    background #eef6f8
.shake
    animation shake 1.2s ease-in-out infinite
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

