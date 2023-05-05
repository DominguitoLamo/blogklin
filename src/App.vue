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
const routerShow = ref(true)

router.beforeEach((to, from, next) => {
  routerShow.value = false
  setTimeout(() => {
    routerShow.value = true
    next()
  }, 300)
})

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
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 500ms ease, transform 500ms ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
</style>
