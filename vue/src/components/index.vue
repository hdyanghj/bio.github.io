<template>
	<Hander />
	<Info />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import Hander from './hander.vue';
import Info from './info.vue';
export default defineComponent({
	name: 'Index',
	components: {
		Hander,
		Info
	},
	props: {
		msg: {
			type: String,
			required: true
		}
	},
	setup: () => {
		const count = ref(0);
		return { count };
	}
});
</script>

<style scoped></style>
