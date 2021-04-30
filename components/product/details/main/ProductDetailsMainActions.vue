<template>
	<div class="product-details-main-actions">
		<ProductSelectColor
			v-if="isProductColors"
			class="flex-center-xs-start-sm flex-column flex-gap-1"
			:available-colors="product.colors"
			@select="selectColor"
		/>

		<ProductSelectSize
			v-if="isProductSizes"
			class="flex-center-xs-start-sm flex-column flex-gap-1"
			:available-sizes="product.sizes"
			@select="selectSize"
		/>

		<div class="d-flex d-sm-block align-center pb-12 pt-2">
			<ProductInputQuantity :available="product.available" @update="updateQuantity" />
			<span class="text--secondary body-2">{{ product.available }} available</span>
		</div>

		<ProductAddToCart
			class="flex-center-xs-start-sm mb-8 mb-sm-4"
			:product="getNewCartItem()"
			:disabled="!isQuantityLessAvailable"
		/>

		<v-row class="flex-center-xs-start-sm" no-gutters>
			<v-col cols="6">
				<ProductAddToWishlist :product="product" :small="isMobile" text />
			</v-col>
			<v-col class="d-flex justify-end justify-sm-start" cols="6">
				<ProductAddToCompare :product="product" :small="isMobile" text />
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'ProductDetailsMainActions',

	props: {
		product: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			quantity: 1,
			selectedColor: this.product?.sizes[0],
			selectedSize: this.product?.colors[0],
		};
	},

	computed: {
		isQuantityLessAvailable() {
			return this.quantity <= this.product.available;
		},
		isMobile() {
			return this.$vuetify.breakpoint.xs;
		},
	},

	methods: {
		updateQuantity(value) {
			this.quantity = value;
			this.$emit('update-quantity', value);
		},
		getNewCartItem() {
			return { ...this.product, color: this.selectedColor, size: this.selectedSize, quantity: this.quantity };
		},

		isProductColors() {
			return Boolean(this.product.colors.length);
		},
		isProductSizes() {
			return Boolean(this.product.sizes.length);
		},
		selectColor(color) {
			this.selectedColor = color;
		},
		selectSize(size) {
			this.selectedSize = size;
		},
	},
};
</script>
