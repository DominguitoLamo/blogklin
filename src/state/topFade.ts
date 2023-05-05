import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFadeStore = defineStore('fade', () => {
  const showTop = ref(true)
  function setShowTop(value: boolean) {
    showTop.value = value
  }

  return { showTop, setShowTop }
})