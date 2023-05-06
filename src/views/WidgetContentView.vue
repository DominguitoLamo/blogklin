<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import ExcelConverter from '@/components/ExcelConverter.vue'
import TranslateClassification from '@/components/TranslateClassification.vue'
import ImageOCR from '@/components/ImageOCR.vue'
import { useFadeStore } from '@/state/topFade'

const components: Record<string, any> = {
  ExcelConverter,
  TranslateClassification,
  ImageOCR
}
const route = useRoute()
const router = useRouter()
const fadeState = useFadeStore()
const componentName = route.query.name as string

fadeState.setShowTop(false)

function backToWidget() {
  setTimeout(() => {
    fadeState.setShowTop(true)
  })
  router.push({
    name: 'Widget'
  })
}

</script>
<template>
  <div class="content">
    <button @click="backToWidget" class="back"><img src="@/assets/back_arrow.svg" />Back</button>
    <component :is="components[componentName]" />
  </div>
</template>
<style scoped>
  .content {
    padding: 10px 15px;
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 8px 16px;
    border: none;
    border-radius: 1000px;
    background-color: rgb(31, 48, 58);
    color: rgb(133, 147, 167);
    transition: background-color 200ms ease 0s;
    user-select: none;
    cursor: pointer;
  }

  .back:hover {
    background-color: rgb(40, 60, 73);
  }

  .back img {
    display: inline-block;
    width: 7px;
    height: 12px;
    margin-right: 10px;
  }

</style>