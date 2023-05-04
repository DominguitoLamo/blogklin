<script setup lang="ts">
  const tools = [
    {
      name: 'Oution',
      icon: 'oution_icon.svg',
      introd: `Add the functions to empower Notion's AI`
    }
  ]
</script>
<template>
  <div class="tool">
    <div class="tool-item" v-for="item in tools" :key="item.name">
      <span class="animation"></span>
      <span class="animation"></span>
      <span class="animation"></span>
      <span class="animation"></span>
      <header>
        <img :src="'/src/assets/' + item.icon" />
        <span class="tool-title">{{ item.name }}</span>
      </header>
      <span class="introd">{{ item.introd }}</span>
    </div>
  </div>
</template>
<style scoped>
  .tool {
    display: flex;
    gap: 13px;
    min-height: 86vh;
    padding: 20px
  }

  .tool-item {
    display: flex;
    flex-direction: column;
    max-height: 150px;
    padding: 10px 20px;
  }

  .tool-item header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #fff;
    font-size: 24px;
    font-weight: bold;
  }

  .tool-item img {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 20px;
  }

  .tool-item .introd {
    display: flex;
    align-items: center;
    flex: 1
  }
</style>