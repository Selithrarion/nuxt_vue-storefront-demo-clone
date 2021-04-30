<template>
	<v-col cols="12" md="6">
		<div class="product-details__title text-h5 my-4">Reviews</div>

		<div v-if="reviews" class="pt-6">
			<ProductReviewsItem v-for="review in sortedReviews" :key="review.id" :review="review" />
		</div>

		<div v-else>
			No reviews have been posted yet. Please don't hesitate to share your opinion and write the first review!
		</div>
	</v-col>
</template>

<script>
export default {
	name: 'ProductReviewsList',

	props: {
		reviews: {
			type: Array,
			required: true,
		},
	},

	computed: {
		sortedReviews() {
			const array = this.reviews;
			return array.reverse().slice(0, 3);
		},
	},
};
</script>

<style scoped></style>
