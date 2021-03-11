<template>
  <div class="search">
    <div class="top">
      <div class="inputcover">
        <i class="svg-srch"></i>
        <input type="text" id="inputs" v-model.trim="something" name="search" placeholder="搜索歌曲、歌手、专辑"
               @keyup.13="symmetric=true">
        <div @click="something='';symmetric=null" class="close" v-show="something">
          <i class="svg-empty"></i>
        </div>
      </div>
    </div>

    <div v-if="symmetric">
      <ul style="background-color:#fcfcfd;">
        <SongItem
            @update:music="$emit('update:music',$event)"
            @update:playlist="$emit('update:playlist',insongs)"
            v-for="(song,index) in insongs"
            :playsongs="insongs"
            :key="song.id"
            :item="song"
            :artists="song.artists"
            :index="index"
            :currentMusic="$attrs.currentMusic"
            :paused="$attrs.paused"
        >
        </SongItem>
      </ul>
    </div>
    <div v-if="!symmetric">
      <div v-if="something" class="content">
        <p @click="symmetric=true">搜索"{{ something }}"</p>
        <ul>
          <li v-for="(item,index) in currents" :key="index" @click="symmetric=true;something=item.name">
            <i class="svg-srch_c"></i>
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div v-else class="hotSearch">
        <h5>热门搜索</h5>
        <ul>
          <li v-for="(item,index) in searchDates" :key="index" @click="something=item.searchWord">
            {{ item.searchWord }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue"

export default {
  components: {
    SongItem
  },
  data: function () {
    return {
      something: '',
      suggests: [],
      searchDate: [],
      symmetric: null,
      timer: null
    }
  },
  computed: {
    currents: function () {
      // console.log(this.suggests.slice(0,6));
      return this.suggests.slice(0, 6);
    },
    searchDates: function () {
      return this.searchDate.slice(0, 10);
    },
    insongs: function () {
      return this.suggests;
    }
  },
  methods: {
    getData: function () {
      if (this.something !== "") {
        this.symmetric = null;
        this.axios.get('/search?keywords=' + this.something).then(response => {
          // console.log(response.data.result.songs);
          this.suggests = response.data.result.songs;
        });
      }
    },
  },
  created() {
    this.$root.isShowLoading = true;
    this.axios.get('/search/hot/detail').then(response => {
      // console.log(response.data.data);
      this.searchDate = response.data.data;
    }).finally(() => {
      this.$root.isShowLoading = false;
    });
  },
  watch: {
    something: function () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getData();
      }, 500)
    }
  }
};
</script>

<style lang="less">
.search {
  height: 640px;
  padding-top: 60px;

  .top {
    width: 100%;
    border-bottom: 1px solid #eaebef;
    padding-bottom: 15px;

    .inputcover {
      position: relative;
      width: 95%;
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;
      margin: 0 auto;

      .svg-srch {
        position: absolute;
        left: 0;
        top: 9px;
        margin: 0 8px;
        vertical-align: middle;
        width: 13px;
        height: 13px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
      }

      #inputs {
        width: 100%;
        height: 30px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0);
        font-size: 14px;
        color: #333;
        border: none;
        outline: none;
      }

      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 28px;
        text-align: center;

        .svg-empty {
          width: 14px;
          height: 14px;
          display: inline-block;
          vertical-align: middle;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
        }
      }
    }
  }

  .content {
    p {
      color: #507daf;
      padding: 10px 0;
      border-bottom: 1px solid #eaebef;
    }

    ul {
      li {
        position: relative;
        float: right;
        width: 90%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eaebef;

        .svg-srch_c {
          position: absolute;
          width: 15px;
          height: 15px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
          top: 16px;
          left: -25px;
        }
      }
    }
  }

  .hotSearch {
    h5 {
      margin: 5px 0;
      padding-left: 10px;
      font-size: 13px;
      color: #666666;
    }

    ul {

      li {
        height: 30px;
        padding: 0 17px;
        line-height: 30px;
        text-align: center;
        float: left;
        border: 1px solid black;
        border-radius: 20px;
        margin: 5px;
      }
    }

  }
}
</style>
