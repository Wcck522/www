<template>
	<div class="playlist">
		<section class="playlistheader">
			<div class="playlistbg" :style="{backgroundImage:`url('${playlist.coverImgUrl}')`}"></div>
			<div class="playlistheader_wrap">
				<div class="wrap_left">
					<img class="p_img" :src="playlist.coverImgUrl" alt="">
					<span class="icon">歌单</span>
					<i class="listnum">{{playlist.playCount | formatPlayCount}}</i>
				</div>
				<div class="wrap_right">
					<h2 class="p_text">{{playlist.name}}</h2>
					<div class="auth">
						<div class="link">
							<div class="avatar">
								<img :src="creator.avatarUrl" alt="">
							</div>{{creator.nickname}}
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="listsong">
			<h3 class="list">歌曲列表</h3>
			<SongItem
			@update:music="$emit('update:music',$event)"
			@update:playlist="$emit('update:playlist',playsongs)"
			v-for="(song,index) in playsongs"
      :playsongs="playsongs"
			:key="song.id" 
			:item="song" 
			:artists="song.ar" 
			:index="index" 
			:currentMusic="$attrs.currentMusic" 
			:paused="$attrs.paused">
			<div class="leftnum">{{index+1 | hotnum}}</div>
			</SongItem>
			
			<h3 class="list">精彩评论</h3>
			<playcomment
			v-for="comments in playhotcomments"
			:key="comments.commentId"
			:comments="comments.user"
			:item="comments"
			>				
			</playcomment>
			
			<h3 class="list">最新评论</h3>
			<playcomment
			v-for="comments in playcomments"
			:key="comments.commentId"
			:comments="comments.user"
			:item="comments"
			>				
			</playcomment>
		</div>
	</div>
</template>

<script>
	import SongItem from "@/components/SongItem.vue"
	import playcomment from "@/components/playcomment.vue"
	export default {
		components: {
			SongItem,
			playcomment
		},
		data: function() {
			return {
				playlist: [],
				playlists: [],
				playsongs: [],
				creator:[],
				playcomments:[],
				playhotcomments:[]
			}
		},
		filters: {
			formatPlayCount: function(value) {
				if (value > 100000000) {
					return (value / 100000000).toFixed(1) + "亿";
				}
				return (value / 10000).toFixed(1) + "万";
			},
			hotnum: function(value) {
				if (value < 10) {
					return "0" + value;
				}
				return value;
			}
		},
		created() {
			this.$root.isShowLoading = true;
			this.axios.get("/playlist/detail?id=" + this.$route.query.id).then((response) => {
				this.playlist = response.data.playlist;
				this.creator=response.data.playlist.creator;
				this.playlists = response.data.playlist.trackIds.slice(0, 20).map((e) => e.id).join();
				this.$root.isShowLoading = true;
				this.axios.get('/song/detail?ids=' + this.playlists).then((response) => {
					// console.log(response.data.songs);
					this.playsongs = response.data.songs;
				}).finally(() => {
					this.$root.isShowLoading = false;
				});
				this.axios.get('/comment/playlist?id=' + this.$route.query.id).then((response) => {
					this.playhotcomments=response.data.hotComments;
					this.playcomments=response.data.comments;
				}).finally(() => {
					this.$root.isShowLoading = false;
				});
			}).finally(() => {
				this.$root.isShowLoading = false;
			});
			// console.log(this.$route.query.id);
		},
		watch: {
			// "$route.query.id": function(n) {
			// 	console.log('watch', n);
			// }
		}
	}
</script>

<style lang="less">
	.playlist{
		// margin-bottom: 50px;
	}
	.playlistheader {
		position: relative;
		padding: 30px 10px 30px 15px;
		overflow: hidden;
    width: 100vw;

		.playlistbg {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50%;
			filter: blur(20px);
		}

		.playlistheader_wrap {
			display: flex;
			position: relative;
			z-index: 2;

			.wrap_left {
				width: 126px;
				height: 126px;
				position: relative;

				.p_img {
					width: 100%;
					vertical-align: middle;

				}

				.icon {
					position: absolute;
					z-index: 3;
					top: 10px;
					left: 0;
					padding: 0 8px;
					height: 17px;
					color: #fff;
					font-size: 9px;
					text-align: center;
					line-height: 17px;
					background-color: rgba(217, 48, 48, .8);
					border-top-right-radius: 17px;
					border-bottom-right-radius: 17px;
					display: block;
				}

				.listnum {
					position: absolute;
					right: 4px;
					top: 0;
					z-index: 3;
					padding-left: 15px;
					color: #fff;
					font-size: 13px;
					background-position: 0;
					background-repeat: no-repeat;
					background-size: 11px 10px;
					text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
					background-image:
						url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
				}

				.listnum:after {
					content: " ";
					width: 100%;
					position: absolute;
					left: 0;
					top: 0;
					height: 18px;
					z-index: 1;
					background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .2));
				}
			}

			.wrap_right {
				width: 1%;
				margin-left: 16px;
				flex: 1 1 auto;

				.p_text {
					font-size: 17px;
					line-height: 1.3;
					color: #fefefe;
					height: 44px;
					display: -webkit-box;
				}
				.auth{
					display: block;
					position: relative;
					margin-top: 20px;
					.link{
						display: inline-block;
						color: hsla(0,0%,100%,.7);
						.avatar{
							display: inline-block;
							width: 30px;
							height: 30px;
							border-radius: 50%;
							vertical-align: middle;
							margin-right: 5px;
							img{
								border-radius: 50%;
								width: 100%;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}
	}

	.listsong {
		width: 100%;
		.list {
			height: 23px;
			line-height: 23px;
			padding: 0 10px;
			font-size: 12px;
			color: #666;
			background-color: #eeeff0;
		}
	}
	.leftnum{
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		margin-right: 5px;
		color: #999999;
	}
</style>
