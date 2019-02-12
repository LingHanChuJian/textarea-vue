import textarea from './textarea-vue'
import particle from './../lib/particle'

const particleVue = {
    install(Vue) {
        Vue.directive('particle', {
            bind(el, binding) {
                particle.getInstance(el, Object.assign({ shape:'square', shock:false, colorful:false }, binding.value))
            }
        })
    }
}

const textareaVue = {
    install(Vue) {
        Vue.component('textarea-vue', textarea)
        Vue.use(particleVue)
    }
}

export default textareaVue