<script setup lang="ts">
import { reactive, ref } from 'vue'
import { text2clip, showToast } from '@/utils'

const src = ref(``)
const result = reactive({
  chinese: '',
  english: ''
})

function classification() {
  const chinesePattern = /[\u4e00-\u9fa5]/
  const englishPattern = /[a-zA-Z]/

  const textArr = src.value.split('\n')
  const chineseArr: Array<string> = []
  const englishArr: Array<string> = []

  for (let i = 0; i < textArr.length; i++) {
    const item = textArr[i]

    // chinese case
    const mid = Math.round(item.length / 2) - 1
    if (chinesePattern.test(item[mid]) ||
      chinesePattern.test(item[0]) ||
      chinesePattern.test(item[item.length - 1])
    ) {
      chineseArr.push(item)
      continue
    }

    // english case
    if (item.length > 0 && item.includes(' ')) {
      const englishText = item.split(' ')
      const englishMid = Math.round(item.length / 2) - 1
      if (englishPattern.test(englishText[0]) || 
        englishPattern.test(englishText[englishText.length - 1]) ||
        englishPattern.test(englishText[englishMid])
      ) {
        englishArr.push(item)
        continue
      } else if (chinesePattern.test(item)) {
        chineseArr.push(item)
        continue
      }
    }

    // other cases
    chineseArr.push(item)
    englishArr.push(item)
  }

  result.chinese = chineseArr.join('\n')
  result.english = englishArr.join('\n')
}

function copy2Clipboard(text: string) {
  text2clip(text)
}
</script>
<template>
  <div class="translate">
    <div class="button">
      <button @click="classification" class="normal-button">Classification</button>
    </div>
    <div class="content">
      <div class="left">
        <span>Source</span>
        <textarea v-model="src"></textarea>
      </div>
      <div class="right">
        <div class="result">
          <div class="title">
            <span>Chinese</span>
            <button @click="copy2Clipboard(result.chinese)" v-show="result.chinese !== ''" class="normal-button">Copy To Clipboard</button>
          </div>
          <div class="text">{{ result.chinese }}</div>
        </div>
        <div class="result">
          <div class="title">
            <span>English</span>
            <button @click="copy2Clipboard(result.english)" v-show="result.english !== ''" class="normal-button">Copy To Clipboard</button>
          </div>
          <div class="text">{{ result.english }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
span {
  font-size: 24px;
}

.button {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}

.content {
  display: flex;
  gap: 50px;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.left textarea {
  flex: 1;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result .title {
  display: inline-flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
}

.result .text {
  min-height: 30vh;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  white-space: pre-line;
}
</style>