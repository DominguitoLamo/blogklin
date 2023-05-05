<script setup lang="ts">
import { ref, type Ref } from 'vue'
import UploadFile from './UploadFile.vue'

const uploadedFile = ref()

function handleUploadChange(file: File) {
  console.log(file)
  uploadedFile.value = file
}

</script>
<template>
  <div class="converter">
    <div class="upload">
      <UploadFile @change="handleUploadChange" file-type="xlsx" />
    </div>
  </div>
</template>
<style scoped>
.upload {
  padding-left: 14px;
}
</style>