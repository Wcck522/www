<template>
	<div class="playheader" >
		<img @click="$emit('show-play-bar')" src="../assets/left.png" alt="">
		<div class="singer">
			<h3>{{currentMusic.name}}</h3>
			<p>
				<span v-for="(artist,indexs) in artisting" :key="indexs">
					<template v-if="indexs">/ </template>{{artist.name}}
				</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		props: ["currentMusic"],
		computed:{
			artisting:function(){
				let defaults;
				if(this.currentMusic.song){
					defaults=this.currentMusic.song.artists;
				}if(this.currentMusic.ar){
					defaults=this.currentMusic.ar;
				}if(this.currentMusic.artists){
					defaults=this.currentMusic.artists;
				}
				return defaults;
			}
		}
	}
</script>

<style lang="less">
	.playheader{
		position: relative;
		height: 50px;
	}
	.playheader img{
		display: inline-block;
		margin-left: 5px;
		height: 30px;
		width: 30px;
		transform: scale(0.9);
		background-size: 100%;
		position: absolute;
		left: 0;
		top: 5px;
	}
	.singer{
		width: 265px;
		height: 100%;
		display: inline-block;
		margin-left: 50px;
		
		h3{
			color: #fff;
			font-weight: 500;
			margin-bottom: 2px;
		}
		p{
			font-size: 14px;
			color: rgba(255,255,255,0.5);
		}
	}
</style>
