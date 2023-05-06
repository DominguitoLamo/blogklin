<script setup lang="ts">
import type { Option } from '@/interface'


const props = defineProps({
  options: {type: Array<Option>, required: true},
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value: string | number) {
  if (typeof value === 'string') {
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', Number(value))
  }
}
</script>
<template>
  <div class="options">
    <select>
      <option
        @click="updateValue(item.value)"
        v-for="item in props.options"
        :key="item.value"
        :value="item.value">{{ item.name }}</option>
    </select>
  </div>
</template>
<style scoped>
</style>