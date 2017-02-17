<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active':selectType==2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType==0}" @click="select(0, $event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType==1}" @click="select(1, $event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="switch"  :class="{'on':onlyContent}"  @click="toggleContent">
			<span class="icon-check_circle"></span><span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
	props: {
		ratings: {
			type: Array,
			default () {
				return []
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default () {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		}
	},
	methods: {
		select (type, event) {
			if (!event._constructed) {
				return
			}
			this.$emit('ratingSselect', type)
		},
		toggleContent (e) {
			if (!e._constructed) {
				return
			}
			this.$emit('ratingsOnlycont', !this.onlyContent)
		}
	},
	computed: {
		positives () {
			let positi = []
			this.ratings.forEach((rating) => {
				if (rating.rateType === POSITIVE) {
					positi.push(rating.rateType)
				}
			})
			return positi
		},
		negative () {
			let negat = []
			this.ratings.forEach((rating) => {
				if (rating.rateType === NEGATIVE) {
					negat.push(rating.rateType)
				}
			})
			return negat
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.ratingselect
	.rating-type
		font-size:0px
		padding:12px 0
		margin:0 18px
		border-1px(rgba(7,17,27,.1))
		.block
			display:inline-block
			padding:8px 12px
			font-size:12px
			margin-right:8px
			border-radius:1px
			color:rgb(77,85,93)
			line-height:16px
			.count
				font-size:8px
				margin-left:2px
			&.positive
				color:rgb(77,85,93)
				background-color:rgba(0,160,220,.2)
				&.active
					color:#fff
					background-color:rgb(0,160,220)
			&.negative
				color:rgb(77,85,93)
				background-color:rgba(77,85,93,.2)
				&.active
					color:#fff
					background-color:rgb(77,85,93)
	.switch
		padding:12px 18px
		border-bottom:1px solid rgba(7,17,27,.1)
		&.on
			.icon-check_circle
				color:#00c850
		.icon-check_circle
			font-size:24px
			color:rgb(147,153,159)
			line-height:24px
			margin-right:4px
		.text
			font-size:12px
			color:rgb(147,153,159)
			line-height:24px
			vertical-align:top
			margin-top:6px
</style>
