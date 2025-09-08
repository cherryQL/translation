<template>
  <div class="container">
    
    <!-- 顶部轮播图区域 -->
    <section class="carousel-section">
      <div class="carousel">
        <div class="carousel-slide">
          <img :src="images[current]" :alt="`轮播图${current+1}`" />
        </div>
        <div class="carousel-desc">
          <div class="desc-text">
            <span v-for="line in descriptions[current].split('\\n')" :key="line">
              <span v-if="/^《.*》/.test(line)" class="desc-cn">{{ line }}</span>
              <span v-else class="desc-en">{{ line }}</span>
              <br />
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 轮播图下方复选按钮 -->
    <div class="carousel-checkbox-group">
      <label
        v-for="(label, idx) in labels"
        :key="idx"
        :class="['carousel-checkbox-label', { active: current === idx }]"
        @mouseenter="onIndicatorEnter(idx)"
        @mouseleave="onIndicatorLeave"
      >
        <input
          type="checkbox"
          :checked="current === idx"
          class="carousel-checkbox"
          tabindex="-1"
          readonly
        />
        <span class="carousel-checkbox-text">{{ label }}</span>
        <span v-if="current === idx" class="carousel-checkbox-underline"></span>
      </label>
    </div>

    <!-- 筛选标签+搜索框区域 -->
    <section class="filter-bar">
      <div class="search-box">
        <input
          type="text"
          placeholder="请输入要查找的内容"
          v-model="searchText"
          @input="onInput"
          @focus="onFocusInput"
          @blur="showSuggestions = false"
          @keydown.escape="showSuggestions = false"
        />
        <button class="search-btn" @click="onSearch">获得译文</button>

        <!-- 下拉建议 -->
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
          <li v-for="(item, idx) in filteredSuggestions" :key="idx" @mousedown.prevent="selectSuggestion(item)">
            <div class="s-zh">{{ item.zh }}</div>
          </li>
        </ul>
      </div>
    </section>
    
    <!-- 新增区域和热门图片区同属一个块级流父容器，保证新增区域撑开时热门图片在下方 -->
    <div class="search-hot-wrapper">
      <div
        v-show="showSuggestions"
        class="search-extra-area"
        :style="{ height: extraAreaHeight }"
      ></div>
      <div
        v-if="showTranslation"
        class="search-translation-area"
      >
        <div v-if="translationResult">
          <div class="translation-zh">{{ translationResult.zh }}</div>
          <div class="translation-en">{{ translationResult.en }}</div>
        </div>
      </div>
      <section class="hot-images">
        <div
          v-for="(img, idx) in hotImages"
          :key="idx"
          class="hot-card"
          @click="goToImagePage(img.alt)"
          style="cursor:pointer;"
        >
          <img :src="img.src" :alt="img.alt" style="max-width:90%;max-height:80%;display:block;margin:0 auto;" />
          <div style="margin-top:8px;"></div>
        </div>
      </section>
      <div class="footer">
        
      </div>
    </div>
  </div>
  <footer class="site-footer" style="text-align:center;margin:32px 0 12px 0;color:#888;font-size:15px;">
    <span id="busuanzi_container_site_pv">
      本站浏览量：<span id="busuanzi_value_site_pv"></span>
    </span>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const descriptions = [
  '《牡丹亭》：讲述杜丽娘因梦生情、死而复生的爱情故事，歌颂真挚情感对礼教的突破。\n\nThe Peony Pavilion (Mudan Ting): Tells the love story of Du Liniang, who falls in love through a dream and revives after death. It celebrates how genuine emotion can transcend rigid Confucian social conventions.',
  '《紫钗记》：改编自唐代传奇，围绕李益与霍小玉的爱情展开，展现爱情与权力的冲突。\n\nThe Purple Hairpin (Zichai Ji): Adapted from a Tang Dynasty tale, it revolves around the love between scholar Li Yi and courtesan Huo Xiaoyu, exploring the conflict between love and power.',
  '《邯郸记》：以卢生在邯郸客栈的黄粱一梦为线索，讽刺官场的功名利禄与虚妄。\n\nThe Handan Dream (Handan Ji): Centered around scholar Lu Sheng\'s "Yellow Millet Dream" at an inn in Handan, it satirizes the vanity of pursuing official ranks, riches, and fame.',
  '《南柯记》：取材于“南柯一梦”典故，借淳于棼的梦境，探讨人生的虚幻与世事无常。\n\nThe Nanke Dream (Nanke Ji): Based on the fable "The Dream of the Southern Bough," it uses the dream journey of Chunyu Fen to contemplate the illusory nature of life and worldly affairs.'
]
const labels = [
  '牡丹亭',
  '紫钗记',
  '邯郸记',
  '南柯记'
]
import img1 from '../assets/图片1.png'
import img2 from '../assets/图片2.png'
import img3 from '../assets/图片3.png'
import img4 from '../assets/图片4.png'

const images = [img1, img2, img3, img4]
const hotImages = [
  { src: img1, alt: 'img1' },
  { src: img2, alt: 'img2' },
  { src: img3, alt: 'img3' },
  { src: img4, alt: 'img4' }
]

import { useRouter } from 'vue-router'
const router = useRouter()
function goToImagePage(alt) {
  router.push({ path: `/${alt}` })
}
const current = ref(0)
const timer = ref(null)
const isHovering = ref(false)
const hoverIndex = ref(null)

import translations from '../assets/翻译.json'
const entries = ref(translations.map(item => ({ zh: item.C, en: item.E })))

