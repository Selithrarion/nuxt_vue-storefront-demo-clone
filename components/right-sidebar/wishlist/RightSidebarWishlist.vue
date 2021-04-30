<template>
	<div class="right-sidebar-wishlist pb-12">
		<RightSidebarWishlistHeader v-if="isAnyWish" @clear="clearWishlist" />
		<RightSidebarWishlistItemsList :items="wishlist" :is-any-item="isAnyWish" @remove="removeProductFromWishlist" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'RightSidebarWishlist',

	computed: {
		...mapState({
			wishlist: (state) => state.product.wishlist.wishlist,
		}),

		isAnyWish() {
			return Boolean(this.wishlist.length);
		},
	},

	methods: {
		...mapActions({
			clearWishlist: 'product/wishlist/clearWishlist',
			removeFromWishlistStore: 'product/wishlist/removeFromWishlist',
		}),

		removeProductFromWishlist(id) {
			this.removeFromWishlistStore(id);
		},
	},
};
</script>
