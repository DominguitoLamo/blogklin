<script setup lang="ts">
import blogIndex from '@/blogs/index.json'
import { onMounted, ref, type Ref } from 'vue'
import { debounce } from '@/utils'
import router from '@/router'

const BLOGS_PER_PAGE = 9

interface Tag {
  tag: string,
  colorClass: string
}

const totalBlogs = blogIndex.index
const totalPages = Math.ceil(totalBlogs.length / BLOGS_PER_PAGE)
const curPage = ref(1)

const blogs = ref(totalBlogs.slice(0, BLOGS_PER_PAGE))
const blogPops = ref(Array(blogs.value.length).fill(false)) as Ref<[boolean]>
const isPreviewFadeOut = ref(false)

const blogPopStyle = {
  opacity: 1,
  transform: 'none'
}

const tags: Ref<Array<Tag>> = ref([])
const tagsActive = ref(0)
const tabs_background = [
  'tag-background-1',
  'tag-background-2',
  'tag-background-3',
  'tag-background-4',
  'tag-background-5',
  'tag-background-6'
]

const searchText = ref('')

onMounted(() => {
  initTag()
  blogPopUp()
})

function initTag() {
  const tagSet = new Set<string>()
  blogIndex.index.forEach((item) => {
    item.tags.forEach(tag => tagSet.add(tag))
  })
  tags.value = ['All', ...tagSet].map((item, index) => {
    return {
      tag: item,
      colorClass: tabs_background[index % tabs_background.length]
    }
  })
}

function blogPopUp() {
  blogs.value.forEach((item, index) => {
    setTimeout(() => {
      blogPops.value[index] = true
    }, 100 * (index + 1))
  })
}

function handleTagTopics(index: number, text: string) {
  tagsActive.value = index
  searchByTag(text)
}

function changePage(index: number) {
  isPreviewFadeOut.value = true
  setTimeout(() => {
    // reset
    isPreviewFadeOut.value = false
    blogPops.value.forEach(item => item = false)
    blogs.value = totalBlogs.slice((index - 1) * BLOGS_PER_PAGE, (index - 1) * BLOGS_PER_PAGE + 9)
    curPage.value = index

    setTimeout(() => {
      blogPopUp()
    }, 0)
  }, 500)

}

function increasePageIndex() {
  changePage(curPage.value + 1)
}

function decreasePageIndex() {
  changePage(curPage.value - 1)
}

function searchBlog() {
  const keyWord = searchText.value
  if (!keyWord) {
    blogs.value = totalBlogs.slice(0, BLOGS_PER_PAGE)
    return
  }

  const blogFound = totalBlogs.filter((item) => {
    if (item.title.includes(keyWord) || item.tags.some(item => item.includes(keyWord))) {
      return true
    } else {
      return false
    }
  })

  blogs.value = blogFound
}

function searchByTag(text: string) {
  searchText.value = text === 'All' ? '' : text
  searchBlog()
}

function gotoBlogContent(title: string) {
  router.push({
    name: 'BlogContent',
    query: {
      title
    }
  })
}

const searchBlogDebounced = debounce(searchBlog, 500)
</script>
<template>
  <main>
    <div class="search">
      <input @input="searchBlogDebounced" v-model="searchText" class="search-input" type="text" placeholder="Search">
    </div>
    <nav class="topics">
      <div class="title">Topics</div>
      <div class="topic-tags">
        <span
          :class="[{'active': tagsActive === index}, item.colorClass]"
          class="tags-item"
          v-for="(item, index) in tags"
          :key="item.tag"
          @click="handleTagTopics(index, item.tag)"
        >{{ item.tag }}</span>
      </div>
    </nav>
    <div class="blog-preview" :class="{'fade-out': isPreviewFadeOut}">
      <div
        v-for="(item, index) in blogs"
        :key="index"
        class="blog-box"
        :style="blogPops[index] ? blogPopStyle : ''"
        @click="gotoBlogContent(item.title)"
      >
        <div class="img-box">
          <img :src="item.picUrl" />
        </div>
        <div class="blog-title">{{ item.title }}</div>
        <div class="tag-list">
          <span v-for="tag in item.tags" :key="tag">#{{ tag }}</span>
        </div>
        <div class="date">
          <img src="@/assets/date.svg" />
          <span>{{ item.date }}</span>
        </div>
      </div>
    </div>
    <div v-show="searchText === ''" class="pages">
        <span @click="decreasePageIndex" v-if="curPage !== 1" class="arrow">
          <img src="@/assets/left_arrow.svg"/>
        </span>
        <div class="page-nums">
          <span
            :class="{'page-active': curPage === item}"
            v-for="item in totalPages"
            :key="item"
            @click="changePage(item)"
            >{{ item }}
          </span>
        </div>
        <span @click="increasePageIndex" v-if="curPage !== totalPages" class="arrow">
          <img src="@/assets/right_arrow.svg"/>
        </span>
    </div>
  </main>
