<template lang="pug">
  div#app
    textarea-vue.auto(v-model="price" :textareaStyle="textareaStyle" :placeholder="placeholder" v-particle="{shape:'square',shock:false,colorful:false}")
    textarea-vue.auto(v-model="price2" :textareaStyle="textareaStyle" :placeholder="placeholder" v-particle="{shape:'square',shock:false,colorful:false}")
    input(v-particle)
</template>

<script>
export default {
  name: "app",
  data: () => ({
    price: "",
    price2: "",
    placeholder: '在雪域中遇见自己...',
    textareaStyle: {
      background: 'url(bg.png) right center / contain no-repeat'
    }
  }),
  methods: {},
  components: {}
};
</script>

<style lang="stylus">
#app
  margin 10px auto
  max-width 800px
  height auto

.auto
  margin-top 80px

input
  margin-top 100px
  outline none
  border 1px solid #DDDDDD
</style>
