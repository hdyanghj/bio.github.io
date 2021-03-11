<template>
  <Index msg="个人简历" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Index from './components/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Index
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>