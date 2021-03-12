<template>
	<section :class="modeType ? '' : 'dark'">
		<div class="bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-800 dark:text-white"><Index msg="个人简历" /></div>
		<div class="mode-btn rounded-full absolute top-4 right-4"
		@click="modeSwitch">
			<p class="border-2 w-10 h-5 border-gray-300 bg-gray-200 rounded-full"></p>
			<p class="w-6 h-6 p-1 absolute bg-gray-400 rounded-full top-1/2 -mt-3 transition-all text-white"
			:class="modeType ? 'left-0 sun' : 'right-0 moon'">
				<svg class="w-full h-full" v-if="modeType" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<svg class="w-full h-full" v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
				</svg>
			</p>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import Index from './components/index.vue';

export default defineComponent({
	name: 'App',
	components: {
		Index
	},
	setup: () => {
		const modeType = ref(true);
		
		function modeSwitch () {
			console.log(this.modeType)
		    this.modeType = !this.modeType
		}
		
		return { 
			modeType,
			modeSwitch
		};
	}
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
