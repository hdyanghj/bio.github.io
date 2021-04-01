<template>
  <section class="w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col justify-center items-center">
    <!-- <h1>{{ msg }}</h1> -->
    <img class="w-7/12 mx-auto" src="../assets/logo.png"/>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
      const msg = ref('HEllo')
    const count = ref(0)
    return { msg, count }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
