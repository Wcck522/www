<template>
	<div @click="$emit('toggle-show-lyric')" :class="{paused:paused}">
		<div>
			<div class="Chart_wrap">
				<div class="Chart_disc">
					<div class="Chart_turn">
						<div class="Chart_rollwrap">
							<div class="Chart_bgimg">
								<img :src="picUrl+'?imageView=1&type=webp&thumbnail=246x0'" alt="">
							</div>
						</div>
						<div class="Chart_lgour">
							<div class="Chart_light">
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
	export default{
		props:['paused','picUrl']
	}
</script>

<style>
	.Chart_wrap{
		width: 100%;
		height: 350px;
		padding-top: 50px;
		/* background-color: #F06431; */
		
	}
	.paused .Chart_bgimg,.paused .Chart_light{
		animation-play-state: paused;
	}
	.Chart_disc{
		width: 300px;
		height: 300px;
		margin: 0 auto;
		position: relative;
	}
	.Chart_turn{
		width: 100%;
		height: 100%;
	}
	.Chart_turn::before{
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		background: url(../assets/small.png) no-repeat;
		background-size: contain;
	}
	.Chart_rollwrap{
		width: 184px;
		height: 184px;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1;
		margin: -92px 0 0 -92px;
	}
	.Chart_bgimg{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: url(../assets/turn.png) no-repeat;
		background-size: contain;
		animation: play 30s linear infinite;
	}
	.Chart_bgimg img{
		width: 100%;
	}
	.Chart_lgour{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 3;
	}
	.Chart_light{
		background-image: url(https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4204002263/4d50/4866/ad46/996fc8a2bc62e1ab3f51f135fc459577.png?imageView=&quality=75&thumbnail=200y200&tostatic=0);
		background: url(//s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3fd11569809b817b4988f12bc7=) no-repeat;
		background-size: contain;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 3;
		animation: play 30s linear infinite;
	}
	@keyframes play {
		form {
			transform: rotate(0deg);
		}
	
		to {
			transform: rotate(360deg);
		}
	}
</style>