</template>
<style scoped>
  main {
    padding: 10px 190px;
    padding-bottom: 60px;
  }

  .search {
    margin-bottom: 24px;
  }

  .search-input {
    box-sizing: border-box;
    width: 100%;
    max-width: 300px;
    padding: 16px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    background-color: rgb(40, 60, 73);
    color: rgb(207, 213, 221)
  }

  .search-input:focus {
    outline: none;
  }

  .topics {
    margin-bottom: 32px;
  }

  .topics .title {
    margin-bottom: 12px;
    font-size: 14px;
    color: rgb(82, 99, 109);
  }

  .topic-tags {
    display: flex;
    flex-wrap: 12px;
    gap: 12px;
  }

  .tags-item {
    padding: 8px 16px;
    border-radius: 10000px;
    background-color: rgb(40, 60, 73);
    color: rgb(100, 116, 139);
    transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
    cursor: pointer;
  }

  .tags-item:hover {
    color: rgb(23, 36, 44);
  }

  .tags-item.active {
    color: rgb(23, 36, 44);
  }

  .tag-background-1:hover {
    background-color: rgb(92, 198, 199);
  }
  .tag-background-1.active {
    background-color: rgb(92, 198, 199);
  }

  .tag-background-2:hover {
    background-color: rgb(80, 174, 235);
  }
  .tag-background-2.active {
    background-color: rgb(80, 174, 235);
  }

  .tag-background-3:hover {
    background-color: rgb(225, 113, 139);
  }
  .tag-background-3.active {
    background-color: rgb(225, 113, 139);
  }

  .tag-background-4:hover {
    background-color: rgb(199, 99, 88);
  }
  .tag-background-4.active {
    background-color: rgb(199, 99, 88);
  }

  .tag-background-5:hover {
    background-color: rgb(237, 173, 104);
  }
  .tag-background-5.active {
    background-color: rgb(237, 173, 104);
  }

  .tag-background-6:hover {
    background-color: rgb(237, 173, 104);
  }
  .tag-background-6.active {
    background-color: rgb(237, 206, 104);
  }
  .blog-preview {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 60px;
    transition: opacity 500ms ease;
    opacity: 1;
  }

  .blog-preview.fade-out {
    opacity: 0;
  }

  .blog-box {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: rgb(16, 24, 29);
    cursor: pointer;
    gap: 12px;
    padding: 8px;
    border-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    transition: border 350ms ease 100ms, background-color 200ms ease, opacity 500ms ease, transform 500ms ease;
    transform: translateY(50px);
    opacity: 0;
  }

  .blog-box:hover {
    border: 2px solid rgb(51, 147, 148);
    background-color: rgb(23, 36, 44);
  }

  .blog-box:hover > .img-box {
    transform: scale3d(1.06181, 1.06181, 1);
  }

  .img-box {
    position: relative;
    width: 100%;
    height: 220px;
    transition: transform 500ms ease 0s;
    transform-origin: 50% 100%;
  }

  .img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 17px;
    border: 2px solid rgb(51, 147, 148);
  }

  .blog-title {
    margin-bottom: 18px;
    font-size: 22px;
    line-height: 26px;
    font-weight: bold;
    letter-spacing: -0.02em;
  }

  .tag-list {
    display: flex;
    gap: 8px;
    color: rgb(92, 198, 199);
  }

  .date {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pages {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .pages .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    padding: 8px;
    border-radius: 50%;
    background-color: rgb(115, 206, 207);
    text-decoration: none;
    cursor: pointer;
  }

  .page-nums {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .page-nums span {
    font-size: 18px;
    color: rgb(100, 116, 139);
    cursor: pointer;
  }

  .page-nums span.page-active {
    color: #fff;
    font-weight: 500;
  }
</style>
