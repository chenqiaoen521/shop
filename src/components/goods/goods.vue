<template>
	<div>
		<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"  @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<v-icon v-if="item.type>0" class="icon" :type=item.type  :size=3></v-icon>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="foods-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon" @click.stop.prevent="selectFood(food)">
								<img width=57 height=57 :src="food.icon" :alt="food.name">
							</div>
							<div class="content">
								<h2 class="name" @click.stop.prevent="selectFood(food)">{{food.name}}</h2>
								<p v-if="food.description" class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="praise">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food" @add="addFood"></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-cart ref="shopcart" :selectFoods="selectFoods" :delivery="seller.deliveryPrice" :min="seller.minPrice"></v-cart>
		</div>
		<v-food :food="selectf" @add="addFood" ref="food"></v-food>
	</div>
</template>
<script type="text/ecmascript-6">
import icon from 'components/icon/icon'
import BScroll from 'better-scroll'
import shopcart from 'components/cart/cart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import food from 'components/food/food'
const ERR_OK = 0
export default {
	data () {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
			selectf: {}
		}
	},
	components: {
		'v-icon': icon,
		'v-cart': shopcart,
		'v-cartcontrol': cartcontrol,
		'v-food': food
	},
	props: {
		seller: {}
	},
	computed: {
		selectFoods () {
			if (this.goods.length > 0) {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if	(food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		currentIndex () {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i]
				let height2
				if (i !== this.listHeight.length - 1) {
					height2 = this.listHeight[i + 1]
				}
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i
				}
			}
			return 0
		}
	},
	mounted () {
		this.$nextTick(function () {
		console.log(this.$route.params)
			this.$http.get('/api/goods').then(res => {
				let result = res.body
				if (result.errno === ERR_OK) {
					this.goods = result.data
					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
						})
					}
				}, response => {
			})
		})
	},
	methods: {
		_initScroll () {
			if (!this.menuScroll) {
				this.menuScroll = new BScroll(this.$el.getElementsByClassName('menu-wrapper')[0], {
				click: true
				})
			} else {
				this.menuScroll.refresh()
			}
			if (!this.foodsScroll) {
				this.foodsScroll = new BScroll(this.$el.getElementsByClassName('foods-wrapper')[0], {
				probeType: 3,
				click: true
				})
			} else {
				this.foodsScroll.refresh()
			}
			this.foodsScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))
			})
		},
		_calculateHeight () {
			let height = 0
			this.listHeight.push(height)
			let foodList = this.$el.getElementsByClassName('food-list-hook')
			for (let i = 0; i < foodList.length; i++) {
				height += foodList[i].clientHeight
				this.listHeight.push(height)
			}
		},
		selectMenu (index, e) {
			if (!e._constructed) return
			let foodList = this.$el.getElementsByClassName('food-list-hook')
			let food = foodList[index]
			this.foodsScroll.scrollToElement(food, 300)
		},
		addFood (target) {
			this._drop(target)
		},
		_drop (target) {
		// 体验优化，异步执行下落动画
			this.$nextTick(() => {
				this.$refs.shopcart.drop(target)
			})
		},
		selectFood (food) {
			this.selectf = food
			this.$refs.food.show()
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.goods
	position:absolute
	display:flex
	width:100%
	top:174px
	bottom:48px
	overflow:hidden
	.menu-wrapper
		flex: 0 0 80px
		width: 80px
		background:#f3f5f7
		.menu-item
			width:56px
			line-height:54px
			padding:0 12px
			font-size:0
			height:54px
			text-align:center
			vertical-align:middle	
			border-1px(rgba(7,17,27,.1))
			&.current
				position:relative
				margin-top:-1px
				z-index:1
				background:#fff
				border-none()
				.text
					font-weight:700	
		.text
			display:inline-block
			font-size:12px
			line-height:14px
			vertical-align:middle
			.icon
				display:inline-block
				vertical-align:top
				width:12px
				height:12px
				margin-right:4px
				background-size:100%
				background-repeat:no-repeat
	.foods-wrapper
		flex:1
		.title
			padding-left:14px
			height:26px
			line-height:26px
			border-left:2px solid #d9dde1
			font-size:12px
			color:rgb(147,153,159)
			background:#f3f5f7
		.food-item
			display:flex
			margin:18px
			border-1px(rgba(7,17,27,.1))
			padding-bottom:18px
			&:last-child
				border-none()
				margin-bottom:0
			.icon
				flex:0 0 57px
				margin-right:10px
			.content
				flex:1
				.name
					margin:2px 0 8px 0
					line-height:14px
					height:14px
					font-size:14px
					color:rgb(7,17,27)
					width:240px
					white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
				.desc
					font-size:10px
					color:rgb(147,153,159)
					line-height:12px
					margin:8px 0
				.extra
					font-size:0
					color:rgb(147,153,159)
					line-height:10px
					margin:8px 0
					.count
						font-size:10px
						margin-right:12px
					.praise
						font-size:10px
				.price
					font-weight:700
					lien-height:24px
					font-size:0
					.now
						margin-right:8px
						font-size:14px
						color:rgb(240,20,20)
					.old
						text-decoration:line-through
						font-size:10px
						color:rgb(147,153,159)	
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:8px
</style>
