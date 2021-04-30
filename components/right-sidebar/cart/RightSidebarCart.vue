<template>
	<div class="right-sidebar-cart pb-12">
		<RightSidebarCartHeader v-if="isAnyItem" @clear="clearCart" />

		<RightSidebarCartItemsList :items="cartItems" :is-any-item="isAnyItem" />

		<RightSidebarCartFooter v-if="isAnyItem" :items="cartItems" @hide="hideCart" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'RightSidebarCart',

	computed: {
		...mapState({
			cartItems: (state) => state.product.cart.cartItems,
		}),

		isAnyItem() {
			return Boolean(this.cartItems.length);
		},
	},

	methods: {
		...mapActions({
			clearCart: 'product/cart/clearCart',
		}),
		hideCart() {
			this.$emit('hide');
		},
	},
};
</script>
