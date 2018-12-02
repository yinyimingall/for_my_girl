<template>
  <div
    class="container"
    @click="next"
    ref="back"
  >
    <div class="info"><span>{{info}}</span></div>
    <cake
      class="cake-box"
      :class="cakeStyleClass"
    ></cake>
    <div
      class="whisper"
      :class="whisperStyleClass"
    >
      <p
        v-html="text"
        :class="textStyleClass"
      ></p>
    </div>
    <canvas id="balloon-canvas"></canvas>
    <canvas id="particle-canvas"></canvas>
  </div>
</template>

<script>
import Cake from '../../components/cake/cake.vue'

function animateBalloon() {
  var c = document.getElementById('balloon-canvas');
  var ctx = c.getContext('2d');
  var w = window.innerWidth;
  var h = window.innerHeight;
  c.width = w;
  c.height = h;
  class ellipse {
    constructor(x, y) {
      function randomColor() {
        const colors = ['rgba(197, 63, 183, 0.2)', 'rgba(97, 63, 197, 0.2)', 'rgba(63, 197, 89, 0.2)', 'rgba(197, 151, 63, 0.2)', 'rgba(197, 64, 63, 0.2)', 'rgba(240, 98, 146,0.3)', 'rgba(186, 104, 200,0.3)', 'rgba(100, 181, 246,0.3)', 'rgba(77, 208, 225,0.3)', 'rgba(129, 199, 132,0.3)', 'rgba(220, 231, 117,0.3)', 'rgba(255, 213, 79,0.3)', 'rgba(255, 138, 101,0.3)']
        // const colors = ['rgba(240, 98, 146,0.3)', 'rgba(186, 104, 200,0.3)', 'rgba(100, 181, 246,0.3)', 'rgba(77, 208, 225,0.3)', 'rgba(129, 199, 132,0.3)', 'rgba(220, 231, 117,0.3)', 'rgba(255, 213, 79,0.3)', 'rgba(255, 138, 101,0.3)']
        let i = Math.floor(Math.random() * colors.length)
        return colors[i]
      }
      this.width = 10 + 20 * Math.random();
      this.height = this.width * 5 / 4;
      this.x = x;
      this.y = y;
      this.w = this.width / 2;
      this.h = this.height / 2;
      this.k = (this.width / 0.75) / 2;
      this.triangleHeight = (this.height / 8) * Math.sin(Math.PI / 3)
      this.color = randomColor()
      this.vy = -(0.2 + Math.random() * 1);
    }

    draw() {
      const x = this.x,
        y = this.y,
        k = this.k,
        w = this.w,
        h = this.h;
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.bezierCurveTo(x + k, y - h, x + k, y + h, x, y + h);
      ctx.bezierCurveTo(x - k, y + h, x - k, y - h, x, y - h);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill()

      ctx.moveTo(x, y + h);
      let triangleLeftX = x - (this.height / 6) * Math.cos(Math.PI / 3)
      let triangleLeftY = y + h + (this.height / 8) * Math.sin(Math.PI / 3)
      let triangleRightX = x + (this.height / 8) * Math.cos(Math.PI / 3)
      let triangleRightY = y + h + (this.height / 8) * Math.sin(Math.PI / 3)
      ctx.lineTo(triangleLeftX, triangleLeftY);
      ctx.lineTo(triangleRightX, triangleRightY);
      ctx.lineTo(x, y + h);
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(x, y + h + this.triangleHeight)
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ddd'
      ctx.lineTo(x, y + h + this.triangleHeight + this.h)
      ctx.closePath();
      ctx.stroke()
    }
  }
  var list = [];
  for (let i = 0; i < 60; i++) {
    list.push(new ellipse(c.width * Math.random(), c.height * Math.random()))
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
  }
  draw()
}

