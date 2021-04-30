<template>
	<v-row>
		<v-col v-for="(_, index) in 6" :key="index" cols="12" sm="4">
			<div class="flex-center secondary py-16">
				<img src="@/assets/svg/placeholder.svg" alt="image with human" height="80" width="80" />
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'LayoutMainGetInspired',
};
</script>

<style scoped></style>
