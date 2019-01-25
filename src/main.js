import Vue from 'vue'
import App from './App.vue'

import textareaVue from '@/components/index'

Vue.config.productionTip = false

Vue.use(textareaVue)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
