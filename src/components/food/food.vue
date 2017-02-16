<template>
	<transition name="foodMask">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="food.name">	
					<div class="wrap-back" @click="showFlag=flag">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-if="food.oldPrice">{{food.oldPrice}}</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
export default {
	data () {
		return {
			showFlag: false
		}
	},
	props: {
		food: {}
	},
	methods: {
		show () {
			this.showFlag = !this.showFlag
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.food
	position:fixed
	left:0
	top:0
	bottom:0
	background:#fff
	right:0
	transform: translate3d(0,0,0)
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
		.title
			padding:18px 18px 8px
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
			line-height:14px
		.detail
			font-size:0
			padding:0 18px 18px
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
</style>
