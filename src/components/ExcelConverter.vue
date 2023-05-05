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
    <div class="upload-box">
      <div class="upload">
        <UploadFile @change="handleUploadChange" file-type="xlsx" />
      </div>
      <div class="buttons">
        <button class="normal-button json-btn">To Json</button>
        <button class="normal-button md-btn">To Md</button>
      </div>
      <div class="preview">

      </div>
    </div>
  </div>
</template>
<style scoped>
.upload-box {
  padding-left: 14px;
}

.upload {
  margin-bottom: 14px;
}

.buttons {
  display: flex;
  gap: 12px;
  padding-left: 10px;
}

.normal-button.json-btn {
  background: rgb(6,14,131);
  background: linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%);
  border: none;
}

.normal-button.json-btn:hover {
  background: rgb(0,3,255);
  background: linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%);
}

.normal-button.md-btn {
  background: rgba(251,33,117,1);
  background: linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%);
  border: none;
}

.normal-button.md-btn:hover {
  background: rgb(238, 94, 149);
  background: linear-gradient(0deg, rgb(238, 94, 149) 0%, rgba(234,76,137,1) 100%);
  border: none;
}
</style>

