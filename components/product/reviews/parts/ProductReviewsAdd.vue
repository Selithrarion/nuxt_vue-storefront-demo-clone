<template>
	<v-col cols="12" md="5">
		<div class="product-details__title text-h5 my-4">Add review</div>
		<v-form v-model="valid" ref="form" @submit.prevent="addReview">
			<v-text-field v-model="form.author" :rules="[rules.required]" label="First name" validate-on-blur />

			<v-text-field v-model="form.email" :rules="[rules.required, rules.email]" label="Email" validate-on-blur />

			<v-text-field v-model="form.title" :rules="[rules.required]" label="Summary" validate-on-blur />

			<v-textarea v-model="form.text" :rules="[rules.required]" label="Review" rows="3" no-resize validate-on-blur />

			<div class="mt-8">
				<v-btn type="submit" class="black-btn" :loading="loading" x-large depressed tile>Add review</v-btn>
				<span class="inline-flex-center pl-2">
					<span class="transparent-underline"> or </span>

					<b class="hover-underlined--primary primary--text pointer px-1" @click="toggleAuthDialog">login</b>

					<span class="transparent-underline"> to account </span>
				</span>
			</div>
		</v-form>

		<AuthDialog :dialog-prop="authDialog" default-type="login" @close="toggleAuthDialog" />
	</v-col>
</template>

<script>
import { mapActions } from 'vuex';

import loadingMixin from '../../../../mixins/common/loadingMixin';
import formsValidationMixin from '../../../../mixins/common/formsValidationMixin';
import showNotification from '../../../../mixins/common/showNotification';

export default {
	name: 'ProductReviewsAdd',

	mixins: [loadingMixin, formsValidationMixin, showNotification],

	data() {
		return {
			valid: false,
			form: {
				author: '',
				email: '',
				title: '',
				text: '',
			},

			authDialog: false,
		};
	},

	methods: {
		...mapActions({
			addReviewStore: 'product/addReview',
		}),

		async addReview() {
			if (!this.valid) {
				this.showErrorNotification('invalid');
				this.$refs.form.validate();
				return;
			}

			try {
				this.startLoading();
				await this.addReviewStore(this.form);
				this.$emit('add', { ...this.form, id: Date.now(), createdAt: new Date().toISOString() });
				this.clearData();
			} finally {
				this.stopLoading();
			}
		},

		clearData() {
			this.form.author = '';
			this.form.email = '';
			this.form.title = '';
			this.form.text = '';
			this.$refs.form.resetValidation();
		},
		toggleAuthDialog() {
			this.authDialog = !this.authDialog;
		},
	},
};
</script>

<style scoped></style>
