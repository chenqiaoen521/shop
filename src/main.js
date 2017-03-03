// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import 'common/stylus/index.styl'
import { sync } from 'vuex-router-sync'

sync(store, router)
Vue.use(VueResource)
/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
