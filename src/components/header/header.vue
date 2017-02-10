<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avater">
				<img :src="seller.avatar" @click="detailShow=true" width="64" height="64" alt="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name" @click="detailShow=true">{{seller.name}}</span>
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
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span v-if="seller.infos" class="bulletin-text">{{seller.infos.join('')}}</span><i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="header-background">
			<img :src="seller.avatar" alt="seller.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-show="detailShow">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
				</div>
			</div>
			<div class="detail-close">
				<i class="icon-close" @click="detailShow=false" ></i>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star'
const ERR_OK = 0
export default {
	data () {
		return {
			seller: {},
			classMap: [],
			detailShow: false
		}
	},
	components: {
		'v-star': star
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
	position:relative
	background-color:rgba(7,17,27,.5)
	overflow:hidden
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
				background-size:100%
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
				background-size:100%
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
		bottom:14px
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
.bulletin-wrapper
	padding:0 22px 0 12px
	white-space:nowrap
	overflow:hidden
	text-overflow:ellipsis
	background-color:rgba(7,17,27,.2)
	line-height:28px
	height:28px
	position:relative
	.bulletin-title
		display:inline-block
		width:22px
		height:12px
		background-size:100%
		bg-image('bulletin')
		vertical-align: middle
	.bulletin-text
		margin:0 4px
		font-size:10px
		vertical-align: middle
	.icon-keyboard_arrow_right
		position:absolute
		right:12px
		bottom:8px
		font-size:10px
.header-background
	position:absolute
	top:0
	z-index:-1
	width:100%
	height:100%
	filter:blur(10px)
.detail
	position:fixed
	width:100%
	height:100%
	overflow:auto
	z-index:1
	background-color:rgba(7,17,27,.8)
	top:0
	.detail-wrapper
		min-height:100%
		width:100%
		.detail-main
			margin-top:64px
			padding-bottom:64px
			.name
				font-size:16px
				font-weight:700
				line-height:16px
				text-align:center
	.detail-close
		position:relative
		width:32px
		height:32px
		margin:-64px auto 0 auto
		clear:both
		font-size:32px
</style>
