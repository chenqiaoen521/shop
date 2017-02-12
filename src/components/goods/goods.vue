<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						<v-icon v-if="item.type>0" class="icon" :type=item.type  :size=3></v-icon>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="foods-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width=57 height=57 :src="food.icon" alt="food.name">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p v-if="food.description" class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="praise">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import icon from 'components/icon/icon'
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
	data () {
		return {
			goods: {}
		}
	},
	components: {
		'v-icon': icon
	},
	props: {
		seller: Object
	},
	mounted: function () {
		this.$nextTick(function () {
			this.$http.get('/api/goods').then(res => {
				let result = res.body
				if (result.errno === ERR_OK) {
					this.goods = result.data
					this.$nextTick(() => {
						this._initScroll()
					})
					}
				}, response => {
			})
		})
	},
	methods: {
		_initScroll () {
			//console.log(this.$el.children[0])
			this.menuScroll = new BScroll(this.$el.children[0], {})
			this.foodsScroll = new BScroll(this.$el.children[1], {})
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
	bottom:46px
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
</style>
