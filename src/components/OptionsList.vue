<script setup lang="ts">
import type { Option } from '@/interface'


const props = defineProps({
  options: {type: Array<Option>, required: true},
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(e: any) {
  const selectValue = e.srcElement.value as string
  emit('update:modelValue', selectValue)
}

</script>
<template>
  <div class="select">
    <select @change="updateValue">
      <option
        v-for="item in props.options"
        :key="item.value"
        :value="item.value">{{ item.name }}</option>
    </select>
  </div>
</template>
<style scoped>
.select {
  position: relative;
  display: inline-block;
  min-width: 200px;
}

.select select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 10px 15px;
  outline: 0;
  border: 0;
  border-radius: 10px;
  background-color: rgb(40, 60, 73);
  color: rgb(207, 213, 221);
}
</style>