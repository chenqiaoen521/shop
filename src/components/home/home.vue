<template>
		<div class="footer-bar">
			<ul class="foot">
				<li><router-link :to="{ name:'ratings'}">主页</a></router-link></li>
				<li><router-link :to="{ name:'center'}">商家</a></router-link></li>
				<li><router-link :to="{ name:'center'}">购物车</a></router-link></li>
				<li><router-link :to="{ name:'center'}">个人中心</a></router-link></li>
			</ul>
		</div>
</template>

<script>
const ERR_OK = 0
export default {
	created () {
		this.$http.get('/v1/cities').then((data) => {
			console.log(data)
		})
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer-bar
	position:absolute
	bottom:0
	height:48px
	left:0
	right:0
	.foot
		display:flex
		&>li
			flex:1
			line-height:48px
			font-size:15px
			text-align:center
			background:grey
			&>a
				color:#fff
</style>
