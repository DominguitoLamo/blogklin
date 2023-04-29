<script setup lang="ts">
import blogIndex from '@/blogs/index.json'
import { onMounted, ref, type Ref } from 'vue';

interface Tag {
  tag: string,
  colorClass: string
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

onMounted(() => {
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
})

function handleTagTopics(index: number) {
  tagsActive.value = index
}

</script>
<template>
  <main>
    <div class="search">
      <input class="search-input" type="text" placeholder="Search">
    </div>
    <nav class="topics">
      <div class="title">Topics</div>
      <div class="topic-tags">
        <span
          :class="[{'active': tagsActive === index}, item.colorClass]"
          class="tags-item"
          v-for="(item, index) in tags"
          :key="item.tag"
          @click="handleTagTopics(index)"
        >{{ item.tag }}</span>
      </div>
    </nav>
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
</style>
