

<template>
  <div class="img1-layout">
    <div class="img-page">
      <img src="../assets/图片1.png" alt="img1" style="max-width:80%;margin:32px auto;display:block;" />
      <h2 style="text-align:center;">
        <button @click="goBack">返回</button>
      </h2>
    </div>
    <div class="img-art">
      <div class="main-title">{{ mainTitle }}</div>
      <ul class="sub-list">
        <li v-for="(item, idx) in subDirs" :key="idx">
          <a @click="goToSub(idx)">{{ item }}</a>
        </li>
      </ul>
      <div class="paginator">
        <button :disabled="pageIdx===0" @click="prevPage">上一页</button>
        <span>第{{ pageIdx+1 }}页 / 共{{ totalPages }}页</span>
        <button :disabled="pageIdx===totalPages-1" @click="nextPage">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import mudanting from '../assets/牡丹亭.json'
const router = useRouter()
function goBack() { router.push('/') }


// 解析主目录和小目录
const mainList = mudanting.map(item => item['title-C'])
const subList = mudanting.map(item => [
  item['one-P']?.[0]?.['one-P-C'] || 'one-P',
  item['two-C'] || 'two-C',
  item['three-C'] || 'three-C',
  item['four-C'] || 'four-C',
  '总结'
])
const pageIdx = ref(0)
const totalPages = mainList.length
const mainTitle = computed(() => mainList[pageIdx.value])
const subDirs = computed(() => subList[pageIdx.value])
function prevPage() { if(pageIdx.value>0) pageIdx.value-- }
function nextPage() { if(pageIdx.value<totalPages-1) pageIdx.value++ }
function goToSub(idx) {
  const jump_t = mainTitle.value
  const jump_min = subDirs.value[idx]
  router.push({
    path: `/img1-${idx+1}`,
    query: { jump_t, jump_min }
  })
}
</script>

<style scoped>
.img1-layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  min-height: 100vh;
}
.img-page {
  width: 45vw;
  min-width: 320px;
  background: #fff;
  border-radius: 12px;
  margin: 32px 0 32px 32px;
  box-shadow: 0 2px 8px rgba(30,30,30,0.09);
  padding: 24px 0;
}
.img-art {
  width: 45vw;
  min-width: 320px;
  background: #f7f7f7;
  border-radius: 12px;
  margin: 32px 32px 32px 0;
  box-shadow: 0 2px 8px rgba(30,30,30,0.09);
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 18px;
}
.sub-list {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  width: 80%;
}
.sub-list li {
  margin: 10px 0;
  text-align: left;
}
.sub-list a {
  color: #1a73e8;
  cursor: pointer;
  text-decoration: underline;
}
.paginator {
  margin-top: 24px;
  display: flex;
  gap: 18px;
  align-items: center;
}
.paginator button {
  padding: 4px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
.paginator button:disabled {
  color: #aaa;
  border-color: #eee;
  cursor: not-allowed;
}
</style>
