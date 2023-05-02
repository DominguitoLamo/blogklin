<script setup lang="ts">
import { reactive, defineProps } from 'vue'
import ViteMd from '@/blogs/ViteMd/README.md'

const blogs: Record<string, any> = reactive({
  ViteMd
})

const props = defineProps({
  title: { type: String, required: true},
})

</script>
<template>
  <div>
    <component :is="blogs[props.title]" />
  </div>
</template>
