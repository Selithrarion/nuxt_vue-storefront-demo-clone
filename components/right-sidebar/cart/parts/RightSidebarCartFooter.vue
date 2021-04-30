<template>
	<div class="right-sidebar-cart-footer">
		<v-divider class="mt-12 mb-10" />

		<div class="text-h5 text--secondary">Shopping summary</div>

		<div class="right-sidebar-cart-footer__info subtitle-2 pt-6 pb-4 text--secondary">
			<div>
				<span>Subtotal:</span> <span class="subtitle-1">{{ formatPrice(subtotal) }}</span>
			</div>
			<div>
				<span>Tax <span class="text--disabled">(fixed)</span>: </span>
				<span class="subtitle-1">{{ formatPrice(tax) }}</span>
			</div>
			<div>
				<span>
					Discount:

					<v-btn x-small icon @click="toggleDiscountDialogInput" v-if="!validatedDiscountCode">
						<v-icon small>mdi-plus</v-icon>
					</v-btn>
					<span v-else class="right-sidebar-cart-footer__discount-code" @click="clearDiscount">
						{{ validatedDiscountCode }}
						<CommonCloseButton color="error" small />
					</span>
				</span>

				<span class="subtitle-1">{{ formatPrice(discount) }}</span>
			</div>
		</div>

		<div class="flex-between-center" :class="[isMobile ? 'text-h5' : 'text-h4']">
			<span>Grand Total: </span> <span :class="[isMobile ? 'text-h4' : 'text-h3']">{{ formatPrice(total) }}</span>
		</div>

		<div class="flex-between-center mt-12">
			<v-btn class="px-1" href="/" small plain text @click="hideCart">Return to shopping</v-btn>

			<v-btn class="black-btn ml-auto" depressed x-large tile>Go to checkout</v-btn>
		</div>

		<RightSidebarCartDialogDiscount
			:dialog-prop="discountDialog"
			@close="toggleDiscountDialogInput"
			@add-discount="addDiscount"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import formatPrice from '../../../../mixins/format/formatPrice';

export default {
	name: 'RightSidebarCartFooter',

  mixins: [formatPrice],

	data() {
		return {
			discountDialog: false,
			validatedDiscountCode: '',
		};
	},

	computed: {
		...mapState({
			tax: (state) => state.product.cart.tax,
			discount: (state) => state.product.cart.discount,
		}),
		...mapGetters({
			subtotal: 'product/cart/getSubtotalPrice',
			total: 'product/cart/getTotalPrice',
		}),

		isMobile() {
			return this.$vuetify.breakpoint.xs;
		},
	},

	methods: {
		...mapMutations({
			setDiscountStore: 'product/cart/SET_DISCOUNT',
		}),

		addDiscount(code) {
			this.validatedDiscountCode = code;
		},
		clearDiscount() {
			this.validatedDiscountCode = '';
			this.setDiscountStore(0);
		},
		toggleDiscountDialogInput() {
			this.discountDialog = !this.discountDialog;
		},
		hideCart() {
			this.$emit('hide');
		},
	},
};
</script>

<style lang="stylus" scoped>
.right-sidebar-cart-footer {
  &__info {
    > div {
      display: flex
      justify-content: space-between
      align-items: center
    }
  }
  &__discount-code {
    cursor: pointer
    transition: color 200ms ease
    &:hover {
      color: var(--v-error-base)
    }
    i {
      padding-bottom: 2px
    }
  }
}
</style>
