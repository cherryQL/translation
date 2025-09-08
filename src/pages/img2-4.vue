<template>
  <div class="img1-subpage">
    <div v-for="(item, idx) in transArr" :key="idx" class="trans-block">
      <trans :zh="item['transfour-c']" :en="item['transfour-e']" />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import zichaiji from '../assets/紫钗记.json'
import trans from '../assets/trans.vue'
const route = useRoute()
const T = route.query.jump_t || ''
const M = route.query.jump_min || ''
// 找到主目录
const book = zichaiji.find(item => item['title-C'] === T)
// transfour数组
const transArr = book && book['transfour'] ? book['transfour'] : []
</script>
<style scoped>
.img1-subpage { min-height: 300px; }
.trans-block { margin-bottom: 18px; }
</style>
