<template>
	<v-btn
		class="px-1"
		v-bind="$attrs"
		:icon="!text"
		:text="text"
		:ripple="!text"
		color="#828282"
		@click.stop="addToWishlist"
	>
		<v-icon v-if="isWish"> mdi-heart </v-icon>
		<v-icon v-else> mdi-heart-outline </v-icon>

		<span v-if="text" class="px-1">
			<span v-if="isWish"> Remove </span>
			<span v-else> Add to favorite </span>
		</span>
	</v-btn>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	name: 'ProductAddToWishlist',

	props: {
		product: {
			type: Object,
			required: true,
		},
		text: {
			type: Boolean,
			required: false,
			default: null,
		},
	},

	data() {
		return {
			isWish: false,
		};
	},

	computed: {
		...mapState('product/wishlist', ['lastUsedItemID', 'lastAction']),
		...mapGetters({
			isProductInWishlist: 'product/wishlist/isProductInWishlist',
		}),
	},

	watch: {
    lastUsedItemID: 'updateLocalWishState',
    lastAction: 'updateLocalWishState',
	},

	mounted() {
		this.isWish = this.isProductInWishlist(this.product.id);
	},

	methods: {
		...mapActions({
			addToWishlistStore: 'product/wishlist/addToWishlist',
			removeFromWishlistStore: 'product/wishlist/removeFromWishlist',
		}),

		addToWishlist() {
			this.updateWishOnServer(this.product);
			this.toggleIsWish();
		},

		updateWishOnServer(wish) {
			this.isWish ? this.removeFromWishlistStore(wish.id) : this.addToWishlistStore(wish);
		},

    updateLocalWishState() {
      const removeAction = this.lastAction === 'remove';
      const clearAction = this.lastAction === 'clear';
      const currentItem = this.lastUsedItemID === this.product.id;

      if (removeAction && currentItem) this.isWish = false;
      else if (clearAction) this.isWish = false;
    },
		toggleIsWish() {
			this.isWish = !this.isWish;
		},
	},
};
</script>
