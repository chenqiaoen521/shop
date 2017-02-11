<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods">{{item.name}}</li>
			</ul>
		</div>
		<div class="foods-wrapper"></div>
	</div>
</template>
<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
	data () {
		return {
			goods: {}
		}
	},
	props: {
		seller: Object
	},
	mounted: function () {
		this.$nextTick(function () {
			this.$http.get('/api/goods').then(res => {
				let result = res.body
				if (result.errno === ERR_OK) {
					this.goods = result.data
					}
				}, response => {
			})
		})
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.goods
	position:absolute
	display:flex
	width:100%
	top:174px
	bottom:46px
	overflow:auto
	.menu-wrapper
		flex: 0 0 80px
		width: 80px
		background:#f3f5f7
	.foods-wrapper
		flex:1
</style>
