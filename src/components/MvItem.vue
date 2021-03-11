<template>
<li>
  <router-link :to="{path:'/mvPlay/'+item.id}">
  <div>
    <img :src="item.picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
    <div class="playImg"><img src="../assets/play.png" alt=""></div>
    <span class="icon_playCount"><i class="fa fa-play"></i>{{item.playCount}}</span>
  </div>
  <p class="name">{{item.name}}</p>
  <p style="color: #888;font-size: 14px;">{{item.artistName}}</p>
  </router-link>
</li>
</template>

<script>
export default {
    name: "MvItem",
    props: ['item'],

}
</script>

<style lang="less" scoped>
li{
  margin-left: 5px;
  a{
    text-decoration: none;
    .name{
      width: 100%;
      color: black;
    }
    &>div{
      position: relative;
    }
    p{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: black;
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
    div.playImg{
      position: absolute;
      width: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }

}
</style>