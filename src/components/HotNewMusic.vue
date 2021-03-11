<template>
	<ul class="hotMusicul">
		<SongItem 
		@update:music="$emit('update:music',$event)"
		@update:playlist="$emit('update:playlist',newSongs)"
		v-for="(song,index) in newSongs"
		:key="song.id" 
		:item="song" 
		:artists="song.ar"
		:index="index" 
		:currentMusic="$attrs.currentMusic" 
		:paused="$attrs.paused">
		<div class="leftnum" :class="index+1 | stylehotnum">{{index+1 | hotnum}}</div>
		</SongItem>
	</ul>
</template>
<script>
	import SongItem from "@/components/SongItem.vue"
	export default {
		components: {
			SongItem,
		},
		props: ["newSongs"],
		filters: {
			hotnum: function(value) {
				if (value < 10) {
					return "0" + value;
				}
				return value;
			},
			stylehotnum: function(value) {
				if (value <= 3) {
					return 'rednum';
				} else {
					return "blacknum";
				}
			}
		},
	}
</script>

<style lang="less">
	.rednum {
		color: #df3436;
	}

	.blacknum {
		color: #9999b3;
	}
	.leftnum {
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		margin-right: 5px;
		// position: absolute;
	}
</style>
