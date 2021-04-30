<template>
	<v-row class="justify-space-between">
		<ProductReviewsList :reviews="reviews" />
		<ProductReviewsAdd @add="addReview" />
	</v-row>
</template>

<script>
export default {
	name: 'ProductReviews',

	props: {
		reviews: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			reviewsData: this.reviews,
		};
	},

	methods: {
		addReview(review) {
			this.reviewsData.push(review);
		},
	},
};
</script>

<style scoped></style>
