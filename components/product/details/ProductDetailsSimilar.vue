<template>
	<div>
		<div class="product-details__title product-details__title--big">Similar products</div>
		<ProductList :products="products" />
	</div>
</template>

<script>
export default {
	name: 'ProductDetailsSimilar',

	props: {
		products: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped></style>
