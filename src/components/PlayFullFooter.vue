<template>
  <div class="play-full-footer">
    <div class="progress">
      <span class="currentTime">{{ currentTime|formatduration }}</span>
      <input type="range" min="0" :max="duration" step="1" @input="getValue" :value="currentTime">
      <span class="jd" :style="{width:(currentTime/duration)*100+'%'}">
				<span class="btn"></span>
			</span>
      <span class="duration">{{ duration | formatduration }}</span>
    </div>
    <br>
    <br>
    <div class="switch">
      <div class="li" @click="isRandom=!isRandom" :class="isRandom?'random':''"></div>
      <div class="left" @click="$emit('playLast');lastsong()"></div>
      <div class="mid" :class="{paused:paused}" @click="$emit('togglePlayState')"></div>
      <div class="right" @click="$emit('nextSong');nextsong();randomNext()"></div>
      <div class="label" @click="isShow=!isShow"></div>
    </div>

    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut"></transition>
    <div class="box" v-show="isShow">
      <div class="title">
        <span>播放列表</span>
        <span @click="isShow=!isShow">X</span>
      </div>
      <div style="overflow-y: auto;height: 90%;margin-top: 5px">
        <ul>
          <li v-for="(i,index) in this.$root.playMusic.playList" :key="i.id" @click="clickHandler(i);playid=index"
              :class="playid==index?'current':''">
            <span class="num" style="margin-right: 15px">{{ index + 1 }}</span>
            <span class="song">{{ i.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: ["currentTime", "duration", "paused", "currentMusicId"],
  components: {},
  data: function () {
    return {
      isRandom: false,
      isShow: false,
      playid: this.$root.playMusic.currentPlay,
    };
  },
  methods: {
    getValue: function (e) {
      // console.log(e.target.value);
      this.$emit('update:currentTime', e.target.value)
    },

    lastsong: function () {
      this.playid--;
    },

    nextsong: function (v) {
      if (this.isRandom){
        return;
      }
      this.playid++;
    },

    clickHandler: function (v) {
      this.$emit('clickHandler', v)
    },

    randomNext: function (){
      if (this.isRandom){
        this.playid=Math.floor(Math.random()*this.$root.playMusic.playList.length)
        this.$emit('randomNext',this.playid);
      }
    }

    // PadZero: function(str) {
    // 	//补零
    // 	return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
    // }
  },
  filters: {
    // formatcurrentTime: function(time) {

    // },
    formatduration: function (time) {
      time = parseInt(time);
      let mins = parseInt(time / 60);
      mins = mins < 10 ? "0" + mins : mins;
      let seconds = parseInt(time % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // result = "mins : seconds";
      return mins + ':' + seconds;
    }
  }
};
</script>

<style lang="less">
.play-full-footer {
  position: absolute;
  bottom: 25px;
  left: 0;
  width: 100%;
}

.progress {
  width: 80%;
  height: 6px;
  background-color: #9f9ec2;
  position: relative;
  top: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 3px;

  input {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 0;
  }

  .jd {
    display: block;
    position: relative;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #fff, #0c57f4);
    border-radius: 3px;

    .btn {
      position: absolute;
      background: url(../assets/player.jpg) no-repeat;
      display: inline-block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      background-size: 100%;
      right: -20px;
      top: -9px;
    }
  }

  .currentTime {
    position: absolute;
    display: inline-block;
    color: wheat;
    left: -32px;
    top: -5px;
    font-size: 10px;
  }

  .duration {
    position: absolute;
    display: inline-block;
    color: wheat;
    top: -5px;
    right: -32px;
    font-size: 10px;
  }
}

.switch {
  margin: 0 auto;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
    text-align: center;
  }

  .left {
    &::before {
      content: "";
      display: inline-block;
      background: url(../assets/last.png) no-repeat;
      height: 50px;
      width: 50px;
      transform: scale(0.7);
      background-size: 100%;
    }
  }

  .mid {
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      display: inline-block;
      background: url(../assets/paused.png) no-repeat;
      height: 50px;
      width: 50px;
      transform: scale(0.95);
      background-size: 100%;
    }

    &.paused {
      &::before {
        content: "";
        display: inline-block;
        background: url(../assets/play.png) no-repeat;
        height: 50px;
        width: 50px;
        transform: scale(0.9);
        background-size: 100%;
      }
    }
  }


  .right {

    &::before {
      content: "";
      display: inline-block;
      background: url(../assets/next.png) no-repeat;
      height: 50px;
      width: 50px;
      transform: scale(0.7);
      background-size: 100%;
    }
  }

  .li {
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      display: inline-block;
      background: url(../assets/playN.png) no-repeat;
      height: 45px;
      width: 45px;
      transform: scale(0.95);
      background-size: 100%;
    }

    &.random {
      &::before {
        content: "";
        display: inline-block;
        background: url(../assets/random.png) no-repeat;
        height: 45px;
        width: 45px;
        transform: scale(0.95);
        background-size: 100%;
      }
    }
  }

  .label {
    &::before {
      content: "";
      display: inline-block;
      background: url(../assets/playlist.png) no-repeat;
      height: 45px;
      width: 45px;
      transform: scale(0.95);
      background-size: 100%;
    }
  }


}


.playerlist {
  background: rgba(255, 255, 255);
  width: 100vw;
  height: 50vh;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .close {
    float: right;
  }
}

.playlists {
  li {
    line-height: 30px;
    height: 30px;

    &.playing {
      color: red;
    }
  }
}

.oplay {
  overflow-y: auto;
  height: 280px;
}


.box {
  border-radius: 10px;
  padding: 0 15px;
  width: 90%;
  height: 50%;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  overflow: hidden;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
  }
  div{
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  ul {
    margin-top: 30px;
    height: 100%;

    li {
      line-height: 30px;
      overflow: hidden;
      height: 30px;

      &.current {
        color: red;
      }
    }
  }
}

</style>
