<template>
	<section>
		<BorderedTitle><slot></slot></BorderedTitle>
		<ul class="NewMusicul">
			<SongItem
				@update:music="$emit('update:music',$event)"
				@update:playlist="$emit('update:playlist',newSongs)"

				v-for="(song,index) in newSongs"
        :playsongs="newSongs"
				:key="song.id"
				:item="song"
        :songList="newSongs"
				:artists="song.song.artists"
				:index="index"
				:currentMusic="$attrs.currentMusic"
				:paused="$attrs.paused"
			/>
		</ul>
	</section>
</template>

<script>
/* eslint-disable */
	import BorderedTitle from "@/components/BorderedTitle.vue"
	import SongItem from "@/components/SongItem.vue"
	
	export default{
		props:{
			newSongs:{
				type:Array,
			},
		},
		components:{
			BorderedTitle,
			SongItem
		},
    methods: {
      con: function(){
        this.$root.playMusic.playList=this.songList;

      }
    }
	};
</script>

<style>
	.NewMusicul{
		margin-bottom: 60px;
	}
</style>
