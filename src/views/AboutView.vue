<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createSketch } from '@/3dRender/raining';

  const introdPoem = ref([
    'BLOGKLIN is a place for sharing',
    'Where knowledge is always daring',
    'To break free from tradition chains',
    'And spark creativity in our brains'
  ])

  onMounted(() => {
    const sketch = createSketch()
    resizeSketch(sketch.container)
  })

  function resizeSketch(container: HTMLElement) {
    const width = container.clientWidth
    const height = container.clientHeight
    const canvas = container.children.item(0) as HTMLElement
    // @ts-ignore
    canvas.width = width
    // @ts-ignore
    canvas.height = height
    
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

</script>
<template>
  <div class="about">
    <div class="introduction">
      <div id="sketch"></div>
      <div class="poem">
        <span v-for="item in introdPoem" :key="item" class="title">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.about {
  min-height: 76vh;
  overflow-x: hidden;
}

.introduction {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 70vh;
  gap: 100px;
  padding: 90px 32px;
}

.introduction .poem {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 40px;
  line-height: 48px;
  font-weight: bold;
  color: rgb(92, 198, 199);
  opacity: 0;
  animation-name: fade;
  animation-duration: 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}

.introduction .poem span {
  display: inline-block;
  width: auto;
}

.introduction .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 15px solid #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 8em;
  color: #fff;
  letter-spacing: -7px;
  font-weight: 700;
  text-transform: uppercase;
  animation: blur 3s ease-out infinite;
  text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
  box-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
}

@keyframes blur {
  from {
    text-shadow:0px 0px 10px #fff,
      0px 0px 10px #fff, 
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #7B96B8,
      0px 0px 150px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px -10px 100px #7B96B8,
      0px -10px 100px #7B96B8;

      box-shadow:0px 0px 10px #fff,
      0px 0px 10px #fff, 
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 25px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #fff,
      0px 0px 50px #7B96B8,
      0px 0px 150px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px 10px 100px #7B96B8,
      0px -10px 100px #7B96B8,
      0px -10px 100px #7B96B8;
  }
}

#sketch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.drive-home {
  width: 100vw;
  height: 100vh;
}

#drive-container {
  width: 100%;
  height: 100%;
}

@keyframes fade {
  from {opacity: 0; transform: translateX(-50px);}
  to {opacity: 1;transform: none;}
}
</style>
