<template>
	<transition name="foodMask">
		<div class="food" v-show="showFlag">
			<div>
				<div class="food-content">
					<div class="image-header">
						<img :src="food.image" :alt="food.name">	
						<div class="wrap-back" @click="showFlag=false">
							<i class="icon-arrow_lift"></i>
						</div>
					</div>
					<div class="content shopcart-pos">
						<h1 class="title">{{food.name}}</h1>
						<div class="detail">
							<span class="sell-count">月售{{food.sellCount}}份</span>
							<span class="rating">好评率{{food.rating}}</span>
						</div>
						<div class="price">
							<span class="now">￥{{food.price}}</span>
							<span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
						</div>
						<v-split></v-split>
						<div class="cartcontrol-wrapper">
							<v-cartcontrol :food="food" @add="addDone"></v-cartcontrol>
						</div>
						<transition name="shopcart-fadeIn">
						<div class="shopcart" @click.stop.prevent="addFirst" v-show="!food.count || food.count ==0">加入购物车</div>
						</transition>
					</div>
					<div class="content">
						<h2 class="title infos-title">商品介绍</h2>
						<div class="infos-detail">{{food.info}}</div>
						<v-split></v-split>
					</div>
					<div class="content">
						<h1 class="title infos-title">商品评价</h1>
						<v-ratingselect @ratingSselect="changeType"  @ratingsOnlycont=changeCont  :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></v-ratingselect>
						<div class="rating-wrapper">
							<ul v-show="food.ratings && food.ratings.length">
								<li v-for="rating in food.ratings" class="rating-item border-1px">
									<div class="user">
										<span class="name">{{rating.username}}}</span>
										<img :src="rating.avatar" width=12 height=12 :alt="rating.username" class="avatar">
									</div>
									<div class="time">{{rating.rateTime}}</div>
									<p class="text">
										<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
									</p>
								</li>
							</ul>
							<div class="no-rating"  v-show="!food.ratings || !food.ratings.length">暂无评价</div>
						</div>
					</div>
					
					<div class="content">
						<h2 class="title infos-title">商品介绍</h2>
						<div class="infos-detail">{{food.info}}</div>
						<v-split></v-split>
					</div>
					<div class="content">
						<h2 class="title infos-title">商品介绍</h2>
						<div class="infos-detail">{{food.info}}</div>
						<v-split></v-split>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import Vue from 'vue'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
	data () {
		return {
			showFlag: false,
			selectType: ALL,
			onlyContent: true,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		}
	},
	props: {
		food: {}
	},
	components: {
		'v-cartcontrol': cartcontrol,
		'v-split': split,
		'v-ratingselect': ratingselect
	},
	methods: {
		show () {
			this.showFlag = !this.showFlag
			this.selectType = ALL
			this.onlyContent = true
			this.$nextTick(() => {
			if (!this.detailScroll) {
					this.detailScroll = new BScroll(this.$el, {
					click: true
					})
				}
			})
		},
		addFirst (e) {
			if (!event._constructed) {
				return
			}
			this.$emit('add', e.target)
			Vue.set(this.food, 'count', 1)
		},
		addDone (e) {
			this.$emit('add', e)
		},
		changeType (type) {
			this.selectType = type
		},
		changeCont (flag) {
			this.onlyContent = flag
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.food
	position:fixed
	left:0
	top:0
	bottom:0
	background:#fff
	right:0
	transform: translate3d(0,0,0)
	overflow:hidden
	&.foodMask-enter-active, &.foodMask-leave-active
		transition: all 0.5s
	&.foodMask-enter, &.foodMask-leave-active
		transform:translate3d(100%,0,0)
	.image-header
		width:100%
		height:0
		padding-top:100%
		position:relative
		& > img
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			filter:blur(1px)
	.wrap-back
		position:absolute
		top:10px
		left:0
		.icon-arrow_lift
			display:block
			font-size:20px
			padding:10px
			color:#fff
			line-height:20px
	.content
		&.shopcart-pos
			position:relative
		.title
			padding:18px 18px 0
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
			line-height:14px
		.detail
			font-size:0
			padding:8px 18px 18px
			color:rgb(147,153,159)
			line-height:10px
			.sell-count
				font-size:10px
				vertical-align:top
			.rating
				font-size:10px
				margin-left:12px
				vertical-align:top
		.price
			padding:0 18px 18px
			mrgin-bottom:16px
			.now
				margin-right:8px
				color:rgb(240,20,20)
				font-size:14px
				line-height:14px
				font-weight:700
			.old
				text-decoration:line-through
				font-size:10px
				color:#93999f
		.shopcart
			position:absolute
			right:18px
			bottom:33px
			width:74px
			height:24px
			border-radius:12px
			background-color:rgb(0,160,220)
			text-align:center
			font-size:10px
			padding:0 6px
			line-height:24px
			color:rgb(255,255,255)
			box-sizing:border-box
			&.shopcart-fadeIn-enter-active, &.shopcart-fadeIn-leave-active
				transition: opacity 0.5s
			&.shopcart-fadeIn-enter, &.shopcart-fadeIn-leave-active
				opacity:0
		.cartcontrol-wrapper
			position:absolute
			right:18px
			bottom:30px
		.infos-title
			font-weight:300
		.infos-detail
			padding:6px 26px 18px
			font-size:12px
			line-height:24px
			color:rgb(77,85,93)
		.rating-wrapper
			padding:0 18px
			.rating-item
				position:relative
				padding: 16px 0
				border-1px(rgba(7,17,27,.1))
				.user
					position:absolute
					right:0
					top:16px
					font-size:0
					line-height:12px
					.name
						display:inline-block
						margin-right:6px
						vertical-align:top
						font-size:10px
						color:rgb(147,153,159)
					.avatar
						border-radius:50%
				.time
					mragin-bottom:6px
					line-height:12px
					font-size:10px
					color:rgb(147,153,159)
				.text
					line-height:16px
					font-size:12px
					color:rgb(7,17,27)
					.icon-thumb_up,.icon-thumb_down
						margin-right:4px
						line-height:16px
						font-size:12px
					.icon-thumb_up
						color:rgb(0,160,220)
					.icon-thumb_down
						color:rgb(147,153,159)
</style>			
