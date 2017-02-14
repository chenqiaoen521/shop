<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'high-light':totalCount>0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div v-show="totalCount>0" class="num">{{totalCount}}</div>
				</div>
				<div class="price">{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{delivery}}元</div>
			</div>
			<div class="content-right" :class="{'enough':enough}">
				{{payDesc}}
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	data () {
		return {
			enough: false
		}
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
			let total = 1
			this.selectFoods.forEach((food) => {
				total += food.price * food.count
					})
					return total
		},
		totalCount () {
			return 10
		},
		payDesc () {
			if (this.totalPrice === 0) {
				return `￥${this.min}元起送`
			} else if (this.totalPrice < this.min) {
				return `还差￥${this.min - this.totalPrice}元起送`
			} else {
				this.enough = true
				return '去结算'
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.shopcart
	position:fixed
	width:100%
	bottom:0
	left:0
	height:48px
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
</style>
