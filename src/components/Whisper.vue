// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import { ref } from 'vue';
import UploadFile from './UploadFile.vue'
import OptionsList from './OptionsList.vue'
import type { Option } from '@/interface';

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

const modelValue = ref('whisper-tiny.en')
const uploadedFile = ref()
const resultText = ref('')

function handleFileChange(file: Array<File>) {
  uploadedFile.value = file[0]
}

async function generateText() {
  const audio = await generateAudioContext()
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
  margin-top: 20px;
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