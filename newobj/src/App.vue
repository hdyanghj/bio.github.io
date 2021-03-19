<template>
  <section class="">
    <header class="header transition-all"
    :class="navStatus?'':'transform -translate-x-full'">
      <!-- 左侧导航 -->
    </header>
    <nav class="w-full fixed z-30 h-16 bg-gray-800 p-4 text-white flex justify-between">
      <!-- 顶部导航 -->
      <div class="transform transition flex items-center"
      :class="navStatus?'translate-x-40':'translate-x-0'">
        <svg class="w-5 mr-2 cursor-pointer"
        @click="navSwitch"
        v-show="!navStatus"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg class="w-5 mr-2 cursor-pointer"
        v-show="navStatus"
        @click="navSwitch"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>New Obj ()</span>
      </div>
      <div>
        111
      </div>
    </nav>
    <main class="pt-16"
    :class="navStatus?'pl-40':'pl-0'">
      <!-- 内容 -->
      <NavList />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavList from './components/NavList.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavList
  },
  setup: () =>{
    const navStatus = ref(true)

    const navSwitch = () => {
      navStatus.value = !navStatus.value
    }
    return {
      navStatus,
      navSwitch
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style lang="postcss" scoped>
.header{
  @apply w-40 fixed z-40 h-screen bg-gray-100 shadow-md;
}
</style>