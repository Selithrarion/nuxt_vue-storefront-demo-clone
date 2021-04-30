<template>
	<div class="right-sidebar-cart-item d-flex flex-column flex-sm-row mb-8">
		<nuxt-link class="right-sidebar-cart-item__img flex-center secondary" :to="'/details/' + product.id">
			<img class="mx-6" src="@/assets/svg/placeholder.svg" alt="Product Image" height="60" width="60" />
		</nuxt-link>

		<div class="right-sidebar-cart-item__content w-100 px-4 py-4">
			<div class="right-sidebar-cart-item__info w-100">
				<div class="right-sidebar-cart-item__top w-100">
					<b class="right-sidebar-cart-item__title text--secondary">{{ product.title }}</b>
					<div class="right-sidebar-cart-item__model text--disabled caption">{{ product.sku }}</div>
				</div>

				<div class="right-sidebar-cart-item__properties-wrapper py-2 d-flex flex-column subtitle-2 text--secondary">
					<div class="right-sidebar-cart-item__price">Price: {{ formatPrice(product.price) }}</div>

					<div v-if="isAnyItemProperty">
						<div v-if="product.color">
							Color: {{ itemColorName }}
							<span class="right-sidebar-cart-item__small-color-circle" :style="{ background: itemColorCode }" />
						</div>
						<div v-if="product.size">Size: {{ itemSizeName }}</div>
					</div>
				</div>

				<div class="right-sidebar-cart-item__status">
					<div v-if="product.available" class="success--text">In stock</div>
					<div v-else class="error--text">Out of stock</div>
				</div>
			</div>

			<div class="right-sidebar-cart-item__actions ml-n3 mt-1 pt-6 pt-sm-0 w-100">
				<v-spacer v-if="!isMobile" />
				<v-btn v-if="isAnyItemProperty" plain :small="!isMobile" text @click="toggleEditDialog">
					Edit
					<v-icon class="pl-1" :small="!isMobile">mdi-pencil</v-icon>
				</v-btn>

				<CommonDialog @confirm="removeProduct">
					<template #default>
						<v-btn plain :small="!isMobile" text>
							Remove
							<CommonCloseButton class="ml-1" :small="!isMobile" />
						</v-btn>
					</template>

					<template #title>Remove item</template>
					<template #content> Are you sure you want to remove item from cart? </template>
				</CommonDialog>

				<CommonLoading v-if="loading" class="d-inline-flex" :size="15" :width="1" no-margin />
				<v-spacer v-if="!isMobile" />
			</div>
		</div>

		<v-divider v-if="!isMobile" class="ml-2 mr-6" vertical />

		<div class="right-sidebar-cart-item__quantity-wrapper px-4 pt-8 pa-sm-0">
			<ProductInputQuantity
				class="flex-center pa-0 mt-0 mb-4"
				:available="product.available"
				:default-value="product.quantity"
				@update="updateQuantity"
			/>
		</div>

		<RightSidebarCartDialogEdit
			v-if="isAnyItemProperty"
			:product="product"
			:colors="product.colors"
			:sizes="product.sizes"
			:dialog-prop="editDialog"
			@close="toggleEditDialog"
			@edit="updateProduct"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import loadingMixin from '../../../../mixins/common/loadingMixin';
import formatPrice from '../../../../mixins/format/formatPrice';

export default {
	name: 'RightSidebarCartItem',

	mixins: [loadingMixin, formatPrice],

	props: {
		cartItem: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			product: Object.assign({}, this.cartItem),
			quantity: this.cartItem.quantity,

			editDialog: false,
		};
	},

	computed: {
		...mapState({
			colors: (state) => state.product.colors,
			sizes: (state) => state.product.sizes,
		}),

		itemColorName() {
			const productColorID = this.product.color;
			const item = this.findPropertyNameByID(productColorID, 'colors');
			return item.name;
		},
		itemColorCode() {
			const productColorID = this.product.color;
			const item = this.findPropertyNameByID(productColorID, 'colors');
			return item.color;
		},
		itemSizeName() {
			const productSizeID = this.product.size;
			const item = this.findPropertyNameByID(productSizeID, 'sizes');
			return item.name;
		},
		isMobile() {
			return this.$vuetify.breakpoint.xs;
		},
	},

	watch: {
		cartItem(val) {
			this.product = Object.assign({}, val);
		},
	},

	methods: {
		...mapActions({
			updateQuantityStore: 'product/cart/updateQuantity',
			removeProductByIDStore: 'product/cart/removeFromCartByID',
		}),

		updateProduct(newItem) {
			this.product = newItem;
		},
		updateQuantity(newQuantity) {
			this.quantity = newQuantity;
			this.updateQuantityStore({ id: this.product.id, newQuantity: newQuantity });
		},

		async removeProduct() {
			try {
				this.startLoading();
				await this.removeProductByIDStore(this.product.id);
			} finally {
				this.stopLoading();
			}
		},

		isAnyItemProperty() {
			return this.product.color || this.product.size;
		},
		toggleEditDialog() {
			this.editDialog = !this.editDialog;
		},
		findPropertyNameByID(idToFind, type) {
			return this[type].find((item) => item.id === idToFind);
		},
	},
};
</script>

<style lang="stylus" scoped>
.right-sidebar-cart-item {
  min-height: 170px
  &__img {
    min-width: 150px
  }
  &__small-color-circle {
    display: inline-flex
    height: 10px
    width: 10px
    margin-left: 4px
    border-radius: 50%
  }
  &__quantity-wrapper {
    display: flex
    align-items: center
    justify-content: center
  }
  .deleting {
    filter: grayscale(1)
    background: var(--v-secondary)
  }
  @media screen and (max-width: 600px) {
    &__img {
      height: 300px
    }
    &__quantity-wrapper {
      display: flex
      align-items: flex-start
      justify-content: flex-start
    }
  }
}
</style>
