<template lang="pug">
  div.auto-textarea-div(:style="{ minHeight }")
    pre.auto-textarea-pre(:style="getTextareaStyle()")
      span {{ value }}
      br 
    textarea.auto-textarea-vue(:id="ID" :value="value" :style="getTextareaStyle()" :autofocus="autofocus" :disabled="disabled" :title="title" v-on="textareaListeners")
    label.auto-textarea-label(:style="getLabelStyle()") {{ placeholder }}
</template>

<script>
export default {
  name: 'textarea-vue',
  props: {
    ID: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    focusBorderColor: {
      type: String,
      default: '#29d'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textareaStyle: {
      type: Object,
      default: () => { return {} }
    },
    border: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: String,
      default: '180px'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods:{
    getTextareaStyle() {
      return Object.assign({ fontSize:'16px', lineHeight:'18px' ,'no-border': !this.border}, this.textareaStyle)
    },
    getTextareaPropertyStyle(el, property) {
      const style = getComputedStyle(el)[property]
      return style ? style : ''
    },
    getLabelStyle() {
      const curTextareaStyle = this.getTextareaStyle()
      const padding = curTextareaStyle.hasOwnProperty('padding') ? curTextareaStyle['padding'] : '20px'
      return { padding }
    },
    placeholderEffect(vm, e, name) {
      const textareaEl = e.target
      const textareaLabel = textareaEl.nextElementSibling
      const curTextareaStyle = vm.getTextareaStyle()
      const paddingTop = Number(vm.getTextareaPropertyStyle(textareaEl, 'paddingTop').replace('px', ''))
      const paddingLeft = Number(vm.getTextareaPropertyStyle(textareaEl, 'paddingLeft').replace('px', ''))
      textareaLabel.style.borderRadius = '3px'
      textareaLabel.style.padding = name === 'blur' && !e.target.value ? '0' : '0 2px'
      textareaLabel.style.color = name === 'blur' && !e.target.value ? '#535a63' : '#FFFFFF'
      textareaLabel.style.top = name === 'blur' && !e.target.value ? `${paddingTop}px` : '-8px'
      textareaLabel.style.transform = name === 'blur' && !e.target.value ? 'scale(1)' : 'scale(.85)'
      textareaLabel.style.backgroundColor = name === 'blur' && !e.target.value ? 'transparent': vm.focusBorderColor
      textareaLabel.style.left = name === 'blur' && !e.target.value ? `${paddingLeft}px`: `${Math.floor(paddingLeft * .85) - 4}px`
      textareaEl.style.borderColor = name ==='blur' ? (curTextareaStyle.hasOwnProperty('borderColor') ? curTextareaStyle['borderColor'] : '#DDDDDD') : vm.focusBorderColor
    }
  },
  computed: {
    textareaListeners() {
      const vm = this
      return Object.assign({}, vm.$listeners, {
          input(event) {
              vm.$emit('input', event.target.value, event)
          },
          blur(event) {
              vm.placeholderEffect(vm, event, 'blur')
              vm.$emit('blur', event.target.value, event)
          },
          focus(event) {
              vm.placeholderEffect(vm, event, 'focus')
              vm.$emit('focus', event)
          }
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.auto-textarea-div
  position relative

.auto-textarea-vue, .auto-textarea-pre
  border-radius 5px
  font inherit
  border 1px solid #DDDDDD
  padding 20px
  outline none
  white-space pre-wrap
  word-wrap break-word
  &:focus
    border 1px solid #DDDDDD
    transition border-color .25s

.auto-textarea-vue
  top 0
  left 0
  width 100%
  height 100%
  resize none
  position absolute
  overflow hidden
  &::placeholder
    opacity 1
    font-size 14px
    color #535a63

.auto-textarea-label
  position absolute
  font-size 14px
  color #535a63
  top 0
  transition all .25s

.auto-textarea-pre
  visibility hidden

.no-border
  border none

</style>
