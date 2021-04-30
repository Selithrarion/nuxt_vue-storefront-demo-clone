<template>
	<div class="product-reviews-item">
		<div class="product-reviews-item__title overflow-hidden-ellipsis" :title="review.title">{{ review.title }}</div>

		<div class="product-reviews-item__subtitle">
			<span class="product-reviews-item__subtitle-name overflow-hidden-ellipsis" :title="review.author">
				{{ review.author }},
			</span>
			<span>
				{{ formatDate(review.createdAt) }}
			</span>
		</div>

		<div class="product-reviews-item__text" ref="text">
			{{ review.text }}
		</div>
		<div v-if="isOverflow" class="pt-1 text-center">
			<span class="subtitle-2 pointer non-selectable hover-underlined--primary" @click="toggleFullTextDialog">View full</span>
		</div>

		<ProductReviewFullTextDialog :dialog-prop="fullTextDialog" :review="review" @close="toggleFullTextDialog" />
	</div>
</template>

<script>
import formatDateMixin from '../../../../mixins/format/formatDateMixin';

export default {
	name: 'ProductReviewsItem',

	mixins: [formatDateMixin],

	props: {
		review: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isOverflow: false,
			fullTextDialog: false,
		};
	},

	methods: {
		toggleFullTextDialog() {
			this.fullTextDialog = !this.fullTextDialog;
		},

		setIsTextOverflow() {
			this.$refs.text.style.overflow = 'visible';
			this.$refs.text.style.display = 'block';

			const threeRowsHeight = 72;
			this.isOverflow = this.$refs.text.offsetHeight > threeRowsHeight;

			this.$refs.text.style.display = '-webkit-box';
			this.$refs.text.style.overflow = 'hidden';
		},
	},

	mounted() {
		this.$nextTick(() => {
			this.setIsTextOverflow();
		});
	},
};
</script>

<style lang="stylus" scoped>
.product-reviews-item {
  &:not(:first-child) {
    padding-top: 48px
  }

  &__title {
    font-size: 1.1rem
    white-space: nowrap
    opacity: 0.8
  }

  &__subtitle {
    display: flex
    gap: 5px
    font-size: 0.8rem
    white-space: nowrap
    padding-bottom: 8px
    opacity: 0.6
  }

  &__text {
    opacity: 0.8
    word-break: break-word
    overflow: hidden
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 3
    line-clamp: 3
    max-height: 90px
  }
}
</style>
