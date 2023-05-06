<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type { Option } from '@/interface'
import OptionsList from './OptionsList.vue'
import UploadFile from './UploadFile.vue'
import { ref } from 'vue'
/* eslint-disable */
import { createWorker, PSM, OEM } from 'tesseract.js'

const functionTypes: Array<Option> = [
  {
    name: 'Upload Images',
    value: 'upload'
  }, {
    name: 'Crop Image Uploaded',
    value: 'crop'
  }
]
const typeValue = ref('upload')

const langs: Array<Option> = [
  {
    name: 'English',
    value: 'eng'
  }, 
  {
    name: '简体中文',
    value: 'chi_simp'
  },
  {
    name: '繁體中文',
    value: 'chi_tra'
  }
]
const langValue = ref('eng')

const uploadFiles = ref([] as Array<File>)
const resultText = ref('')
const loading = ref(false)

function handleUploadChange(file: File) {
  uploadFiles.value = []
  uploadFiles.value.push(file)
}

async function initOCRWorker() {
  // init
  const ocrWorkerPromise = createWorker({
    logger: m => console.log(m),
  })
  const worker = await ocrWorkerPromise
  await worker.load()
  await worker.loadLanguage(langValue.value)
  await worker.initialize(langValue.value, OEM.LSTM_ONLY)
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK
  })
  return worker
}

async function recognize() {
  loading.value = true
  const textPromise = uploadFiles.value.map(item => {
    return new Promise(async(resolve) => {
      const worker = await initOCRWorker()
      const { data: { text } } = await worker.recognize(item)
      worker.terminate()
      resolve(text)
    })
  })

  Promise.all(textPromise).then(values => {
    const texts = values as Array<string>
    resultText.value = texts.join('\n')
    loading.value = false
  })
}

function handleMultipleUploadChange(files: Array<File>) {
  uploadFiles.value = [...files]
}
</script>
<template>
  <div class="ocr">
    <header>
      <OptionsList v-model="typeValue" :options="functionTypes" />
      <OptionsList v-model="langValue" :options="langs" />
    </header>
    <div v-if="typeValue === 'upload'">
      <UploadFile :multiple="true" @change="handleMultipleUploadChange" file-type="png,jpg,jpeg" />
      <div class="button">
        <button @click="recognize" class="normal-button">Generate Text</button>
      </div>
      <div v-if="loading" class="loading">Image Processing...</div>
      <div v-if="resultText !== ''" class="result">
        <textarea v-model="resultText">
        </textarea>
      </div>
      
    </div>
  </div>
</template>
<style scoped>
  header {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 20px;
  }

  .button {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .loading {
    margin: 0 10px;
  }

  .result textarea {
    width: 1000px;
    height: 500px;
  }
</style>