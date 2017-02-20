<template>
	<div class="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span><v-star :size="36" :score="seller.serviceScore"></v-star><span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span><v-star :size="36" :score="seller.foodScore"></v-star><span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span><span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<v-split></v-split>
			<v-ratingselect @ratingSselect="changeType"  @ratingsOnlycont=changeCont  :select-type="selectType" :only-content="onlyContent"  :ratings="ratings"></v-ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" :alt="rating.username">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<v-star :size="24" :score="rating.score"></v-star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="label" v-for="item in rating.recommend" >{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>

				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star'
import ratingselect from 'components/ratingselect/ratingselect'
import split from 'components/split/split'
import {formatDate} from 'common/js/date'
import BScroll from 'better-scroll'
const ERR_OK = 0
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
	data () {
		return {
			selectType: ALL,
			onlyContent: true,
			ratings: []
		}
	},
	props: {
		seller: {}
	},
	filters: {
		formatDate (time) {
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	},
	components: {
		'v-star': star,
		'v-split': split,
		'v-ratingselect': ratingselect
	},
	mounted () {
		this.$nextTick(function () {
			this.$http.get('/api/ratings').then(res => {
				let result = res.body
				if (result.errno === ERR_OK) {
					this.ratings = result.data
					this.$nextTick(() => {
						if (!this.ratingScroll) {
							this.ratingScroll = new BScroll(this.$el, {
							click: true
							})
						} else {
							this.ratingScroll.refresh()
							}
						})
					}
				}, response => {
			})
		})
	},
	methods: {
		changeType (type) {
			this.selectType = type
			this.$nextTick(() => {
				this.ratingScroll.refresh()
			})
		},
		changeCont (flag) {
			this.onlyContent = flag
			this.$nextTick(() => {
				this.ratingScroll.refresh()
			})
		},
		needShow (type, text) {
			if (this.onlyContent && !text) {
				return false
			}
			if (this.selectType === ALL) {
				return true
			} else {
				return type === this.selectType
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.ratings
	position:absolute
	width:100%
	top:174px
	left:0
	right:0
	bottom:0
	overflow:hidden
	.overview
		display: flex
		padding: 18px 0
		.overview-left
			padding-bottom:6px
			flex:0 0 137px
			width:137px
			border-right:1px solid rgba(7,17,27,.1)
			text-align:center
			@media only screen and (max-width: 320px)
				flex: 0 0 120px
				width:120px
			.score
				margin-bottom:6px
				line-height:28px
				font-size:24px
				color:rgb(255,153,0)
			.title
				margin-bottom:8px
				font-size:12px
				line-height:12px
				color:rgb(7,17,27)
			.rank
				line-height:10px
				font-size:10px
				color:rgb(147,153,159)
		.overview-right
			flex:1
			padding:6px 0 6px 24px
			@media only screen and (max-width: 320px)
				padding-left:6px
			.score-wrapper
				margin-bottom:8px
				font-size:0
				.title
					display:inline-block
					vertical-align:top
					font-size:12px
					color:rgb(7,17,27)
					line-height:18px
				.star
					display:inline-block
					margin:0 6px
					vertical-align:top
					line-height:18px
				.score
					display:inline-block
					vertical-align:top
					font-size:12px
					color:rgb(255,153,0)
					line-height:18px
			.delivery-wrapper
				font-size:0
				.title
					font-size:12px
					color:rgb(7,17,27)
					line-height:18px
				.delivery
					margin-left:12px
					font-size:12px
					color:rgb(147,153,159)
	.rating-wrapper
		padding:0 18px
		.rating-item
			display:flex
			padding:18px 0 14px 0
			border-1px(rgba(7,17,27,.1))
			.avatar
				flex:0 0 40px
				padding:0 12px 0 0
				& > img
					border-radius:50%
			.content
				flex:1
				position:relative
				.name
					font-size:10px
					color:rgb(7,17,27)
					line-height:12px
					margin-bottom:4px
				.star-wrapper
					margin:4px 6px 6px 0
					.star
						display:inline-block
				.delivery
					font-size:10px
					line-height:12px
					folor:rgb(147,153,159)
				.text
					font-size:12px
					line-height:18px
					color:rgb(7,17,27)
					margin:6px 0 8px
				.recommend
					font-size:0
					.icon-thumb_up
						margin-right:8px
						font-size:12px
						line-height:16px
						color:rgb(0,160,220)
						vertical-align:top
					.label
						display:inline-block
						vertical-align:top
						margin:0 8px 4px 0
						overflow: hidden
						padding:0 6px
						border:1px solid rgba(7,17,27,0.1)
						border-radius:2px
						background-color:#fff
						font-size:9px
						line-height:16px
						width:50px
						color:rgb(147,153,159)
						white-space: nowrap
						text-overflow: ellipsis
				.time
					position:absolute
					right:0
					top:0
					font-size:10px
					line-height:12px
					color:rgb(147,153,159)
					
</style>
