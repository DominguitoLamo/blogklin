<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <span>BLOGKLIN</span>
    <nav>
      <a href="#">Blog</a>
      <a href="#">Tool</a>
      <a href="#">About</a>
    </nav>
  </header>

  <!--<RouterView />-->
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
  }
</style>
