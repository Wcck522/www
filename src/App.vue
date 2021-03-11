<template>
  <div id="app">
    <div class="loading" v-show="$parent.isShowLoading">
      <svg t="1609137872009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2724" width="40" height="40">
        <path
            d="M431.633655 87.958069a80.366345 80.366345 0 1 0 160.697379 0 80.366345 80.366345 0 1 0-160.732689 0h0.03531zM119.966897 220.689655a78.035862 78.035862 0 1 0 156.071724 0 78.035862 78.035862 0 1 0-156.071724 0zM1.182897 514.153931a71.044414 71.044414 0 0 0 142.088827 0 71.044414 71.044414 0 0 0-142.088827 0z m125.775448 320.211862a61.722483 61.722483 0 0 0 123.444965 0 61.722483 61.722483 0 0 0-123.444965 0z m333.806345 133.755586a53.707034 53.707034 0 0 0 107.414069 0 53.707034 53.707034 0 0 0-107.414069 0z m345.829517-123.233103a38.488276 38.488276 0 1 0 76.976552 0 38.488276 38.488276 0 1 0-76.976552 0z m160.114759-332.199724a27.277241 27.277241 0 1 0 54.554482 0 27.277241 27.277241 0 1 0-54.554482 0z m-81.937656-286.102069a19.473655 19.473655 0 0 0 38.964966 0 19.473655 19.473655 0 0 0-38.964966 0z"
            p-id="2725" fill="red"></path>
      </svg>
    </div>
    <Play v-if="currentMusic"
          :currentMusic="currentMusic"
          :playlist="playlist"
          :lyric="lyric"
          :currentIndex="currentIndex"
          @update:music="currentMusic=$event.item;currentIndex=$event.index"
          @update:paused="paused=$event"/>
    <HomeNav v-if="$route.meta.isShowNav"/>
    <router-view
        @update:music="currentMusic=$event.item;
			currentIndex=$event.index"
        @update:playlist="playlist=$event"
        @update:listId="listId=$event"
        :currentMusic="currentMusic" :paused="paused"/>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import Play from "@/components/Play.vue"

export default {
  components: {
    HomeNav,
    Play
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      playlist: [],
      currentIndex: 0,
      lyric: null,
      listId: null,
    };
  },
  watch: {
    currentMusic: function () {
      this.axios.get("/lyric?id=" + this.currentMusic.id).then(response => {
        let lyric = response.data.lrc.lyric;
        this.lyric = this.paresLyric(lyric);
      });
    }
  },
  methods: {
    paresLyric(lyric) {
      let select = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      let arr = lyric.split("\n").filter(e => e).map(str => {
        var time = str.match(select)[0].replace(/(\[|\])/gi, "");
        var timeArr = time.split(":");
        time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
        var text = str.replace(select, "");
        return {time, text};
      });
      return arr;
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
}

:root {
  --animate-duration: 300ms;
}

.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.15);
}

.loading svg {
  animation: loading 2.5s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
