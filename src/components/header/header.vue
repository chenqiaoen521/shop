<template>
	<div class="header">
		header
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	data () {
		return {
			seller: {}
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.$http.get('/api/seller').then(response => {
				console.log(response.body)
				}, response => {
			})
		})
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
