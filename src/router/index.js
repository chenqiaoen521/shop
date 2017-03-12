import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import Home from 'components/home/home'
import Center from 'components/center/center'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/center',
      name: 'center',
      component: Center,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: 'seller',
          name: 'seller',
          component: Seller
        }
      ]
    }/*,
    {
      path: '/goods/:id',
      name: 'goods',
      component: {
        shangjia: Goods
      }
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: {
        shangjia: Ratings
      }
    },
    {
      path: '/seller',
      name: 'seller',
      component: {
        shangjia: Seller
      }
    }*/
  ],
	linkActiveClass: 'active'
})
