<script setup lang="ts">
import { useToastStore } from '@/state/toastState'
const toast = useToastStore()

</script>
<template>
  <div class="box">
    <div class="toast" :class="{ 'show': toast.show }">
      <img src="@/assets/information.svg" />
      <span>{{ toast.msg }}</span>
    </div>
  </div>
</template>
<style scoped>
.box {
  position: fixed;
  top: 18px;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: -1;
}

.toast {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 100px;
  padding: 10px;
	background: rgba(0, 0, 0, .5);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: transform 1s ease;
  transform: translateY(-80px);
}

.toast img {
  display: inline-block;
  width: 40px;
  height: 40px;
}

.toast.show {
  transform: none;
}

</style>