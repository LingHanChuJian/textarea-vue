import Vue from 'vue'
import textarea from './textarea-vue'
import particle from './../lib/particle'

const textarea_vue = {
    install(Vue) {
        Vue.component('textarea-vue', textarea)
    }
}

Vue.directive('particle', {
    bind(el, binding) {
        let param = {}
        if (binding.hasOwnProperty('value'))
            param = binding.value
        window.particle = particle.getInstance(el, param.shape, param.shock, param.colorful)
    }
})

export default textarea_vue