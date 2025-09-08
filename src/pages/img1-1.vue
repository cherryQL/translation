<template>
  <div class="img1-subpage">
    <div v-for="(item, idx) in onePArr" :key="idx" class="one-p-block">
      <div><b>{{ item['one-P-C'] }}</b></div>
      <div><b>{{ item['one-P-E'] }}</b></div>
      <div v-for="(d, i) in item['T-one-D']" :key="i" class="t-one-d">
        <trans :zh="d['T-one-dc']" :en="d['T-one-de']" />
      </div>
      <br />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import mudanting from '../assets/牡丹亭.json'
import trans from '../assets/trans.vue'
const route = useRoute()
const T = route.query.jump_t || ''
const M = route.query.jump_min || ''
// 找到主目录
const book = mudanting.find(item => item['title-C'] === T)
// one-P数组
const onePArr = book && book['one-P'] ? book['one-P'] : []
 </script>
<style scoped>

.img1-subpage { min-height: 300px; }
.one-p-block { margin-bottom: 18px; }
.t-one-d { margin-left: 1em; }
b { font-weight: bold; }
</style>
