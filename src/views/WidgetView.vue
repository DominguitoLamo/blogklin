<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tablePic from '@/assets/table.svg'
import textPic from '@/assets/text.svg'
import searchPic from '@/assets/search.svg'
import audioPic from '@/assets/audio.svg'

const tabs_background = [
  '#5cc6c7',
  '#50aeeb',
  '#e1718b',
  '#c76358',
  '#edad68',
  '#e27fd5'
]

const router = useRouter()
const tools = [
  {
    name: 'ExcelConverter',
    icon: tablePic,
    introd: `Convert excel to json or markdown`,
  },
  {
    name: 'TranslateClassification',
    icon: textPic,
    introd: `Seperate Chinese and English text`
  },
  {
    name: 'ImageOCR',
    icon: searchPic,
    introd: 'Convert image to text'
  },
  {
    name: 'Whisper',
    icon: audioPic,
    introd: 'Convert audio into text'
  }
]

const toolBoxHoverBackground = ref(
  tools.map((item, index) => {
    return {
      '--hover_bg': tabs_background[index % tabs_background.length]
    }
  })
)

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
    <div class="tool-box">
        <div
        @click="gotoTool(item.name)"
        :style="toolBoxHoverBackground[index]"
        class="tool-item" v-for="(item, index) in tools"
        :key="item.name"
        >
          <span
            v-for="lintIndex in 4"
            :key="lintIndex"
            class="animation"
            :style="{'background': `linear-gradient(${lintIndex * 90}deg, transparent, ${tabs_background[index % tabs_background.length]})`}"
            ></span>
        <header>
          <img :src="item.icon" />
          <span class="tool-title">{{ item.name }}</span>
        </header>
        <span class="introd">{{ item.introd }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .tool {
    display: flex;
    justify-content: center;
    gap: 50px;
    min-height: 77vh;
    padding: 20px 0;
  }

  .tool-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80vw;
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
    background: var(--hover_bg);
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--hover_bg),
                0 0 25px var(--hover_bg),
                0 0 50px var(--hover_bg),
                0 0 100px var(--hover_bg);
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