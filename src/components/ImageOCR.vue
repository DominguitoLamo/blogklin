<script setup lang="ts">
/* __vue_virtual_code_placeholder__ */
import type { Option } from '@/interface'
import OptionsList from './OptionsList.vue';
import { ref } from 'vue';

const functionTypes: Array<Option> = [
  {
    name: 'Upload Images',
    value: 'upload'
  }, {
    name: 'Crop Image Uploaded',
    value: 'crop'
  }
]
const typeValue = ref('')
</script>
<template>
  <div class="ocr">
    <OptionsList v-model="typeValue" :options="functionTypes" />
    {{ typeValue }}
  </div>
</template>
<style scoped>
</style>