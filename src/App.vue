<template>
	<div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import router from './router'
export default {
	created () {
		router.push({name: 'home'})
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
