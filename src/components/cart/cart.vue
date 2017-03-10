<template>
	<div>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" @click.stop="toggleList">
					<div class="logo" :class="{'high-light':totalCount>0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div v-show="totalCount>0" class="num">{{totalCount}}</div>
				</div>
				<div class="price">{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{delivery}}元</div>
			</div>
			<div class="content-right" :class="{'enough':enough}" @click.stop="pay">
				{{payDesc}}
			</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls">
				<transition name="drop" 
							v-on:before-enter="beforeDrop"  
							v-on:enter="dropping" 
							v-on:after-enter="afterDrop">
					<div v-show="ball.show" class="ball">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fold-transition">
			<div class="shopcart-list" v-show="fold">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click.stop.prevent="empty">清空</span>
				</div>
				<div class="list-content">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">￥{{food.price * food.count}}</div>
							<div class="cartcontrol-warpper">
								<v-cartcontrol :food="food"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
	<transition name="mask-transition">
	<div class="list-mask" v-show="fold"></div>
	</transition>

	<v-order ref="order" :selectFoods="selectFoods" :deliveryPrice="delivery" :totalPrice="totalPrice"></v-order>
	</div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol'
import order from 'components/order/order'
import BScroll from 'better-scroll'
export default {
	data () {
		return {
			enough: false,
			fold: false,
			balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
			],
			dropBalls: []
		}
	},
	components: {
		'v-cartcontrol': cartcontrol,
		'v-order': order
	},
	props: {
		delivery: {
			type: Number,
			default: 0
		},
		min: {
			type: Number,
			default: 0
		},
		selectFoods: {
			type: Array,
			default () {
				return []
			}
		}
	},
	computed: {
		totalPrice () {
			let total = 0
			this.selectFoods.forEach((food) => {
				total += food.price * food.count
					})
					return total
		},
		totalCount () {
			let count = 0
			this.selectFoods.forEach((food) => {
				count += food.count
				})
			return count
		},
		payDesc () {
			if (this.totalPrice === 0) {
				this.enough = false
				return `￥${this.min}元起送`
			} else if (this.totalPrice < this.min) {
				this.enough = false
				return `还差￥${this.min - this.totalPrice}元起送`
			} else {
				this.enough = true
				return '去结算'
			}
		}
	},
	methods: {
		drop (el) {
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i]
				if (!ball.show) {
					ball.show = true
					ball.el = el
					this.dropBalls.push(ball)
					return
				}
			}
		},
		beforeDrop (el) {
			let count = this.balls.length
			while (count--) {
				let ball = this.balls[count]
				if (ball.show) {
					let rect = ball.el.getBoundingClientRect()
					let x = rect.left - 32
					let y = -(window.innerHeight - rect.top - 22)
					el.style.display = ''
					el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
					el.style.transform = `translate3d(0, ${y}px, 0)`
					let inner = el.getElementsByClassName('inner-hook')[0]
					inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
					inner.style.transform = `translate3d(${x}px, 0, 0)`
				}
			}
		},
		dropping (el, done) {
			/* eslint-disable no-unused-vars */
			let rf = el.offsetHeight
			this.$nextTick(() => {
				el.style.webkitTransform = 'translate3d(0,0,0)'
				el.style.transform = 'translate3d(0,0,0)'
				let inner = el.getElementsByClassName('inner-hook')[0]
				inner.style.webkitTransform = 'translate3d(0,0,0)'
				inner.style.transform = 'translate3d(0,0,0)'
				el.addEventListener('transitionend', done)
			})
		},
		afterDrop (el) {
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
		},
		toggleList () {
			if (!this.totalCount) {
				this.fold = false
				return
			}
			if (this.totalCount > 0) {
				this.fold = !this.fold
			}
			if (this.fold) {
				this.$nextTick(() => {
					let dom = this.$el.getElementsByClassName('list-content')[0]
					if (!this.foldcroll) {
						this.foldcroll = new BScroll(dom, {
						click: true
						})
					}
				})
			}
		},
		empty () {
			this.selectFoods.forEach((food) => {
				food.count = 0
			})
			this.fold = false
		},
		pay () {
			if (this.enough) {
				this.$refs.order.show()
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.shopcart
	position:fixed
	width:100%
	bottom:0
	left:0
	height:48px
	z-index:1
	.ball-container
		.ball
			position:fixed
			left:32px
			bottom:22px
			z-index:200
			transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
			.inner
				width:16px
				height:16px
				border-radius:50%
				background-color:rgb(0,160,220)
				transition: all 0.4s linear
	.content
		display:flex
		background-color:#141d27
		.content-left
			flex:1
			font-size:0
			.logo-wrapper
				display:inline-block
				position:relative
				top:-10px
				margin:0 12px
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				vertical-align:top
				border-radius: 50%
				background-color:#141d27
				.logo
					width:100%
					height:100%
					border-radius: 50%
					background-color:#2b343c
					text-align:center
					&.high-light
						background-color:rgb(0,160,220)
						.icon-shopping_cart
							color:#fff
					.icon-shopping_cart
						font-size:24px
						color:#80858a
						line-height:44px
				.num
					position:absolute
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					top:0
					right:0
					background:rgb(240,20,20)
					box-shadow: 0,4px 8px 0 rgba(0,0,0,.4)
			.price
				display:inline-block
				vertical-align:top
				line-height:24px
				margin-top:12px
				box-sizing:border-box
				color:rgba(255,255,255,.4)
				padding-right:12px
				border-right:1px solid rgba(255,255,255,.1)
				font-size:16px
				font-weight:700
			.desc
				display:inline-block
				line-height:24px
				vertical-align:top
				margin:12px 0 0 12px
				font-size:10px
				color:rgba(255,255,255,.4)
		.content-right
			flex: 0 0 105px
			width:105px
			font-size:12px
			line-height:48px
			font-weight:700
			color:rgba(255,255,255,.4)
			box-sizing:border-box
			padding:0 8px
			text-align:center
			&.enough
				background: #00b43c
				color: #fff
	.shopcart-list
		background-color:#f3f5f7
		position:absolute
		top:0
		width:100%
		left:0
		line-height:0
		z-index:-1
		transform: translate3d(0,-100%,0)
		&.fold-transition-enter-active, &.fold-transition-leave-active
			transition: all 0.5s
		&.fold-transition-enter, &.fold-transition-leave-active
			transform:translate3d(0,0,0)
		.list-header
			height:40px
			font-size:0
			border-1px(rgba(7,17,27,.1))
			padding:0 18px
			box-sizing:border-box
			.title
				display:inline-block
				font-size:14px
				color:rgb(7,17,27)
				line-height:40px
				float:left
			.empty
				display:inline-block
				float:right
				font-size:12px
				color:#00a0dc
				line-height:40px
		.list-content	
			max-height:217px
			overflow:hidden
			.food
				position:relative
				box-sizing:border-box
				padding:0 18px
				.name
					line-height:48px
					font-size:14px
					color:rgb(7,17,27)
				.price
					position:absolute
					font-size:10px
					line-height:48px
					font-weight:700
					color:rgb(240,20,20)
					right:90px
					top:0
				.cartcontrol-warpper
					position:absolute
					right:0
					bottom:8px
.list-mask
	position:fixed
	top:0
	left:0
	width:100%
	height:100%
	filter:blur(10px)
	background-color:rgba(7,17,27,.8)
	&.mask-transition-enter-active, &.mask-transition-leave-active
		transition: all 0.5s
	&.mask-transition-enter, &.mask-transition-leave-active
		opacity:0	
</style>
