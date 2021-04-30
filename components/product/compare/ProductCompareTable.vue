<template>
	<div class="product-compare-table">
		<div class="product-compare-table__header subtitle-2">
			<div class="product-compare-table__feature-item product-compare-table__big-item">Products</div>

			<ul class="product-compare-table__features-list">
				<li class="product-compare-table__feature-item">Activity</li>
				<li class="product-compare-table__feature-item">SKU</li>
			</ul>
		</div>

		<div class="product-compare-table__content-wrapper">
			<ul class="product-compare-table__content subtitle-2 text-center">
					<li v-for="item in items" class="product-compare-table__item" :key="item.id">
						<CommonCloseButton class="product-compare-table__item-remove-button" @click="removeItem(item.id)" />
						<div
							class="product-compare-table__big-item product-compare-table__big-item--content flex-center flex-column pointer"
							@click="showDetails(item.id)"
						>
							<img class="mt-auto" src="@/assets/svg/placeholder.svg" alt="Product Image" height="70" width="70" />
							<div class="mt-auto pb-2">
								<div>{{ item.title }}</div>
								<div>{{ formatPrice(item.price) }}</div>
							</div>
						</div>

						<ul class="product-compare-table__features-list">
							<li class="product-compare-table__feature-item">{{ item.title }}</li>
							<li class="product-compare-table__feature-item">{{ item.sku }}</li>
						</ul>
					</li>
			</ul>
		</div>
	</div>
</template>

<script>
import formatPrice from '../../../mixins/format/formatPrice';

export default {
	name: 'ProductCompareTable',

	mixins: [formatPrice],

	props: {
		items: {
			type: Array,
			required: true,
		},
	},

	methods: {
		showDetails(id) {
			this.$router.push(`/details/${id}`);
		},
		removeItem(id) {
			this.$emit('remove', id);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-compare-table {
  position: relative
  overflow: hidden
  box-shadow: 0 0 10px #8cbbbe1f, 5px 2px 15px #4655a514
  border: 1px solid #8a8a8a36
  border-bottom: 1px solid #8a8a8a5c
  border-right: 1px solid #8a8a8a5c
  ul {
    list-style: none
    padding: 0
  }
  &__header {
    width: 200px
    position: absolute
    z-index: 3
    top: 0
    left: 0
    bottom: 6px
    background-color: #fafafa
    opacity: 0.95;
  }
  &__big-item {
    min-height: 300px
    &--content {
      background: var(--v-secondary-base)
    }
  }

  &__content-wrapper {
    overflow-x: auto
  }
  &__content {
    display: flex
    width: 100%
    margin-left: 200px
  }
  &__item {
    position: relative
    min-width: 200px
  }
  &__item-remove-button {
    position: absolute
    top: 4px
    right: 4px
  }

  &__feature-item {
    padding: 24px 16px
  }

  @media screen and (max-width: 599px) {
    &__header {
      width: 120px
    }
    &__content {
      margin-left: 120px
    }
    &__item {
      min-width: 150px
    }
  }
}
</style>
