<template>
  <section>
    <h1><router-link to="/"><i class="fa fa-chevron-left"></i></router-link>  全部MV</h1>
    <nav class="area">
      <ul>
        <li @click="click(0)" :class="{current:currentIndex==0}">内地</li>
        <li @click="click(1)" :class="{current:currentIndex==1}">港台</li>
        <li @click="click(2)" :class="{current:currentIndex==2}">欧美</li>
        <li @click="click(3)" :class="{current:currentIndex==3}">日本</li>
        <li @click="click(4)" :class="{current:currentIndex==4}">韩国</li>
      </ul>
    </nav>
    <ul class="mvItems">
      <li v-for="ml in mvItem" :key="ml.id">
        <router-link :to="{path:'/mvPlay/'+ml.id}">
        <div>
          <img :src="ml.cover+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
          <div class="playImg"><img src="../assets/play.png" alt=""></div>
          <span class="icon_playCount"><i class="fa fa-play"></i>{{ml.playCount}}</span>
        </div>
        <p class="name">{{ml.name}}</p>
        <p class="song-name">{{ml.artistName}}</p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Mv",
  components: {

  },
  data(){
    return{
      currentIndex: 0,
      mvItem:[],
      area: ["内地","港台","欧美","日本","韩国"]
    }
  },
  methods:{
    click(num){
      this.currentIndex=num;
      this.changeMv();
    },
    changeMv(){
      this.axios.get("mv/all?area="+this.area[this.currentIndex]).then(data=>{
        this.mvItem=data.data.data;
      })
    }
  },
  created(){
    this.axios.get("/mv/all?area="+this.area[this.currentIndex]).then((data)=>{
      this.mvItem=data.data.data;
      console.log(this.mvItem);
    })
  },
  beforeRouteUpdate(to,from,next){
    this.changeMv();
    next();
  }
}
</script>

<style lang="less" scoped>
section{
  h1{
    background: #f5f5f5;
    line-height: 40px;
    font-size: 18px;
    color: #d33a31;
  }
  a{
    text-decoration: none;
  }
  .area{
    font-size: 16px;
    ul{
      background: #d33a31;
      color: white;
      display: flex;
      li{
        flex: 1;
        padding: 5px;
        text-align: center;
      }
      li.current{
        color: black;
      }
    }
  }
  .mvItems{
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 48%;
        margin-left: 5px;
        flex-shrink: 0;
        a{
          div{
            position: relative;
            div.playImg{
              position: absolute;
              width: 60px;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
          }
          p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 13px;
            &.name{
              color: black;
            }
            &.song-name{
              color: #888;
            }
          }
          span{
            position: absolute;
            z-index: 2;
            &.icon_playCount{
              color: white;
              top: 2px;
              right: 0;
              i{
                font-size: 14px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

</style>