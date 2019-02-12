## 关于textarea-vue二三事

1. 自适应文本框 参考资料[NEIL JENKINS](https://alistapart.com/article/expanding-text-areas-made-elegant)

2. 全局自定义指令 v-particle 文本框输入粒子效果

## 食用方法
```
yarn add textarea-vue
```
```
import autoTextarea from 'textarea-vue'
Vue.use(autoTextarea)
```
```
<template lang="pug">
  div#app
    textarea-vue.auto(v-model="price" v-particle="{shape:'square',shock:false,colorful:false}")
    input(v-particle)
</template>

<script>
export default {
  name: "app",
  data: () => ({
    price: ""
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
  margin-top 20px
  outline none
  border 1px solid #DDDDDD
</style>
```

# API

## textarea-vue

#### `:ID` id
> 默认 ''

#### `:minHeight` 最小高度
> 默认 180px

#### `:fontSize` 字体大小
> 默认 16px

#### `:lineHeight` 行高
> 默认 18px

#### `:border`  边框
> 默认 true

#### `:autofocus` 聚焦
> 默认 false

#### `:disabled` 禁用
> 默认 false

#### `:placeholder` 描述
> 默认 ''

#### `:title` 展示信息
> 默认 ''

#### `v-model` 模板

## v-particle 

#### `shape` 粒子形状  'square'  'circle'
> 默认 square

#### `shock` 震动
> 默认 false

#### `colorful` 单次粒子颜色
> 默认 false

## 展示

![textarea](https://github.com/LingHanChuJian/textarea-vue/blob/master/public/textarea.gif)
