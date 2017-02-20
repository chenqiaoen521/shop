<template>
	<div class="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<v-star :size="36" :score="seller.score"></v-star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">{{seller.sellCount}}</span>
					<div class="favorite">
						<i class="icon-favorite" :class="{'active':favorite}" @click="toggleFav"></i>
						<p class="cont">{{favoriteText}}</p>
					</div>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="bulletin-supports">
					<li v-for="item in seller.supports" class="supports-item border-top-1px">
						<v-icon class="icon" :size=4 :type=item.type></v-icon>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="shop-picture">
				<h1 class="title">商家实景</h1>
				<div class="picture-wrapper" ref="picwrapper">
					<ul  ref="pics">
						<li v-for="item in seller.pics" class="pic-item">
							<img :src="item" >
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class="shop-infos">
				<ul>
					<li v-for="item in seller.infos" class="text border-top-1px">
						<p class="content">{{item}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star'
import BScroll from 'better-scroll'
import split from 'components/split/split'
import icon from 'components/icon/icon'
import {saveToLocal, loadFromLocal} from 'common/js/util'
export default {
	data () {
		return {
			favorite: (() => {
				return loadFromLocal(this.seller.id, 'favorite', false)
			})()
		}
	},
	props: {
		seller: {}
	},
	computed: {
		favoriteText () {
			return this.favorite ? '已收藏' : '收藏'
		}
	},
	watch: {
		'seller' () {
			this.$nextTick(() => {
				this._initScroll()
				this._picScroll()
			})
		}
	},
	mounted () {
		this.$nextTick(() => {
			this._initScroll()
			this._picScroll()
		})
	},
	methods: {
		_initScroll () {
			if (!this.sellerScroll) {
				this.sellerScroll = new BScroll(this.$el, {
				click: true
				})
			} else {
				this.sellerScroll.refresh()
				}
		},
		_picScroll () {
			if (this.seller.pics) {
				let picWidth = 120
				let margin = 6
				let width = (picWidth + margin) * this.seller.pics.length - margin
				this.$refs.pics.style.width = width + 'px'
			}
			this.$nextTick(() => {
				if (!this.picScroll) {
					this.picScroll = new BScroll(this.$refs.picwrapper, {
						scrollX: true,
						eventPassthrough: 'vertical'
					})
				} else {
					this.picScroll.refresh()
					}
				})
			},
			toggleFav (e) {
				if (!e._constructed) {
					return
				}
				this.favorite = !this.favorite
				saveToLocal(this.seller.id, 'favorite', this.favorite)
			}
	},
	components: {
		'v-star': star,
		'v-split': split,
		'v-icon': icon
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.seller
	position:absolute
	top:174px
	left:0
	right:0
	bottom:0
	overflow:hidden
	.overview
		padding:18px
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.desc
			padding-bottom:18px
			line-height:18px
			font-size:0
			border-1px(rgba(7,17,27,.1))
			position:relative
			.star
				display:inline-block
				margin-right:8px
				vertical-align:top
			.text
				margin-right:12px
				display:inline-block
				vertical-align:top
				font-size:10px
				color:rgb(77,85,93)
			.favorite
				position:absolute
				right:11px
				bottom:26px
				width:50px
				text-align:center
				.icon-favorite
					display:block
					font-size:24px
					line-height:24px
					color:#d4d6d9
					&.active
						color:rgb(240,20,20)
				.cont
					margin-top:4px
					width:100%
					font-size:10px
					line-height:10px
					color:rgb(77,85,93)
		.remark
			display:flex
			padding-top:18px
			.block
				flex:1
				text-align:center
				border-right:1px solid rgba(7,17,27,.1)
				&:last-child
					border:none
				h2
					margin-bottom:4px
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
				.content
					line-height:24px
					font-size:10px
					color:rgb(7,17,27)
					.stress
						font-size:24px
	.bulletin
		padding:18px 18px 0 18px
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.content-wrapper
			padding:0 12px
			margin-bottom:16px
			.content
				font-size:12px
				line-height:24px
				color:rgb(240,20,20)
		.bulletin-supports
			.supports-item
				padding:16px 12px
				border-top-1px(rgba(7,17,27,.1))
				.icon
					display:inline-block
					width:16px
					height:16px
					background-size:100%
				.text
					vertical-align:top
					font-size:12px
					line-height:16px
					color:rgb(7,17,27)
	.shop-picture
		padding:16px
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.picture-wrapper
			height:90px
			overflow:hidden
			.pic-item
				display:inline-block
				margin-right:6px
				width:120px
				height:90px
				&:last-child
					margin-right:0
				& > img
					width:100%
					height:100%
	.shop-infos
		padding:18px
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.text
			padding:16px 12px
			border-top-1px(rgba(7,17,27,.1))
			font-size:12px
			line-height:16px
			color:rgb(7,17,27)
</style>
