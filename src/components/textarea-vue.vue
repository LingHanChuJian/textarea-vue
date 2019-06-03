<template lang="pug">
  div.auto-textarea-div(:style="{ minHeight }")
    pre.auto-textarea-pre(:style="getTextareaStyle()")
      span {{ value }}
      br 
    textarea.auto-textarea-vue(:id="ID" :value="value" :style="getTextareaStyle()" :placeholder="placeholder" :autofocus="autofocus" :disabled="disabled" :title="title" :class="{'no-border': !border}" v-on="textareaListeners")
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
      return Object.assign({ fontSize:'16px', lineHeight:'18px' }, this.textareaStyle)
    }
  },
  computed: {
    textareaListeners() {
      let vm = this
      return Object.assign({}, this.$listeners, {
          input(event) {
              vm.$emit('input', event.target.value, event)
          },
          blur(event) {
              vm.$emit('blur', event.target.value, event)
          },
          focus(event) {
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
  padding 8px
  outline none
  white-space pre-wrap
  word-wrap break-word
  &:focus
    border 1px solid #DDDDDD

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

.auto-textarea-pre
  visibility hidden

.no-border
  border none

</style>
