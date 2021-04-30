<template>
	<div>
		<div class="product-details__title product-details__title--big">We found other product you might like</div>
		<ProductList :products="products" />
	</div>
</template>

<script>
export default {
	name: 'ProductDetailsOffers',

	props: {
		products: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped></style>
