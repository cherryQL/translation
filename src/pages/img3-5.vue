<template>
  <div class="img1-subpage">
    <trans :zh="conclusionC" :en="conclusionE" />
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
const conclusionC = book && book['conclusion_c'] ? book['conclusion_c'] : ''
const conclusionE = book && book['conclusion_e'] ? book['conclusion_e'] : ''
</script>
<style scoped>
.img1-subpage { min-height: 300px; }
</style>