function animationParticle() {
  var c = document.getElementById('particle-canvas');
  var ctx = c.getContext('2d');
  var w = window.innerWidth;
  var h = window.innerHeight;
  c.width = w;
  c.height = h;
  var calculatedDensity = c.width * 0.0085;
  var calculatedVelocity = c.width * 0.0037;
  var calculatedLife = c.height * .65;
  var calculatedStartingX = c.width / 2;

  var particles = {},
    particleIndex = 0,
    settings = {
      density: calculatedDensity,
      particleSize: 8,
      particleSizeVariety: 1.5,
      startingX: calculatedStartingX,
      startingY: -20,
      velX: calculatedVelocity,
      velY: 2,
      gravity: 0.015,
      //maxLife: 300,
      maxLife: calculatedLife,
      particleColours: ["#F06292", "#BA68C8", "#64B5F6", "#4DD0E1", "#81C784", "#DCE775", "#FFD54F", "#FF8A65", "#EEEEEE"]
    };

  class Particle {
    constructor() {
      //Starting positions and velocities
      this.x = settings.startingX;
      this.y = settings.startingY;
      //Random X and Y velocities
      this.vx = (Math.random() * (settings.velX)) - (settings.velX / 2);
      this.vy = (Math.random() * (settings.velY)) - (settings.velY / 2);
      //this.vx = 10;
      //this.vy = 10;

      //Set up rotation & center of origin
      this.rot = 0;
      this.centerOfOriginX = -this.particleSize / 2;
      this.centerOfOriginY = -this.particleSize / 4;

      this.particleSize = parseInt((Math.random() * (settings.particleSizeVariety * 2)) + settings.particleSize);

      //Choose a random colour
      this.particleColor = settings.particleColours[parseInt(Math.random() * settings.particleColours.length)];

      //Add new particle to index - this is a way to store the particles created
      particleIndex++;
      particles[particleIndex] = this;
      this.id = particleIndex;
      //Will be used later to remove particle
      this.life = -10 + parseInt(Math.random() * 20);
    }

    draw() {
      this.x += this.vx;
      this.y += this.vy;

      //calculate rotation
      var period = 100;
      this.rot += Math.sin(this.life * 2 * Math.PI / period) / 2 * (Math.random() * 2);

      //Add gravity
      this.vy += settings.gravity;

      //Age the particle by adding to 'life'
      this.life++;

      //Remove the particle if it's old
      if (this.life >= settings.maxLife) {
        delete particles[this.id];
      }

      //Create shape
      ctx.clearRect(0, settings.groundLevel, c.width, c.height);
      ctx.beginPath();
      ctx.fillStyle = this.particleColor;
      //save ctx position
      ctx.save();
      ctx.translate(this.x, this.y);

      var rotationAmount = 5;
      //rotate by sine value
      ctx.rotate(this.rot / rotationAmount);

      //translate to near random center of origin
      ctx.translate(this.centerOfOriginX, this.centerOfOriginY);
      //ctx.translate(0,0);

      ctx.globalAlpha = 0.9;
      ctx.fillRect(0, 0, this.particleSize, this.particleSize / 2);
      ctx.restore();
    }
  }
  function draw() {
    window.requestAnimationFrame(draw);
    ctx.fillStyle = '#f7fcfd'
    ctx.clearRect(0, 0, w, h);
    // Draw the particles
    for (var i = 0; i < settings.density; i++) {
      // Random chance of creating a particle corresponding to an chance of 1 per second per "density" value
      if (Math.random() > 0.97) {
        new Particle();
      }
    }
    //Use the draw method for all the particles in particles[]
    for (var i in particles) {
      particles[i].draw();
    }
  }
  draw()
}
export default {
  name: 'gift',
  components: {
    Cake: Cake
  },
  data() {
    return {
      info: '点击屏幕',
      // bgStyle: {
      //   animationPlayState: 'paused'
      // },
      textStyleClass: {
        'text-disappear': false,
      },
      cakeStyleClass: {
        'cake-show': false,
        'cake-move': false
      },
      whisperStyleClass: {
        'whisper-origin': true,
      },
      text: '许个愿吧',
      message: [
        '许个愿吧',
        'Happy Birthday<br>To ZuXian'
      ],
      animationList: [
        () => {
          this.cakeStyleClass['cake-show'] = true
        },
        () => {
          this.cakeStyleClass['cake-move'] = true
          this.whisperStyleClass['whisper-origin'] = false
        },
        () => {
          this.textStyleClass['text-disappear'] = true

          setTimeout(() => {
            this.text = this.message[1]
            this.textStyleClass['text-disappear'] = false
            this.info = 'END'
            animateBalloon()
            animationParticle()
          }, 500)
        }
      ]
    }
  },
  methods: {
    next() {
      let fn = this.animationList.shift()
      if (typeof fn === 'function') fn()
    }
  },
  beforeDestroy() {
    const $back = this.$refs.back
    $back.parentNode.removeChild($back)
  }
}
</script>

<style lang="stylus" scoped>
.container
  position absolute
  overflow hidden
  left 0
  right 0
  top 0
  bottom 0
  height 100%
  width 100%
  background #ee9ca7
  animation backgroundColorFrame 10s infinite ease-in-out
  display flex
  justify-content center
  align-items center
.info
  position absolute
  top 10px
  left 0
  padding 4px 4px 4px 1px
  background-color hsla(0, 0%, 85%, 0.549)
  border-top-right-radius 30px
  border-bottom-right-radius 30px
  font-size 6px
  color #fff
.cake-box
  position absolute
  margin 0
  transform scale(0)
  transition all 0.5s ease-in-out
.cake-show
  transform scale(1)
.cake-move
  transform scale(0.7) translateY(-160%)
.whisper
  text-align center
  font-family Vanity-LightItalic, STHeiti-Light
  transition all 0.5s ease-in-out
  transform scale(1)
  p
    font-size 38px
    color #fff
    font-weight bold
    line-height 1.5em
    transition all 0.4s ease-in-out
.whisper-origin
  transform scale(1) translateY(600px)
.text-disappear
  transform scale(0)
@keyframes backgroundColorFrame
  0%
    background-color #CE6461
  22%
    background-color #CE6461
  28%
    background-color #4798D2
  47%
    background-color #4798D2
  53%
    background-color #dd70ff
  72%
    background-color #dd70ff
  78%
    background-color #ffd500
  97%
    background-color #ffd500
  100%
    background-color #CE6461
canvas
  margin 0px
  padding 0px
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  z-index 300
</style>

