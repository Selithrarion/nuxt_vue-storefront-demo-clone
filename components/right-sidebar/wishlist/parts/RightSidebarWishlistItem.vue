<template>
	<div class="right-sidebar-wishlist-item d-flex flex-column flex-sm-row mb-8">
		<nuxt-link class="right-sidebar-wishlist-item__img flex-center secondary" :to="'/details/' + product.id">
			<img class="mx-6" src="@/assets/svg/placeholder.svg" alt="Product Image" height="60" width="60" />
		</nuxt-link>

		<div class="right-sidebar-wishlist-item__content w-100 px-4 py-4">
			<div class="right-sidebar-wishlist-item__top flex-between-center w-100">
				<span>
					{{ product.title }}
				</span>
				<span>
					{{ formatPrice(product.price) }}
				</span>
			</div>

			<div class="right-sidebar-wishlist-item__subtitle flex-between-center w-100">
				<span class="text--disabled body-2">
					{{ product.sku }}
				</span>
				<span>
					<v-btn class="mr-n4" :ripple="false" plain small text @click="removeProductFromWishlist"> Remove </v-btn>
				</span>
			</div>

			<div class="right-sidebar-wishlist-item__add_to_cart pt-2">
				<ProductAddToCart :product="product" small />
			</div>
		</div>
	</div>
</template>

<script>
import formatPrice from '../../../../mixins/format/formatPrice';

export default {
	name: 'RightSidebarWishlistItem',

	mixins: [formatPrice],

	props: {
		product: {
			type: Object,
			required: true,
		},
	},

	methods: {
		removeProductFromWishlist() {
			const ID = this.product.id;
			this.$emit('remove', ID);
		},
	},
};
</script>

<style lang="stylus" scoped>
.right-sidebar-wishlist-item {
  min-height: 120px
  &__img {
    min-width: 150px
  }
  @media screen and (max-width: 600px) {
    &__img {
      height: 300px
    }
  }
}
</style>
