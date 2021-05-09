<template>
	<div class="product-details">
		<CommonLoading v-if="!productData" />

		<v-container v-else class="pa-0" fluid>
			<ProductDetailsMain :product="productData" />
			<ProductDetailsInfo :product="productData" />

			<v-divider class="mt-16 mb-12" />

			<ProductReviews :reviews="productReviews" />

			<ProductDetailsOffers :products="offerProducts" />
			<ProductDetailsSimilar :products="similarProducts" />
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'ProductDetails',

	data() {
		return {
			productData: null,
			productReviews: null,
			offerProducts: null,
			similarProducts: null,
		};
	},

	async fetch() {
		const { id } = this.$route.params;
		const item = await this.fetchProductByID(id);

		this.productData = item.product;
		this.productReviews = item.product.reviews;
		this.offerProducts = item.offer;
		this.similarProducts = item.similar;
	},

	methods: {
		...mapActions({
			fetchProductByID: 'product/fetchProductByID',
		}),
	},
};
</script>

<style lang="stylus" scoped>
.product-details {
  ::v-deep &__title {
    color: #4f4f4f
    &--big {
      font-size: 2.125rem
      line-height: 2.5rem
      padding: 64px 0 40px
      text-align: center
    }
  }
}
</style>
