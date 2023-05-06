<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue';
import { getLocationHashName } from '@/utils'
import { useFadeStore } from './state/topFade'
import ToastMsg from './components/ToastMsg.vue'

const router = useRouter()
const appRoutes = [
{
    path: '/',
    name: 'Blog',
  },
  {
    path: '/widget',
    name: 'Widget',
  },
  {
    path: '/about',
    name: 'About',
  }
]
const fadeState = useFadeStore()

const routesRef = ref(appRoutes.map(item => {
  return {
    ...item,
    active: item.name.toLowerCase() === getLocationHashName()
  }
}))


function handlePageNav(activeIndex: number) {
  routesRef.value.forEach((item, curindex) => item.active = activeIndex === curindex)
  router.push(routesRef.value[activeIndex].path)
}

</script>

<template>
  <header v-show="fadeState.showTop">
    <span>BLOGKLIN</span>
    <nav v-if="routesRef.length > 0">
      <a
        :class="{'active-page': item.active}"
        v-for="(item, index) in routesRef"
        @click="handlePageNav(index)"
        :key="item.name"
      >{{ item.name }}</a>
    </nav>
  </header>
  <div class="router">
    <router-view v-slot="{ Component }">
      <transition name="slide-left">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <footer>
    <span class="footer-text">Made with 🤍 by Chon Lam</span>
  </footer>

  <!--Toast-->
  <ToastMsg ></ToastMsg>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
  }

  header.top-faded {
    display: none;
  }

  span {
    font-weight: bold;
    letter-spacing: 3px;
  }

  nav {
    display: flex;
    gap: 30px;
  }

  a {
    color: #fff;
    text-decoration: none;
    user-select: none;
    transition: color 200ms ease 0s;
    cursor: pointer;
  }

  a:hover {
    color: rgb(92, 198, 199);
  }

  .active-page {
    color: rgb(51, 147, 148);
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 10px;
    padding-bottom: 20px;
    font-size: 14px;
    user-select: none;
  }

  .footer-text {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: normal;
  }

  .router {
    padding-top: 50px;
  }

  .slide-left-enter-from {
    opacity: 0;
    -webkit-transform: translate(60px, 0);
    transform: translate(60px, 0);
  }
  .slide-left-enter-active{
    transition: all .75s ease;
  }
  .slide-left-leave-to{
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
  .slide-left-leave-active {
    transition: all .5s ease;
  }
</style>
