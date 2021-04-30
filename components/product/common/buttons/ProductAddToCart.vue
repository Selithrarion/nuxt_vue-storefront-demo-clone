<template>
	<div>
		<v-btn
			class="black-btn"
			v-bind="$attrs"
			:loading="loading"
			:small="small"
			:x-large="!small"
			:disabled="unavailableProduct"
			depressed
			tile
			@click="addToCart"
		>
			{{ buttonText }}
		</v-btn>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import loadingMixin from '../../../../mixins/common/loadingMixin';

export default {
	name: 'ProductAddToCart',
	inheritAttrs: false,

	mixins: [loadingMixin],

	props: {
		product: {
			type: Object,
			required: true,
		},
		small: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			isInCart: false,
		};
	},

	computed: {
		...mapState('product/cart', ['lastUsedItemID', 'lastAction']),
		...mapGetters({
			isProductInCart: 'product/cart/isProductInCart',
		}),

		buttonText() {
			if (this.unavailableProduct) return 'Out of stock';
			return this.isInCart ? 'Remove from cart' : 'Add to cart';
		},
		unavailableProduct() {
			return !this.product.available;
		},
	},

	watch: {
		lastUsedItemID: 'updateLocalCartState',
		lastAction: 'updateLocalCartState',
	},

	mounted() {
		this.isInCart = this.isProductInCart(this.product.id);
	},

	methods: {
		...mapActions({
			addToCartStore: 'product/cart/addToCart',
			removeFromCartByIDStore: 'product/cart/removeFromCartByID',
			showSnackbarBasedOnDataSuccess: 'snackbar/showSnackbarBasedOnDataSuccess',
		}),

		async addToCart() {
			try {
				this.startLoading();

				const product = this.product;

				const firstAvailableColor = product.colors[0];
				const firstAvailableSize = product.sizes[0];

				const populatedProduct = {
					...product,
					quantity: product?.quantity || 1,
					color: product?.color || firstAvailableColor,
					size: product?.size || firstAvailableSize,
				};

				const isSuccess = await this.updateCartOnServer(populatedProduct);
				this.showSnackbarBasedOnDataSuccess(isSuccess);
			} finally {
				this.stopLoading();
			}
		},

		async updateCartOnServer(item) {
			return this.isInCart ? await this.removeFromCartByIDStore(item.id) : await this.addToCartStore(item);
		},

		updateLocalCartState() {
			const addAction = this.lastAction === 'add';
			const removeAction = this.lastAction === 'remove';
			const clearAction = this.lastAction === 'clear';
			const currentItem = this.lastUsedItemID === this.product.id;

			if (currentItem) {
				if (addAction && !this.isInCart) this.isInCart = true;
				else if (removeAction && this.isInCart) this.isInCart = false;
			}
			if (clearAction) this.isInCart = false;
		},
	},
};
</script>
