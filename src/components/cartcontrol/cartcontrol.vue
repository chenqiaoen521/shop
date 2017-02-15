<template>
	<div class="cartcontrol">
		<transition name="move-transition">
		<div class="cart-decrease icon-remove_circle_outline" v-if="food.count>0" @click="reduce($event)"></div>
		</transition>
		<div class="cart-count" v-if="food.count && food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="add($event)"></div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		food: {}
	},
	methods: {
		add (e) {
			if (!e._constructed) return
			if (typeof this.food.count === 'undefined') {
				this.$set(this.food, 'count', 0)
			}
			if (!this.food.count) {
				this.food.count = 1
			} else {
				this.food.count ++
			}
			this.$emit('add', e.target)
		},
		reduce (e) {
			if (!e._constructed) return
			if (this.food.count > 0) {
				this.food.count --
			} else {
				this.food.count = 0
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol
	font-size:0
	.cart-decrease
		display:inline-block
		padding:4px
		font-size:24px
		color:rgb(0,160,220)
	.cart-count
		font-size:10px
		line-height:24px
		color:rgb(147,153,159)
		display:inline-block
		vertical-align:top
		padding-top:6px
		text-align:center
	.cart-add
		display:inline-block
		padding:4px
		font-size:24px
		color:rgb(0,160,220)
.move-transition-enter-active 
	transition: all .3s linear
.move-transition-leave-active
	transition: all .3s linear
.move-transition-enter,.move-transition-leave-active
	transform: translate3d(24px,0,0) rotate(180deg)
	opacity: 0
</style>
