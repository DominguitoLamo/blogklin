<script setup lang="ts">
const props = defineProps({
  fileType: {type: String, required: true}
})

// type-based (TS)
const emit = defineEmits<{
  (e: 'change', file: File): void
}>()

/**
 * 
 * @param e uploadEvent
 */
function handleFile(e: any) {
  const file = e.target.files[0] as File
  emit('change', file)
}
</script>
<template>
  <div class="upload">
    <div class="title" for="avatar">Choose a {{ props.fileType }} file:</div>
    <input type="file"
          @change="handleFile"
          id="file" name="file"
          :accept="props.fileType">
  </div>
</template>
<style scoped>
.title {
  margin-bottom: 10px;
}

input[type=file] {
  width: 350px;
  max-width: 100%;
  color: rgb(207, 213, 221);
  padding: 5px;
  background: rgb(40, 60, 73);
  border-radius: 10px;
  border: 1px solid #555;
}

input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background-color: rgb(92, 198, 199);
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background-color: rgb(51, 147, 148);
}

</style>