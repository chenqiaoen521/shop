<template>
	<div class="star" :class="starType">
		<span v-for="item in itemClasses" :class="item" class="star-item"></span>
	</div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
	props: {
		size: Number,
		score: Number
	},
	computed: {
		starType () {
			return 'star-' + this.size
		},
		itemClasses () {
			let arr = []
			let score = Math.floor(this.score * 2) / 2
			let hasDecimal = this.score % 1 !== 0
			let integer = Math.floor(score)
			for (let i = 0; i < integer; i++) {
				arr.push(CLS_ON)
			}
			if (hasDecimal) {
				arr.push(CLS_HALF)
			}
			while (arr.length < LENGTH) {
				arr.push(CLS_OFF)
			}
			return arr
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.star
	&.star-48
		.star-item
			width:20px
			height:20px
			display: inline-block
			background-repeat: no-repeat
			margin-right:22px
			background-size: 20px 20px
			$:last-child
				margin-right: 0
			&.on
				bg-image('star48_on')
			&.off
				bg-image('star48_off')
			&.half
				bg-image('star48_half')
	&.star-36
		.star-item
			width:15px
			height:15px
			display: inline-block
			background-repeat: no-repeat
			margin-right:16px
			background-size: 15px 15px
			$:last-child
				margin-right: 0
			&.on
				bg-image('star36_on')
			&.off
				bg-image('star36_off')
			&.half
				bg-image('star36_half')
	&.star-24
		.star-item
			width:10px
			height:10px
			display: inline-block
			background-repeat: no-repeat
			margin-right:3px
			background-size: 10px 10px
			$:last-child
				margin-right: 0
			&.on
				bg-image('star24_on')
			&.off
				bg-image('star24_off')
			&.half
				bg-image('star24_half')


</style>
