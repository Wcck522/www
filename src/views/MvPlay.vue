<template>
<div class="Mvbox">
  <header><router-link to="/"><i class="fa fa-chevron-left"></i>  MV详情</router-link></header>
  <video :src="videoSrc" autoplay controls></video>
  <h3 class="list">精彩评论</h3>
  <playcomment v-for="comments in hotComment" :key="comments.commentId" :comments="comments.user" :item="comments"></playcomment>
  <h3 class="list">最新评论</h3>
  <playcomment v-for="comments in newComment" :key="comments.commentId" :comments="comments.user" :item="comments"></playcomment>
</div>
</template>

<script>
import playcomment from "@/components/playcomment.vue"
export default {
  name: "MvPlay",
  components: {
    playcomment
  },
  data(){
    return {
      videoSrc:null,
      newComment: [],
      hotComment: []
    }
  },
  created(){
    this.axios.get("/mv/detail?mvid="+this.$route.params.mvId).then(data=>{
      this.videoSrc=data.data.data.brs[480];
    })
    this.axios.get("/comment/mv?id="+this.$route.params.mvId).then(data=>{
      this.newComment=data.data.comments;
      this.hotComment=data.data.hotComments;
    })
  }
}
</script>

<style lang="less" scoped>
.Mvbox{

  header{
      background: #f5f5f5;
      line-height: 30px;
      font-size: 18px;
    a{
      text-decoration: none;
      color: #d33a31;
      i{
        margin-right: 5px;
      }
    }
  }
  section{
    background: lightgrey;
  }
  .list {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
  }
}
</style>