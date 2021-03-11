<template>
	<div class="show-lyric" @click="$emit('toggle-show-lyric')">
		<div class="lyricMove"  ref="lyricMove">
			<ul @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" v-if="lyric.length>0">
				<li v-for="(item,index) in lyric" :key="index"
				:style="{
					'font-size':index==currentRow?'1.3rem':'.9rem',
					'color':index==currentRow?'white':'rgba(255,255,255,0.5)'
				}">
					<div>{{item.text}}</div>
				</li>
			</ul>
      <div v-else>纯音乐,请欣赏</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['currentMusic','lyric','currentTime'],
		data:function(){
			return{
				currentRow:0,
				scrollY:0
			};
		},
		watch:{
			currentTime:function(){
				let lyricMove=this.$refs.lyricMove;
				this.lyric.forEach((element,index)=>{
					// 比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
					if(this.currentTime>element.time){
						lyricMove.style.marginTop=-(index+this.scrollY)*30+200+'px';
						this.currentRow=index;
					}
				});
			},
			scrollY:function(){
				let lyricMove=this.$refs.lyricMove;
				this.lyric.forEach((element,index)=>{
					if(this.currentTime>element.time){
						lyricMove.style.marginTop=-(index+this.scrollY)*30+200+'px';
						this.currentRow=index;
					}
				});
			},
		},
		methods:{
			touchstart:function(e){
				this.y=e.touches[0].clientY;
			},
			touchmove:function(e){
				// console.log(this.y-e.touches[0].clientY);
				this.scrollY=Math.floor((this.y-e.touches[0].clientY)/30);
			},
			touchend:function(){
				// console.log(this.currentRow+this.scrollY);
			}
		}
	}
</script>

<style lang="less" scoped>
	.show-lyric{
		height: 350px;
		margin-top: 30px;
		overflow: hidden;
	}
	.lyricMove{
		color: white;
		text-align: center;
		line-height: 30px;
		margin-top: 50px;
	}
</style>
