<template>
  <div class="hot">
    <div class="hottop">
      <div class="hotopct">
        <div class="hoticon"></div>
      </div>
    </div>
    <HotNewMusic
        @update:music="$emit('update:music',$event)"
        @update:playlist="$emit('update:playlist',$event)"
        :newSongs="hotSongs"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"></HotNewMusic>

    <div class="hotdn">
      <span class="hotview" @click="add">查看完整榜单</span>
    </div>
  </div>
</template>
<script>
import HotNewMusic from "@/components/HotNewMusic.vue"

export default {
  components: {
    HotNewMusic
  },
  data: function () {
    return {
      hotId: [],
      hotSongs: [],
      addIndex: 0
    }
  },
  created() {
    this.$root.isShowLoading = true;
    this.axios.get("/top/list?idx=1").then((response) => {
      this.hotId = response.data.playlist.trackIds.slice(0, 20).map((e) => e.id).join();
      this.$root.isShowLoading = true;
      this.axios.get("/song/detail?ids=" + this.hotId).then(response => {
        this.hotSongs = response.data.songs;
        // console.log(response.data.songs);
      }).catch((err) =>{
        console.log(err)
      }).finally(() => {
        this.$root.isShowLoading = false;
      });
    }).finally(() => {
      this.$root.isShowLoading = false;
    });
  },
  methods: {
    add(){
      if (this.addIndex==9){
        return;
      }
      this.addIndex++;
      this.axios.get("/top/list?idx=1").then((response) => {
        this.hotId = response.data.playlist.trackIds.slice(20*this.addIndex, 20*(this.addIndex+1)).map((e) => e.id).join();
        this.axios.get("/song/detail?ids=" + this.hotId).then(response => {
          for (let i = 0;i<response.data.songs.length;i++){
            this.hotSongs.push(response.data.songs[i]);
          }
        })
      })
    }
  },
  watch: {}
}
</script>
<style>
.hot {
  margin-top: 40px;
}

.hottop {
  background: url(../assets/hot.jpg) no-repeat;
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background-size: contain;
  z-index: 0;
}

.hotopct {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  padding-left: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  display: flex;
}

.hoticon {
  width: 146px;
  height: 70px;
  /* background-position: -24px -30px; */
  background: url(../assets/sn.png) no-repeat -21px -28px;
  background-size: 166px 97px;
}

.hotdn {
  height: 55px;
  line-height: 55px;
  text-align: center;
  margin-bottom: 50px;
}

.hotview {
  display: inline-block;
  color: #999;
  padding-right: 14px;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAyMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEgMWwxMCAxMEwxIDIxIi8+PC9zdmc+) 100% no-repeat;
  background-size: 7px 12px;
}
</style>
