<script setup lang="ts">
import { useRoute } from 'vue-router'
import blogIndex from '@/blogs/index.json'

const route = useRoute()
const blogInfo = blogIndex.index.find((item => {
  return item.title === route.query.title
}))
</script>
<template>
  <div>
    blogContent
    <MDRender title="Hello" />
    <Hello />
  </div>
</template>