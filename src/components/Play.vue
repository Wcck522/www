<template>
  <div class="play" :class="{paused:paused}">
    <audio :src="'https://music.163.com/song/media/outer/url?id=' + currentMusic.id + '.mp3'" autoplay
           ref="audio"></audio>

    <transition enter-active-class="animate__animated animate__bounceInRight"
                leave-active-class="animate__animated animate__bounceOutRight">
      <div class="play-bar" v-show="isShowPlayBar" @click="isShowPlayBar=false">
        <img :src="picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
        <h5 class="Sname">{{ currentMusic.name }}<br>
          <p class="artName">
            <span v-for="item in currentMusic.ar" :key="item.id" class="art">
<!--              {{item.name}}{{currentMusic.ar.length>1&&index!=currentMusic.ar.length-1?'/':''}}-->
            </span>
          </p>
        </h5>
        <p></p>
        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <span class="icon"></span>
        </div>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut">
      <div class="play-full" v-if="!isShowPlayBar">
        <div class="mask" :style="{backgroundImage:`url('${picUrl+'?imageView=1&type=webp&thumbnail=246x0'}')`}"></div>
        <PlayFullHeader @show-play-bar="isShowPlayBar=true" :currentMusic="currentMusic"/>
        <template>
          <PlayFullLyric v-if="isShowLyric" @toggle-show-lyric="isShowLyric=!isShowLyric" :currentMusic="currentMusic"
                         :currentTime="currentTime" :duration="duration" :lyric="$attrs.lyric"/>
          <PlayFullChart v-else :picUrl="picUrl" @toggle-show-lyric="isShowLyric=!isShowLyric" :paused="paused"/>
        </template>
        <PlayFullFooter @randomNext="getId" @clickHandler="currentPlay" v-bind:currentTime="currentTime"
                        :duration="duration"
                        @update:currentTime="$refs.audio.currentTime=$event" @nextSong="playNext" @playLast="playLast"
                        :currentMusicId="currentMusic.id" @togglePlayState="togglePlayState" :paused="paused"/>
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHeader from "@/components/PlayFullHeader.vue"
import PlayFullChart from "@/components/PlayFullChart.vue"
import PlayFullLyric from "@/components/PlayFullLyric.vue"
import PlayFullFooter from "@/components/PlayFullFooter.vue"

export default {
  props: ["currentMusic", "currentIndex", "playlist"],
  components: {
    PlayFullHeader,
    PlayFullChart,
    PlayFullLyric,
    PlayFullFooter,
  },
  data: function () {
    return {
      paused: null,
      duration: 0,
      currentTime: 0,
      isShowLyric: false,
      isShowPlayBar: true,
      play: null,
      playId: null
    };
  },
  mounted() {
    let audio = this.$refs.audio;
    audio.addEventListener('pause', () => {
      this.paused = true;
    });
    audio.addEventListener('play', () => {
      this.paused = false;
    });
    audio.addEventListener('durationchange', () => {
      this.duration = audio.duration;
      // console.log(audio.duration)
    });
    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      // console.log(audio.currentTime);
      this.drawCircle(this.currentTime, this.duration);
    });
    audio.addEventListener('ended', () => {
      this.playNext();
    });
  },
  methods: {
    getId: function (v) {
      this.playId = v;
    },
    currentPlay: function (v) {
      this.play = v;
    },
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,0,0,0)";
      ctx.lineWidth = 3;
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "#d33a31";
      ctx.arc(
          25,
          25,
          19,
          Math.PI * -0.5,
          Math.PI * ((n / total) * 2 - 0.5),
          false
      );
      ctx.stroke();
      ctx.closePath();
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    calculateNext: function () {
      let nextIndex;
      if (this.currentIndex < this.playlist.length - 1) {
        nextIndex = this.currentIndex + 1
      } else {
        nextIndex = 0
      }
      return nextIndex;
    },
    calculateLast: function () {
      let lastIndex;
      if (this.currentIndex > 0) {
        lastIndex = this.currentIndex - 1
      } else {
        lastIndex = this.playlist.length - 1
      }
      return lastIndex;
    },

    playLast: function () {
      let index = this.calculateLast();
      this.$emit('update:music', {
        item: this.playlist[index],
        index: index,
      });
    },

    // 下一首
    playNext: function () {
      // this.currentIndex=this.playlist.findIndex((song)=>this.currentMusic.id===song.id);
      let index = this.calculateNext();
      this.$emit('update:music', {
        item: this.playlist[index],
        index: index,
      });
    },


  },
  computed: {
    picUrl: function () {
      let picarr;
      if (this.currentMusic.al) {
        picarr = this.currentMusic.al.picUrl;
      }
      if (this.currentMusic.album) {
        picarr = this.currentMusic.album.artist.img1v1Url;
      }
      if (this.currentMusic.picUrl) {
        picarr = this.currentMusic.picUrl;
      }
      return picarr;
    }
  },
  watch: {
    paused: function (n) {
      this.$emit("update:paused", n);
    },
    play: function (n) {
      this.$emit("update:music", {
        item: n
      })
    },
    playId: function (n, o) {
      if (n == o) {
        return;
      }
      this.$emit("update:music", {
        item: this.$root.playMusic.playList[n]
      })
    }
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
      }

      h5 {
      }

      .control {
        span.icon {
          &::before {
            content: "";
            display: block;
            background: url(../assets/play.png) no-repeat;
            height: 50px;
            width: 50px;
            transform: scale(0.9);
            background-size: 100%;
          }
        }
      }
    }
  }
}

.animate__slideInUp, .animate__fadeIn {
  transition: opacity 0.3s linear;
}

.animate__slideOutDown, .animate__fadeOut {
  transition: opacity 0.3s linear;
}

.animate__animated {
  opacity: 0;
}

.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);

  img {
    width: 36px;
    height: 36px;
    margin: 7px;
    border-radius: 50%;
    animation: playing 6s linear infinite;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  }

  h5 {
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  .control {
    position: relative;

    margin-right: 5px;

    span.icon {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      // display: block;
      // background: rgba(240, 128, 128, 0.507);
      &::before {
        content: "";
        display: block;
        // margin-left: 10px;
        // margin-top: 14px;
        background: url(../assets/paused.png) no-repeat;
        height: 50px;
        width: 50px;
        transform: scale(0.95);
        background-size: 100%;
      }
    }
  }
}

.play-full {
  background: linear-gradient(to right, rgb(56, 56, 56), rgb(95, 95, 95), rgb(56, 56, 56));
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  .mask {
    // background: url(http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg);
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(40px) brightness(0.7);
  }
}


@keyframes playing {
  form {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.Sname {
  font-size: 16px;

  .artistsName {
    font-size: 12px;
  }
}

.icon_list {
  background: url("../assets/playlist.png") no-repeat;
  background-size: 100%;
  background-position-y: 5px;
  width: 36px;
}

.artName {
  color: #0c57f4;
}
</style>
