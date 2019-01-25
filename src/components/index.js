import textarea from './textarea-vue'
import particle from './../lib/particle'

const textareaVue = {
    install(Vue) {
        Vue.component('textarea-vue', textarea)

        Vue.directive('particle', {
            bind(el, binding) {
                let param = {}
                if (binding.hasOwnProperty('value'))
                    param = binding.value
                particle.getInstance(el, param.shape, param.shock, param.colorful)
            }
        })
    }
}

export default textareaVue