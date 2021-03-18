<template>
  <JackpotSoccer msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import JackpotSoccer from './components/jackpot-soccer.vue'

export default defineComponent({
  name: 'App',
  components: {
    JackpotSoccer
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>