<template>
  <div class="img1-subpage">
    <div v-for="(item, idx) in twoPArr" :key="idx" class="two-p-block">
      <div><b>{{ item['book-C'] }}</b></div>
      <div><b>{{ item['book-E'] }}</b></div>
      <div v-for="(d, i) in item['T-two-D']" :key="i" class="t-two-d">
        <trans :zh="d['two-dc']" :en="d['two-de']" />
      </div>
      <br />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import handanji from '../assets/邯郸记.json'
import trans from '../assets/trans.vue'
const route = useRoute()
const T = route.query.jump_t || ''
const M = route.query.jump_min || ''
// 找到主目录
const book = handanji.find(item => item['title-C'] === T)
// two-P数组
const twoPArr = book && book['two-P'] ? book['two-P'] : []
</script>
<style scoped>
.img1-subpage { min-height: 300px; }
.two-p-block { margin-bottom: 18px; }
.t-two-d { margin-left: 1em; }
b { font-weight: bold; }
</style>
