<template>
	<v-dialog v-model="dialog" width="700" @input="handleDialogInputValue">
		<v-card class="right-sidebar-cart-dialog-edit">
			<v-card-title> Edit cart item </v-card-title>

			<v-card-text class="d-flex flex-column flex-gap-2 text-center">
				<div v-if="colors" class="flex-center flex-column flex-gap-1">
					<div class="text-h5">Color</div>
					<ProductSelectColor :available-colors="colors" :default-value="newProduct.color" @select="selectColor" />
				</div>

				<div v-if="sizes" class="flex-center flex-column flex-gap-1">
					<div class="text-h5">Size</div>
					<ProductSelectSize :available-sizes="sizes" :default-value="newProduct.size" @select="selectSize" />
				</div>
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="close"> Cancel </v-btn>
				<v-spacer />
				<v-btn :loading="loading" color="primary" text @click="update"> Update product </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

import loadingMixin from '../../../../mixins/common/loadingMixin';
import dialogMethodsMixin from '../../../../mixins/common/dialogMethodsMixin';

export default {
	name: 'RightSidebarCartDialogEdit',

	mixins: [loadingMixin, dialogMethodsMixin],

	props: {
		product: {
			type: Object,
			required: true,
		},
		colors: {
			type: Array,
			required: false,
			default: null,
		},
		sizes: {
			type: Array,
			required: false,
			default: null,
		},
	},

	data() {
		return {
			newProduct: Object.assign({}, this.product),
		};
	},

	computed: {
		isAnyEdit() {
			const oldProduct = this.product;
			const newProduct = this.newProduct;

			const isNewColor = oldProduct.color !== newProduct.color;
			const isNewSize = oldProduct.size !== newProduct.size;

			return isNewColor || isNewSize;
		},
	},

	watch: {
		product(val) {
			this.newProduct = Object.assign({}, val);
		},
	},

	methods: {
		...mapActions({
			editItem: 'product/cart/editItem',
			showSnackbarBasedOnDataSuccess: 'snackbar/showSnackbarBasedOnDataSuccess',
		}),

		async update() {
			if (!this.isAnyEdit) {
				this.close();
				return;
			}

			try {
				this.startLoading();

				const isSuccess = await this.editItem(this.newProduct);
				this.showSnackbarBasedOnDataSuccess(isSuccess);

				if (isSuccess) {
					this.close();
				}
			} finally {
				this.stopLoading();
			}
		},

		selectColor(color) {
			this.newProduct.color = color;
		},
		selectSize(size) {
			this.newProduct.size = size;
		},
	},
};
</script>
