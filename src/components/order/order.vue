<template>
<transition name="orderMask">
	<div v-show="showFlag" class="order">
		<!--ftop开始-->
		<div class="ftop"> <a class="back" @click="showFlag=false"><img src="./icon_015.png"></a>
		  <h2>确认订单</h2>
		  <a class="comea">&nbsp;</a>
		  <div style="clear: both;"></div>
		</div>
		<!--ftop开始--> 
		<div class="address">
		  <div>
		    <h2><span>收货人: 王名扬</span><i>13201562356</i></h2>
		    <p>收货地址：河南省郑州市金水区中州大道与商都路交叉口建业五栋大楼</p>
		  </div>
		</div>
		<div class="goods_list">
		   <h2>商品清单</h2>
		   <ul>
		      <li><a href="product_xq.html"><img src="./img_07.jpg">
		          <div><p>型订书机-办公设备-订书机型订书机-办公设备-订书机</p><span>规格：普通</span>
		          <h3><span>¥90.00</span><i>x1</i></h3></div>
		      </a></li>
		      <li><a href="product_xq.html"><img src="./img_09.jpg">
		          <div><p>型订书机-办公设备-订书机型订书机-办公设备-订书机</p><span>规格：普通</span>
		          <h3><span>¥90.00</span><i>x1</i></h3></div>
		      </a></li>
		   </ul>
		</div>
		<div class="delivery">
		 <span>配送费</span><p>免邮费/快递费<i>￥15</i></p>
		</div>
		<div class="message">
		  <textarea rows="2" placeholder="您对订单有什么特殊说明，可以在此备注"></textarea>
		</div>
		<p class="sunm">共<i>2</i>件商品，合计：<i>￥285</i>(含快递费)</p>
		<div class="amount">
			<a href="pay_order.html">提交订单</a>
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
	methods: {
		show () {
			this.showFlag = !this.showFlag
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.order
	position: fixed
	top:0
	left:0
	right:0
	bottom:0
	background:#f5f5f5
	transform:translate3d(0,0,0)
	z-index:2
	&.orderMask-enter-active, &.orderMask-leave-active
		transition: all 0.5s ease-in-out
	&.orderMask-enter, &.orderMask-leave-active
		transform:translate3d(100%,0,0)
.ftop
	position:relative
	height:46px
	line-height:40px
	background-color:#258ec7
	padding 3px 10px
	width:100%
	.back
		display:block
		position:absolute
		left:10px
		top:4px
		img
			display:block
			width:15px
			height:24px
			margin:8px 5px
	h2
		font-size:18px
		line-height:40px
		color:#fff
		text-align:center
		width:100%
		float:left
	.comea
		color:#fff
		display:block
		text-align:right
		font-size:15px
		height:40px
		line-height:40px
		position:absolute
		right:10px
		top:3px
		&.fs 
			font-size:13px

.scan
	overflow:hidden
	position:absolute
	left:15px
	top:6px
	img 
		float:left
	i
		float:left
		margin-left:8px
		margin-top:7px
		font-size:14px
		color:#fff
/***ftop结束***/
.foot_icon 
	padding:0px 15px
	padding-top:10px
	.swiper-slide 
		overflow:hidden
		width:58% !important
		img 
			float:left
			margin-top:2px
		span 
			margin-left:10px
			padding-right:15px
			line-height:22px
			border-right:1px solid #c5c5c5
			float:left
			margin-right:15px
			font-size:12px
			color:#258ec7
			i 
				display:block
				font-size:16px
				color:#258ec7
@media only screen and (max-device-width:360px) 
	.foot_icon .swiper-slide
		overflow:hidden
		width:65% !important
	.address 
		background-image:url(./dengfukuan_07.png)
		background-repeat:no-repeat
		background-position:15px center
		background-color:#fff
		padding:10px 15px
		margin-top:10px
		padding-left:45px
		background-size:26px auto
.address
	line-height:18px;
	background-image:url(./dengfukuan_07.png)
	background-repeat:no-repeat
	background-position:15px center
	background-color:#fff
	padding:10px 15px
	margin-top:10px
	padding-left:45px
	background-size:26px auto
	h2 
		overflow:hidden
		font-size:16px
	span 
		float:left
	i 
		float:right
	p 
		color:#999999
		font-size:14px
		margin-top:5px
	& > div 
		padding-right:25px
		background-image:url(./icon_025.png)
		background-repeat:no-repeat
		background-position:right center
		background-size:12px auto
.goods_list 
	margin-top:10px
	line-height:22px;
	& > h2 
		background-color:#fff
		padding:10px 15px
		font-size:16px
	ul 
		background-color:#fff
		li 
			position:relative
			border-top:1px solid #d9d9d9
			padding:15px
			min-height:110px
			padding-left:110px
			a 
				img 
					position:absolute
					display:block
					left:15px
					top:15px
					width:80px
					height:80px
					overflow:hidden
					border-radius:3px
					border:1px solid #e5e5e5
			div 
				p 
					font-size:15px
					color:#000
				& > span 
					color:#999999
					font-size:14px
					margin:2px 0
					display:block
				h3 
					overflow:hidden
					span 
						float:left
						color:#f72a3b
						font-size:16px
					i 
						float:right
						font-size:14px
						color:#999999
.delivery 
	background-color:#fff
	overflow:hidden
	margin-top:10px
	line-height:26px
	border-top:1px solid #d9d9d9
	padding:10px 15px
	background-color:#fff
	overflow:hidden
	margin-top:10px
	line-height:26px
	border-top:1px solid #d9d9d9
	padding:10px 15px
	span 
		float:left
		font-size:16px
		float:left
		font-size:16px
	p 
		float:right
		color:#999999
		font-size:15px
		float:right
		color:#999999
		font-size:15px
		i 
			color:#f72a3b
			color:#f72a3b
.message 
	background-color:#fbfbfb
	border-top:1px solid #d9d9d9
	padding:10px 15px
	span 
		display:block
	textarea 
		display:block
		width:100%
		border:0px
		padding:5px 0
		outline:none
		background-color:#fbfbfb
		resize:none
.sunm 
	text-align:right
	padding:10px 15px
	line-height:26px
	font-size:15px
	background-color:#fff
	border-top:1px solid #e5e5e5
	border-bottom:1px solid #e5e5e5
	color:#999999
	margin-bottom:40px
	i 
		color:#f72a3b
.amount 
	height:45px
	background-color:#fff
	position:fixed
	left:0px
	bottom:0px
	width:100%
	a 
		height:45px
		background-color:#258ec7
		color:#fff
		font-size:16px
		line-height:45px
		text-align:center
		display:block


</style>
