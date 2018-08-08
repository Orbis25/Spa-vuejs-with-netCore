// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Element from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import store from './store/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import "crypto-js"
import "chart.js"
import "hchs-vue-charts"
Vue.use(window.VueCharts)
Vue.use(iView)

// configure language
locale.use(lang)

Vue.use(Element)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
