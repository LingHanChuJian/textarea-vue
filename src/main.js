import Vue from 'vue'
import App from './App.vue'

import textarea_vue from '@/components/index'

Vue.config.productionTip = false

Vue.use(textarea_vue)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
