<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const tools = [
  {
    name: 'ExcelConverter',
    icon: 'table.svg',
    introd: `Convert excel to json or markdown`,
  },
  {
    name: 'TranslateClassification',
    icon: 'text.svg',
    introd: `Seperate Chinese and English text`
  },
  {
    name: 'ImageOCR',
    icon: 'search.svg',
    introd: 'Convert image to text'
  }
]

function gotoTool(name: string) {
  router.push({
    name: 'WidgetContentView',
    query: {
      name
    }
  })
}
</script>
<template>
  <div class="tool">
    <div @click="gotoTool(item.name)" class="tool-item" v-for="item in tools" :key="item.name">
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
    gap: 50px;
    min-height: 83vh;
    padding: 20px
  }

  .tool-item {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-height: 150px;
    padding: 10px 20px;
    transition: box-shadow .75s ease;
    overflow: hidden;
    cursor: pointer;
  }

  .tool-item:hover {
    background: rgb(225, 113, 139);
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(225, 113, 139),
                0 0 25px rgb(225, 113, 139),
                0 0 50px rgb(225, 113, 139),
                0 0 100px rgb(225, 113, 139);
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

  .tool-item .animation {
    position: absolute;
    display: block;
  }

  .tool-item .animation:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgb(225, 113, 139));
  animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,100% {
      left: 100%;
    }
  }

  .tool-item .animation:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgb(225, 113, 139));
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,100% {
      top: 100%;
    }
  }

  .tool-item .animation:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, rgb(225, 113, 139));
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,100% {
      right: 100%;
    }
  }

  .tool-item .animation:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, rgb(225, 113, 139));
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,100% {
      bottom: 100%;
    }
  }

</style>