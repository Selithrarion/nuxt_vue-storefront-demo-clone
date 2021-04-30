<template>
	<v-row class="product-details-main secondary pt-4 pt-sm-0">
		<v-col class="flex-center" cols="12" md="6">
			<img src="@/assets/svg/placeholder.svg" alt="Product Image" />
		</v-col>

		<v-col class="py-8" cols="12" md="6">
			<ProductBreadcrumbs :current-name="product.title" :categories="product.category" />

			<div class="pb-12 pt-6">
				<div class="pb-2 text-h3">{{ product.title }}</div>
				<div class="pb-2 text--disabled body-2">SKU: {{ product.sku }}</div>
				<div class="text-h4">{{ formatPrice(product.price) }}</div>
			</div>

			<ProductDetailsMainActions :product="product" @update-quantity="updateQuantity" />
		</v-col>
	</v-row>
</template>

<script>
import formatPrice from '../../../../mixins/format/formatPrice';

export default {
	name: 'ProductDetailsMain',

	mixins: [formatPrice],

	props: {
		product: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			quantity: 1,
		};
	},

	methods: {
		updateQuantity(newQuantity) {
			this.quantity = newQuantity;
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-details-main {
  min-height: 750px
}
</style>
