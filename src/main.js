import Vue from 'vue'
import App from './App.vue'

import autoTextarea from '@/components/index'

Vue.config.productionTip = false

Vue.use(autoTextarea)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
