<template>
	<li class="song-item" @click="$emit('update:music',{item,index});updateList();$emit('update:playlist')">
		<slot></slot>
		<div class="info">
			<h5>{{item.name}}</h5>
			<p><i class="sghot"></i><span v-for="(artist,index) in artists" :key="index">
					<template v-if="index">/ </template>{{artist.name}}
				</span>- {{item.name}}</p>
		</div>
		<div class="icon">
			<span class="playing" :class="{paused:paused}" v-if="currentMusic && currentMusic.id === item.id">
				<i></i>
				<i></i>
				<i></i>
        <i></i>
				<i></i>
				
			</span>
			<span v-else ><img id="play" src="../assets/play.png" alt=""></span>
		</div>
	</li>
</template>

<script>
/* eslint-disable */
	export default {
		props: ['item','index', 'currentMusic', 'paused','artists','playsongs'],
    methods: {
		  updateList: function(){
		    this.$root.playMusic.playList=this.playsongs;
		    this.$root.playMusic.currentPlay=this.index;
      }
    }
	};
</script>

<style lang="less">
	li.song-item {
		display: flex;
		border-bottom: 1px solid #f6f6f7;
		margin-left: 5px;
		padding: 5px 0;
		.info {
			flex: 1;
			h5{}
			p{
				font-size: 10px;
				color: #888888;
				.sghot{
					display: inline-block;
					width: 12px;
					height: 8px;
					margin-right: 4px;
					background: url(../assets/sn.png) no-repeat;
					background-size: 166px 97px;
					
				}
			}
		}

		.icon {
			width: 30px;
			height: 30px;
			.playing {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				i {
					width: 4px;
					height: 30px;
					background-color: #F08080;
					border-radius: 5px;
					// display: inline-block;
					transform-origin: center bottom;

					animation: playing 0.6s linear -0.2s infinite alternate-reverse;

					&:first-of-type {
						animation-delay: 0s;
            background-color: #d3d8f5;
          }
					&:nth-of-type(2){
						animation-delay: -0.2s;
            background-color: #0c57f4;
          }
					&:nth-of-type(3){
						animation-delay: -0.4s;
            background-color: #91deec;
          }
          &:nth-of-type(4){
            animation-delay: -.8s;
            background-color: #81d3d2;
          }
					&:last-of-type {
						animation-delay: -0.6s;
            background-color: #cbdaed;
          }
				}

				&.paused {
					i {
						animation-play-state: paused;
					}
				}
			}
			#play{
				// width: 50px;
				// height: 50px;
				// display: inline-block;
				width: 100%;
				height: 100%;
				transform: scale(0.7);
			}
		}
	}

	@keyframes playing {
		from {
			// height: 50px;
			transform: scaleY(1);
		}

		to {
			// height: 10px;
			transform: scaleY(0.2);
		}
	}
</style>
