<template>
  <div>
	<v-header :seller="seller"></v-header>
    <div class="tab border-1px">
    	<div class="tab-item">
			<router-link :to="{ name:'goods', params: { id: 1 }}">商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link :to="{ name:'ratings'}">评论</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link :to="{ name:'seller'}">商家</router-link>
    	</div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from 'components/header/header'
import router from '../../router'
//import {urlParse} from 'common/js/util'
var util = require('common/js/util')
const ERR_OK = 0
export default {
	data () {
		return {
			seller: {
				id: (() => {
				let queryParam = util.urlParse()
				return queryParam.id
				})()
			}
		}
	},
	components: {
		'v-header': header
	},
	created () {
		this.$http.get('/api/seller?id=' + this.seller.id).then(res => {
			let result = res.body
			if (result.errno === ERR_OK) {
				this.seller = Object.assign({}, this.seller, result.data)
				router.push({name: 'goods', params: {id: 1}})
				}
			}, response => {
		})
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.tab
	display:flex
	width:100%
	height:40px
	line-height:40px
	border-1px(rgba(7,17,27,.1))
	.tab-item
		flex:1
		text-align:center
		& > a
			display:block
			font-size:14px
			color:rgba(77,85,93,1)
			&.active
				color:rgb(240,20,20)
</style>
