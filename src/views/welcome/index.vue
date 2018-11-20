<template>
    <div>
        <canvas id="heart-canvas" :style="{'z-index': animation?'1':'-1'}"></canvas>

        <header></header>
        <main>
            <div class="music">
                <p>要打开背景音乐哦 !</p>
                <!-- <img class="headset" ref="headset" @click="playMusic" :class="{shake}" :src="'ear.png'"></img> -->
                <div class="headset-box" @click="playMusic">
                    <headset ref="headset" :class="{shake}"></headset>
                </div>
            </div>
            <div class="dialog">
                <p>开启我们的对话</p>
                <div class="open-btn" @click="gotoChat">开启</div>
            </div>
        </main>
        <aside class="Signature">
            <p>I ♥ You</p>
            <p style="font-size:0.2rem">Created by Martin Yin</p>
        </aside>
    </div>
</template>
<script>
import { getMusicState, setMusicState } from '../../store.js'
import Headset from '../../components/headset'
import { setTimeout } from 'timers';
const captureTouch = function (element) {
    var touch = { x: null, y: null, isPressed: false, event: null },
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    element.addEventListener('touchmove', function (event) {
        var x, y,
            touch_event = event.touches[0]; //first touch

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
};


function animateHeart() {
    var c = document.getElementById('heart-canvas');
    var ctx = c.getContext('2d');
    var w = window.innerWidth;
    var h = window.innerHeight;
    c.width = w;
    c.height = h;
    class heartShape {
        constructor(x, y) {
            // 一个心，有坐标x、y，还有大小 d为心半个弧的直径，还有速度
            function randomColor() {
                const colors = ['#ea9999', '#ff0000', '#ff00ff', '#ff9900', '#ffff00']
                let i = Math.floor(Math.random() * colors.length)
                return colors[i]
            }
            this.x = x;
            this.y = y;
            this.vy = -(0.5 + Math.random() * 3);
            this.d = 5 + + Math.random() * 5; // 圆的直径 矩形比例为 8:5
            this.border = this.d * 8 / 5 - this.d / 2;
            this.color = randomColor()
        }

        draw(ctx) {
            var rate = Math.cos(45 * Math.PI / 180);
            var x = this.x;
            var y = this.y;
            var left = {
                a: [x, y],
                b: [x - this.border * rate, y - this.border * rate],
                c: [x - this.border * rate + this.d * rate, y - this.border * rate - this.d * rate],
                d: [x + this.d * rate, y - this.d * rate]
            }
            var right = {
                a: [x, y],
                b: [x + this.border * rate, y - this.border * rate],
                c: [x + this.border * rate - this.d * rate, y - this.border * rate - this.d * rate],
                d: [x - this.d * rate, y - this.d * rate]
            }
            ctx.beginPath();
            ctx.moveTo(left.a[0], left.a[1]);
            ctx.lineTo(left.b[0], left.b[1])
            ctx.arc(left.b[0] + this.d * rate / 2, left.b[1] - this.d * rate / 2, this.d / 2, 3 * Math.PI / 4, 7 * Math.PI / 4, false);
            // ctx.lineTo(left.c[0], left.c[1])
            ctx.lineTo(left.d[0], left.d[1])
            ctx.lineTo(left.a[0], left.a[1]);
            ctx.fill()

            ctx.beginPath();
            ctx.moveTo(right.a[0], right.a[1]);
            ctx.lineTo(right.b[0], right.b[1])
            ctx.arc(right.b[0] - this.d * rate / 2, right.b[1] - this.d * rate / 2, this.d / 2, Math.PI / 4, 5 * Math.PI / 4, true);
            // ctx.lineTo(right.c[0], right.c[1])
            ctx.lineTo(right.d[0], right.d[1])
            ctx.lineTo(right.a[0], right.a[1]);
            ctx.fill()

        }
    }
    var list = [];
    for (let i = 0; i < 40; i++) {
        list.push(new heartShape(c.width * Math.random(), c.height * Math.random()))
    }
    function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, w, h);

        list.forEach((item) => {

            item.y += item.vy;
            ctx.fillStyle = item.color;
            item.draw(ctx)
        })
        let i = list.length
        while (i--) {
            let item = list[i]
            if (item.y < -20) {
                list.splice(i, 1)
                continue
            }
            item.y += item.vy;
            ctx.fillStyle = item.color;
            item.draw(ctx)
        }

        // let mouse = captureTouch(c)
        // if (mouse.x && mouse.y) {
        //     list.push(new heartShape(mouse.x, mouse.y))
        // }


    }
    draw()
}
export default {
    name: 'welcome',
    data() {
        return {
            shake: false,
            animation: false
        }
    },
    components: {
        Headset
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
            if ([...this.$refs.headset.$el.classList].indexOf('shake') !== -1) {
                this.shake = false;
                setMusicState(false)
            } else {
                this.shake = true;
                setMusicState(true)
                this.animation = true;
                animateHeart()
            }
            this.$eventBus.$emit('play-music');
        }
    }
}
</script>

<style lang="stylus" scoped>
main
    z-index 200
canvas#heart-canvas
    margin 0px
    padding 0px
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
p
    text-align center
    color #fff
    margin-bottom 10px
header
    background linear-gradient(150deg, #6812d3, #c91d8b)
    background-size 100% 100%
    background-position 0 0
    height 100%
    position absolute
    left 0
    right 0
    z-index -1
.dialog
    position absolute
    left 0
    right 0
    z-index 200
    margin-top 90%
.open-btn
    width 140px
    height 46px
    margin auto
    font-size 0.8rem
    color #fff
    box-shadow 0px 1px 10px 1px rgba(52, 73, 94, 0.5)
    line-height 46px
    text-align center
    border-top-left-radius 5px
    border-top-right-radius 30px
    border-bottom-left-radius 30px
    border-bottom-right-radius 30px
    z-index 200
    // background linear-gradient(120deg, #cc208e, #640cd2)
.music
    text-align center
    padding-top 50%
    margin-bottom 10px
    z-index 200
    position absolute
    left 0
    right 0
.headset-box
    display inline-flex
    z-index 200
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
.Signature
    position absolute
    z-index 100
    bottom 20px
    right 20px
    color #003D6C
    line-height 0.2
    font-size 0.8em
    font-family Open Sans, sans-serif
    p
        text-align right
</style>

