import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const show = ref(false)
  const msg = ref('')

  function showToast(inputMsg: string, durationTime: number = 1500) {
    show.value = true
    msg.value = inputMsg
    setTimeout(() => {
      show.value = false
    }, durationTime)
  }

  return {
    show,
    msg,
    showToast
  }
})