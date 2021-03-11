<template>
	<li class="hotsong-item" @click="$emit('update:music',{item,index});$emit('update:playlist')">
		<div class="leftnum" :class="index+1 | stylehotnum">{{index+1 | hotnum}}</div>
		<div class="info">
			<h5>{{item.name}}</h5>
			<p><span v-for="(artist,indexs) in item.ar" :key="indexs">
					<template v-if="indexs">/ </template>{{artist.name}}
				</span>- {{item.name}}</p>
		</div>
		<div class="icon">
			<span class="playing" :class="{paused:paused}" v-if="currentMusic && currentMusic.id === item.id">
				<i></i>
				<i></i>
				<i></i>
			</span>
			<span v-else><img id="play" src="../assets/play.png" alt=""></span>
		</div>
	</li>
	<!-- <h1>xxx</h1> -->
</template>

<script>
	export default {
		props: ['item', 'index', 'currentMusic', 'paused'],
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
	};
</script>

<style lang="less">
	li.hotsong-item {
		display: flex;
		border-bottom: 1px solid #f6f6f7;
		margin-left: 10px;
		padding: 5px 0;
		position: relative;

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
			position: absolute;
			left: -1px;
			top: 13px;
		}

		.info {
			flex: 1;
			margin-left: 30px;

			p {
				font-size: 10px;
				color: #888888;
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
					width: 6px;
					height: 30px;
					background: red;
					// display: inline-block;
					transform-origin: center bottom;

					animation: playing 0.6s linear -0.2s infinite alternate-reverse;

					&:first-of-type {
						animation-delay: 0s;
					}

					&:last-of-type {
						animation-delay: -0.4s;
					}
				}

				&.paused {
					i {
						animation-play-state: paused;
					}
				}
			}

			#play {
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
