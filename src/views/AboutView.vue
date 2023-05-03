<script setup lang="ts">
  const introduction = `BLOGKLIN is Chon W. Lam's space for sharing and demonstrating frontend techniques. Creating a personal blog is a way to unleash the power of the web that is restricted by dot-com companies.`
</script>
<template>
  <div class="about">
    <div class="introduction">
      <span id="introd" tg-name="fade" class="title">{{ introduction }}</span>
      <span class="logo">B</span>
    </div>
  </div>
</template>

<style scoped>

.about {
  height: 200vh;
}

.introduction {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 90px 32px;
}

.introduction .title {
  width: 500px;
  font-size: 40px;
  line-height: 48px;
  font-weight: bold;
  color: rgb(92, 198, 199);
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

#introd {
  opacity: calc(var(--fade) * 1);
}

</style>
