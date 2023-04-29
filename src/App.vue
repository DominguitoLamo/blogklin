<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue';
import { routes } from './router/index'

const router = useRouter()
const routesRef = ref(routes.map(item => {
  return {
    ...item,
    active: item.name === 'Blog'
  }
}))

function handlePageNav(activeIndex: number) {
  routesRef.value.forEach((item, curindex) => item.active = activeIndex === curindex)
  router.push(routesRef.value[activeIndex].path)
}

</script>

<template>
  <header>
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
  <RouterView />
</template>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
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
</style>
