<template>
  <section class="pt-4 md:pt-20">
      <div class="w-11/12 md:max-w-7xl mx-auto bg-gray-400 flex flex-col-reverse md:flex-row">
        <div class="w-full md:w-5/12 border-red-300">
          <div class="w-full"><img class="w-5/12" src="../assets/img/img.png"/></div>
          <div class="w-full"><img class="w-full" src="../assets/img/img.png"/></div>
          <div class="w-full flex justify-end"><img class="w-5/12" src="../assets/img/img.png"/></div>
        </div>
        <div class="w-full md:w-7/12 bg-gray-600 border-4 border-solid border-white p-8">1</div>
      </div>
      <ul class="w-11/12 md:max-w-7xl mx-auto flex justify-center m-10 space-x-20">
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
      </ul>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>
</style>
