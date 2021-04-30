<template>
	<div class="category-page-header full-width secondary mb-12 d-flex flex-grow-1">
		<v-container class="py-12 d-flex justify-space-between flex-column">
			<div class="body-2">
				<nuxt-link class="text-decoration-none" to="/category">Categories</nuxt-link>
				/
				{{ categoryTitle }}
			</div>

			<div class="category-page-header__title">
				<span class="text-h3">
					{{ categoryTitle }}
				</span>

				<span></span>
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'CategoryHeader',

	props: {
		categoryTitle: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="stylus" scoped>
.category-page-header {
  box-shadow: inset 0 0 #111
  min-height: 200px;
  &__title {

  }
}
</style>
