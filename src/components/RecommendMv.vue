<template>
  <section class="Mvbox">
    <div class="title">
    <BorderedTitle>
      <slot></slot>
    </BorderedTitle>
    <router-link to="/mv">查看更多<i class="fa fa-chevron-right"></i></router-link>
    </div>
    <div class="mvbox">
    <ul class="newMv">
      <MvItem v-for="ml in mvItem" :key="ml.id" :item="ml"></MvItem>
    </ul>
    </div>
  </section>
</template>

<script>
import MvItem from "@/components/MvItem.vue"
import BorderedTitle from "@/components/BorderedTitle"

export default {
  name: "RecommendMv",
  components: {
    MvItem,
    BorderedTitle
  },
  props: ["mvItem"]
}
</script>

<style lang="less" scoped>
.Mvbox{
  font-size: 16px;
  overflow-y: auto;

  a{
    margin-top: 15px;
    margin-bottom: 10px;
    margin-right: 8px;
    text-align: center;
    text-decoration: none;
    color: black;
  }
  div.title{
    display: flex;
    justify-content: space-between;
  }
  div.mvbox{
    overflow-y:hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .newMv{
      width: 100%;
      display: flex;
      li{
        width: 31%;
        margin-left: 5px;
        flex-shrink: 0;
      }
    }
  }
}
</style>