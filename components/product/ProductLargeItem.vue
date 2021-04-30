<template>
	<div class="product-large-item full-width mb-8">
		<v-container class="product-large-item__title pt-14">
			<div class="product-large-item__title-header text-h2">Walk the walk.</div>
			<div class="product-large-item__title-body body-2 pt-4">
				A fashion can become the prevailing style in behaviour or manifest the newest creations of designers,
				technologists, engineers, and design managers.
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'ProductLargeItem',

	props: {
		product: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-large-item {
  background: url('@/assets/img/banners/full-width-banner.jpg') bottom center no-repeat
  background-size: cover
  min-height: 640px
  margin-top: -8px
  &__title-body {
    max-width: 340px
  }
}
</style>
