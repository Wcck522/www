<template>
	<div class="Topping">
  <ul id="home-nav">
    <li>
      <router-link to="/">推荐音乐</router-link>
    </li>
    <li><router-link to="/hot">热歌榜</router-link></li>
    <li><router-link to="/search">搜索</router-link></li>
  </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
	.Topping{
		width: 100%;
		height:41px;
		border-bottom: 1px solid #eeeeee;
		background-color: #f5f5f5;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}
#home-nav {
  height: 100%;
  display: flex;
  li {
    flex: 1;
    text-align: center;
    a {
      //   background: lightblue;
      text-decoration: none;
      color: black;
      line-height: 40px;
      display: inline-block;
      padding: 0 10px;

      &.router-link-exact-active {
        color: #d33a31;
        border-bottom: 2px solid #d33a31;
      }
    }
  }
}
</style>