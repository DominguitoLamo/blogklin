<script setup lang="ts">
import Hello from '@/blogs/hello.md'
import Another from '@/blogs/another.md'
import { reactive, defineProps } from 'vue'

const blogs: Record<string, any> = reactive({
  Hello,
  Another
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