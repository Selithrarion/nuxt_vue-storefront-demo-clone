<template>
	<div class="category-filters">
		<div class="category-filters__title text-h6 flex-between-center">
			<span>Filter</span>
			<CommonClearButton v-if="isFilters" text="Clear filters" @clear="clearFilters" />
		</div>

		<div class="category-filters__items mt-8">
			<div v-if="categoryColors" class="category-filters__item">
				<div class="category-filters__item-title">Color</div>
				<div class="category-filters__item-content">
					<ProductSelectColor
						:available-colors="categoryColors"
						not-show-selected-state
						empty-default
						@select="selectColor"
					/>
				</div>
			</div>

			<div class="category-filters__item">
				<div class="category-filters__item-title">Price</div>
				<div class="category-filters__item-content">
					<v-range-slider
						v-model="priceRangeHandler"
						:min="minPrice"
						:max="maxPrice"
						:tick-size="1"
						ticks="always"
						@change="setPriceRange"
					>
						<template #thumb-label="{ value }">
							{{ value }}
						</template>
					</v-range-slider>

					<div class="flex-between-center">
						<v-text-field
							v-model="priceRangeHandler[0]"
							class="d-inline-flex max-w-40"
							:suffix="preferredCurrency"
							hide-details
							solo
							@change="setFirstPriceRange"
						/>
						<v-text-field
							v-model="priceRangeHandler[1]"
							class="d-inline-flex max-w-40"
							:suffix="preferredCurrency"
							hide-details
							solo
							@change="setSecondPriceRange"
						/>
					</div>
				</div>
			</div>

			<div v-if="categorySizes" class="category-filters__item">
				<div class="category-filters__item-title">Size</div>
				<div class="category-filters__item-content">
					<ProductSelectSize
						:available-sizes="categorySizes"
						not-show-selected-state
						empty-default
						@select="selectSize"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'CategoryFilters',

	props: {
		categoryColors: {
			type: Array,
			required: false,
			default: null,
		},
		categorySizes: {
			type: Array,
			required: false,
			default: null,
		},
		maxPrice: {
			type: Number,
			required: true,
		},
		minPrice: {
			type: Number,
			required: true,
		},
		preferredCurrency: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			filters: {
				filterColor: null,
				filterSize: null,
				priceRange: [this.minPrice, this.maxPrice],
			},
			priceRangeHandler: [this.minPrice, this.maxPrice],
		};
	},

	computed: {
		isPriceRangeNoChange() {
			return this.filters.priceRange[0] === this.minPrice && this.filters.priceRange[1] === this.maxPrice;
		},
		isFilters() {
			const filters = this.filters;
			const color = filters.filterColor;
			const size = filters.filterSize;
			const price = !this.isPriceRangeNoChange;

			return color || size || price;
		},
	},

	watch: {
		filters: {
			handler(filtersObject) {
				this.updateProductsData(filtersObject);
			},
			deep: true,
		},
	},

	methods: {
		...mapActions({
			fetchDataWithFiltersStore: 'category/fetchDataWithFilters',
		}),

		async updateProductsData(filtersObj) {
			try {
				this.setParentProductsUpdatingLoading(true);

				const price = this.isPriceRangeNoChange ? null : filtersObj.priceRange;
				const payload = {
					...filtersObj,
					priceRange: price,
				};

				await this.fetchDataWithFiltersStore(payload);
			} finally {
				this.setParentProductsUpdatingLoading(false);
			}
		},

		setParentProductsUpdatingLoading(value) {
			this.$emit('set-loading', value);
		},

		setPriceRange(price) {
			this.filters.priceRange = price;
		},
		setFirstPriceRange(price) {
			this.priceRangeHandler[0] = price;
		},
		setSecondPriceRange(price) {
			this.priceRangeHandler[1] = price;
		},

		selectColor(color) {
			this.filters.filterColor = color;
		},
		selectSize(size) {
			this.filters.filterSize = size;
		},
		clearFilters() {
			this.filters.filterColor = null;
			this.filters.filterSize = null;
			this.filters.priceRange = [this.minPrice, this.maxPrice];
			this.priceRangeHandler = [this.minPrice, this.maxPrice];
		},
	},
};
</script>

<style lang="stylus" scoped>
.category-filters {
  &__title {
    display: flex
    align-items: center
    min-height: 36px
  }
  &__item {
    margin: 16px 0
    padding: 12px
    border: 1px solid rgba(206, 206, 206, 0.2)
    transition: box-shadow 200ms ease
    &:hover {
      box-shadow: 1px 1px 1px #86868657, 0 0 4px #88888814
    }
  }
  &__item-title {
    font-size: 0.8rem
    font-weight: 600
    padding-bottom: 12px
  }
}
</style>
