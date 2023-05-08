// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import { ref } from 'vue'
import UploadFile from './UploadFile.vue'
import OptionsList from './OptionsList.vue'
import type { Option } from '@/interface'
import { text2clip } from '@/utils'

interface WorkerRes {
  type: string,
  data: any
}

// new Worker(new URL('../worker/whisper.js', import.meta.url))
let worker : Worker | null

const statusText: Record<string, string> = {
  'load': 'Model Initalizing...',
  'generate': 'Text Generating...',
  'finish': 'Finish!'
}

const models: Array<Option> = [
  {
    name: 'whisper-tiny.en (61 MB)',
    value: 'whisper-tiny.en'
  },
  {
    name: 'whisper-base (80 MB)',
    value: 'whisper-base'
  }
]

const status = ref('')

const modelValue = ref('whisper-tiny.en')
const uploadedFile = ref()
const resultText = ref('')

function useWhisperWorker() {
  worker = new Worker(new URL('../worker/whisper.js', import.meta.url))

  worker.addEventListener('message', (event) => {
    const res = event.data as WorkerRes

    if (res.type === 'finish') {
      status.value = statusText[res.type]
      resultText.value = res.data
      uploadedFile.value = null
      worker?.terminate()
    } else {
      status.value = statusText[res.type]
    }
  })

  return worker
}

function handleFileChange(file: Array<File>) {
  uploadedFile.value = file[0]
}

async function generateText() {
  resultText.value = ''
  worker = useWhisperWorker()
  const audio = await generateAudioContext()
  worker.postMessage({
    audio,
    model: modelValue.value
  })
}

async function generateAudioContext() {
  const samplingRate = 16000
  const audioCtx = new AudioContext({
    sampleRate: samplingRate
  })
  const file = uploadedFile.value as File
  const buffer = await file.arrayBuffer()
  const decoded = await audioCtx.decodeAudioData(buffer)
  const audio = decoded.getChannelData(0)

  return audio
}

function copyText() {
  text2clip(resultText.value)
}
</script>
<template>
  <div class="whisper">
    <div class="selects">
      <span>Model: </span>
      <OptionsList v-model="modelValue" :options="models" />
    </div>
    <UploadFile @change="handleFileChange" file-type="mp3,wav" />
    <div class="button">
      <button @click="generateText" class="normal-button pulse-button">Generate Text</button>
      <button @click="copyText" v-if="resultText !== ''" class="normal-button clip-button">Copy to ClipBoard</button>
      <span>{{ status }}</span>
    </div>
    <div v-if="resultText !== ''" class="text">
      <textarea v-model="resultText"></textarea>
    </div>
  </div>
</template>
<style scoped>
.whisper {
  padding-left: 40px;
}

.selects {
  margin-bottom: 20px;
}

.button {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.normal-button.pulse-button {
  background: rgba(251,33,117,1);
  border: none;
  box-shadow: 0 0 0 0 rgba(251,33,117, 0.5);
}

.normal-button.pulse-button:hover {
  animation-name: pulse;
  animation-duration: .8s;
  animation-iteration-count: infinite;
}

.normal-button.clip-button {
  background: rgb(6,14,131);
  background: linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%);
  border: none;
}

.normal-button.json-btn:hover {
  background: rgb(0,3,255);
  background: linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%);
}

.text {
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 900px;
}

.text textarea {
  height: 500px;
}

@keyframes pulse {
    0% {
    transform: scale(.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(234,76,137, 0);
  }
    100% {
    transform: scale(.9);
    box-shadow: 0 0 0 0 rgba(234,76,137, 0);
  }
}
</style>