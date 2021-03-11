<template>
	<div class="recommend" :class="$attrs.paused">
    <RecommendMv :mvItem="mvItem">推荐MV</RecommendMv>
		<RecommendPlayList :currentRecommends="currentRecommends" @update:listId="$emit('update:listId',$event)">推荐歌单</RecommendPlayList>
		<RecommendNewMusic 
		@update:music="$emit('update:music',$event)" 
		@update:playlist="$emit('update:playlist',$event)"
		:newSongs="newSongs" 
		:currentMusic="$attrs.currentMusic" 
		:paused="$attrs.paused">最新音乐</RecommendNewMusic>
	</div>
</template>

<script>
	import RecommendPlayList from "@/components/RecommendPlayList.vue"
	import RecommendNewMusic from "@/components/RecommendNewMusic.vue"
  import RecommendMv from "@/components/RecommendMv.vue"

	export default {
		components: {
			RecommendPlayList,
			RecommendNewMusic,
      RecommendMv
		},
		data: function() {
			return {
				// 存放数据
				recommends: [],
				newSongs: [],
				recommendsIndex: 0,
				count:0,
        mvItem: []
			};
		},
		computed: {
			currentRecommends: function() {
				//截取数据
				return this.recommends.slice(this.recommendsIndex * 6, (this.recommendsIndex + 1) * 6);
			},
		},
		// 获取数据
		created() {
			this.$root.isShowLoading=true;
			this.axios.get("/personalized").then((response) => {
				this.recommends = response.data.result;
			}).finally(() => {
			this.count = this.count + 1;
			});
			this.axios.get("/personalized/newsong").then((response) => {
				this.newSongs = response.data.result;
				// console.log(this.newSongs);
			}).finally(()=>{
				this.count=this.count+1;
			});
      this.axios.get('/personalized/mv').then(data=>{
        this.mvItem=data.data.result;
      })
		},
		
		watch:{
			count:function(n){
				if(n>=2){
					this.$root.isShowLoading=false;
				}
			},
		},
		
		activated() {
			this.recommendsIndex = this.recommendsIndex >= 4 ? 0 : this.recommendsIndex + 1;
		}

	};
</script>

<style>
	.recommend{
		padding-top: 45px;
	}
</style>
