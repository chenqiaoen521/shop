<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avater">
				<img :src="seller.avatar" width="64" height="64" alt="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		
		<div  v-if="seller.infos" class="bulletin-wrapper">{{seller.infos.join('')}}</div>
	</div>
</template>
<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
	data () {
		return {
			seller: {},
			classMap: []
		}
	},
	mounted: function () {
		this.$nextTick(function () {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
			this.$http.get('/api/seller').then(res => {
				let result = res.body
				if (result.errno === ERR_OK) {
					this.seller = result.data
					}
				}, response => {
			})
		})
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
	color:#fff
	background-color:grey
.content-wrapper
	padding:24px 12px 18px 24px
	font-size:0
	position:relative
	.avater
		display:inline-block
		vertical-align: bottom
		& > img
			display:block
	.content
		font-size:14px
		display:inline-block
		vertical-align: bottom
		margin-left:16px
		.title
				margin:2px 0 8px
			.brand
				width:30px
				height:18px
				display:inline-block
				bg-image('brand')
				background-size:30px 18px
				vertical-align: top
				margin-right:6px
				background-repeat:none
			.name
				font-size:16px
				font-weight:bold
				line-height:18px
				vertical-align: top
		.description
			font-size:12px
			line-height:12px
			margin-bottom:10px
		.support
			.icon
				display:inline-block
				width:12px
				height:12px
				margin-right:4px
				background-size:12px 12px
				background-repeat:none
				vertical-align: middle
				&.decrease		
					bg-image('decrease_1')
				&.discount		
					bg-image('discount_1')
				&.guarantee		
					bg-image('guarantee_1')
				&.invoice		
					bg-image('invoice_1')
				&.special		
					bg-image('special_1')
			.text
				font-size:10px
				line-height:12px
	.support-count
		position:absolute
		height:24px
		right:12px
		padding:0 8px
		bottom:18px
		padding:0 8px
		border-radius: 14px
		background: rgba(0,0,0,0.2)
		text-align:center
		line-height:24px
		.count
			font-size:10px
		.icon-keyboard_arrow_right
			font-size:10px
			margin-left:2px
</style>