// 搜索相关
const searchText = ref('')
const showSuggestions = ref(false)
const showTranslation = ref(false)
const translationResult = ref(null)

const filteredSuggestions = computed(() => {
  const q = searchText.value.trim()
  if (!q) return []
  const lower = q.toLowerCase()
  return entries.value.filter(it => it.zh.includes(q) || it.en.toLowerCase().includes(lower)).slice(0, 5)
})

const onInput = () => {
  if (filteredSuggestions.value.length) {
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
}

const onFocusInput = () => {
  if (filteredSuggestions.value.length) {
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
}

const selectSuggestion = item => {
  searchText.value = item.zh
  showSuggestions.value = false
}

const onSearch = () => {
  const matched = entries.value.find(it => it.zh === searchText.value || it.en === searchText.value)
  if (matched) {
    translationResult.value = matched
    showTranslation.value = true
  } else {
    translationResult.value = null
    showTranslation.value = false
    window.alert('请输入提示中译文');
    searchText.value = '';
  }
}

// 根据列表项数目和高度动态计算 search-extra-area 高度
const itemHeight = 38 // 注意需与 .suggestions li 实际高度保持一致
const extraAreaHeight = computed(() => {
  if (showSuggestions.value && filteredSuggestions.value.length) {
    return `${filteredSuggestions.value.length * itemHeight + 2}px`
  }
  return '0px'
})

const startAutoPlay = () => {
  timer.value = setInterval(() => {
    if (!isHovering.value) {
      current.value = (current.value + 1) % images.length
    }
  }, 3000)
}

const stopAutoPlay = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const onIndicatorEnter = idx => {
  isHovering.value = true
  hoverIndex.value = idx
  current.value = idx
}

const onIndicatorLeave = () => {
  isHovering.value = false
  hoverIndex.value = null
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.container {
  background: url('/测试4.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding-top: 0;
}

/* 轮播图区域 */
.carousel-section {
  width: 100%;
  background: #232323;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 320px;
}
.carousel {
  width: 100%;
  max-width: 980px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.carousel-slide {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #181922;
}
.carousel-desc {
  width: 50%;
  min-width: 260px;
  max-width: 600px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2vw;
  box-sizing: border-box;
}

.desc-text {
  color: #fff;
  font-size: clamp(1rem, 2vw, 1.2rem);
  background: black;
  padding: 2vw 2vw;
  border-radius: 12px;
  word-break: break-word;
  max-width: 100%;
  max-height: 100% ;
  overflow-wrap: break-word;
}
.desc-cn {
  font-family: 'KaiTi', '楷体', 'STKaiti', serif;
}
.desc-en {
  font-family: 'Pacifico', 'Comic Sans MS', cursive;
}
.carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

/* 轮播图下方复选按钮样式 */
.carousel-checkbox-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin: 32px 0 0 0;
  padding-bottom: 32px;
  background: none;
}
.carousel-checkbox-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  min-width: 180px;
  max-width: 260px;
  height: 56px;
  background: #e5e5e5;
  cursor: pointer;
  position: relative;
  font-family: 'Noto Serif SC', 'Microsoft YaHei', serif;
  font-size: 1.18rem;
  color: #232323;
  transition: background 0.2s, color 0.2s;
  border: none;
  margin: 0;
  user-select: none;
}
.carousel-checkbox-label.active,
.carousel-checkbox-label:hover {
  background: #fff;
  color: #f8b500;
}
.carousel-checkbox {
  display: none;
}
.carousel-checkbox-text {
  padding: 0;
  margin-top: 8px;
  margin-bottom: 0;
  letter-spacing: 1px;
}
.carousel-checkbox-underline {
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 3px;
  background: #f8b500;
  border-radius: 2px;
  transition: width 0.2s;
  width: 60%;
  box-shadow: 0 2px 8px #f8b50044;
}

/* 筛选标签+搜索框 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 80px 0 80px;
  padding-bottom: 18px;
}
.tags {
  display: flex;
  gap: 12px;
}
.tag-btn {
  padding: 8px 18px;
  background: #f7f7f7;
  color: #181922;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
}
.search-box input {
  width: 220px;
  padding: 7px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.search-btn {
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}

/* 下拉建议样式 */
.suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 260px;
  overflow: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 40;
}
.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.suggestions li:hover { background: #f6f6f6; }
.s-zh { font-weight: normal; font-size: 0.95rem; color: #222; }

/* 新增区域和热门图片父容器样式 */
.search-hot-wrapper {
  width: 100%;
  display: block;
}
.search-extra-area{
  background: none;
  width:95%;
  margin: 0 auto;
  box-sizing: border-box;
  transition: height 0.15s;
  /* 不设置固定高度，动态绑定 */
}
.search-translation-area{
  background: none;
  width: 80%;
  min-height: 12vw;
  margin: 0 auto;
  box-sizing: border-box;
  transition: height 0.15s;
  /* 其它样式不变 */
}
.translation-zh {
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 8px;
  word-break: break-all;
  white-space: pre-line;
}
.translation-en {
  font-size: 1rem;
  color: #666;
  word-break: break-all;
  white-space: pre-line;
}

/* 今日热门图片区 */
.hot-images {
  display: flex;
  gap: 32px;
  margin: 40px 80px 0 80px;
}
.hot-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(30,30,30,0.09);
  width: 320px;
  height: 200px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #232323;
  font-size: 1.2rem;
}
</style>