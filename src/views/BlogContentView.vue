<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import blogIndex from '@/blogs/index.json'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const blogInfo = blogIndex.index.find((item => {
  return item.title === route.query.title
}))
const loading = ref(false)


function backToBlogList() {
  router.push({
    name: 'Blog'
  })
}

setTimeout(() => {
  loading.value = true
}, 500)
</script>
<template>
    <div v-show="loading" class="loading">
      <header>
        <div class="blog-info">
          <div class="left">
            <button @click="backToBlogList" class="back"><img src="@/assets/back_arrow.svg" />Back</button>
            <div class="title">{{ blogInfo?.title }}</div>
            <div class="tags">
              <span class="tag" v-for="item in blogInfo?.tags" :key="item">#{{ item }}</span>
            </div>
            <div class="date">
              <img src="@/assets/date.svg" />
              <span>{{ blogInfo?.date }}</span>
            </div>
          </div>
          <div class="right">
            <img :src="blogInfo?.picUrl" />
          </div>
        </div>
      </header>
      <svg viewBox="0 0 1440 89" class="round-decor">
        <path d="M0 0H1440V69C1440 69 1243.16 111.882 720 69C232 29 0 69 0 69V0Z" fill="#10181D">
        </path>
      </svg>
      <main>
        <MDRender :title="blogInfo!.title"/>
      </main>
    </div>
</template>
<style scoped>
  header {
    padding: 40px 32px;
    padding-bottom: 0;
    background-color: rgb(16, 24, 29);
    color: rgb(100, 116, 139);
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 8px 16px;
    border: none;
    border-radius: 1000px;
    background-color: rgb(31, 48, 58);
    color: rgb(133, 147, 167);
    transition: background-color 200ms ease 0s;
    user-select: none;
    cursor: pointer;
  }

  .back:hover {
    background-color: rgb(40, 60, 73);
  }

  .back img {
    display: inline-block;
    width: 7px;
    height: 12px;
    margin-right: 10px;
  }

  .blog-info {
    display: flex;
    justify-content: center;
    gap: 50px;
  }

  .left .title {
    width: 384px;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 32px;
    letter-spacing: -0.02em;
    color: #fff;
    font-weight: bold;
  }

  .right {
    padding-top: 50px;
  }

  .right img {
    display: inline-block;
    width: 600px;
    height: 400px;
    object-fit: cover;
    border-radius: 17px;
  }

  .tags {
    display: flex;
    gap: 14px;
    margin-bottom: 20px;
    user-select: none;
    color: rgb(92, 198, 199);
  }

  .date {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .round-decor {
    margin-bottom: 30px;
  }

  main {
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
  }

  .loading {
    animation-name: loading;
    animation-duration: 1s;
  }

  @keyframes loading {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>