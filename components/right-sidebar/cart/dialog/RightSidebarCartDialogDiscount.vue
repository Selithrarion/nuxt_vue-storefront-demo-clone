<template>
	<v-dialog v-model="dialog" width="700" @input="handleDialogInputValue">
		<v-card class="right-sidebar-cart-dialog-discount">
			<v-card-title> Add discount code </v-card-title>

			<v-card-text>
				<v-text-field v-model="code" placeholder="Enter your discount code" maxlength="10" hide-details solo />
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="close"> Cancel </v-btn>
				<v-spacer />
				<v-btn :loading="loading" :disabled="emptyCode" color="primary" text @click="confirm"> Confirm </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

import loadingMixin from '../../../../mixins/common/loadingMixin';
import dialogMethodsMixin from '../../../../mixins/common/dialogMethodsMixin';

export default {
	name: 'RightSidebarCartDialogDiscount',

	mixins: [loadingMixin, dialogMethodsMixin],

	data() {
		return {
			code: '',
		};
	},

	computed: {
		emptyCode() {
			return !this.code.trim();
		},
	},

	methods: {
		...mapActions({
			validateDiscountCode: 'product/cart/validateDiscountCode',
			showSnackbarBasedOnDataSuccess: 'snackbar/showSnackbarBasedOnDataSuccess',
		}),

		async confirm() {
			try {
				this.startLoading();

				const isSuccess = await this.validateDiscountCode(this.code);
				this.showSnackbarBasedOnDataSuccess(isSuccess);

				if (isSuccess) {
					this.$emit('add-discount', this.code);
					this.close();
				}
			} finally {
				this.stopLoading();
			}
		},

		clearData() {
			this.code = '';
		},
	},
};
</script>

<style scoped></style>
