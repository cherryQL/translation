<template>
  <div class="translation-entry">
    <div class="zh">{{ zh }} {{ en }}</div>
  </div>
</template>

<script setup>
defineProps({
  zh: String,
  en: String
})
</script>

<style scoped>
.translation-entry {
  background: #fff;
  border-radius: 10px;
  margin: 16px 0;
  padding: 5px 22px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  max-width: 600px;
  text-align: left;
}

.zh {
  font-size: 10px;
  color: #222;
  font-family: "Noto Serif SC", "Microsoft YaHei", serif;
  margin-bottom: 10px;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: normal;
  white-space: pre-line;
  text-align: left;
}
</style>