<template>
	<div class="search-filter mb-4">
		<div class="search-filter__title">Filter by categories</div>
		<div class="search-filter__content">
			<v-btn
				v-for="category in supportedCategories"
				:key="category"
				:input-value="filters[category]"
				outlined
				tile
				@click="filters[category] = !filters[category]"
			>
				{{ getCategoryName(category) }}
			</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RightSidebarSearchFilter',

	data() {
		return {
			filters: {
				gear: false,
				watches: false,
				collections: false,
				yogaCollection: false,
				pants: false,
				defaultCategory: false,
				fitness: false,
			},

			filtersNames: {
				gear: 'Gear',
				watches: 'Watches',
				collections: 'Collections',
				yogaCollection: 'Yoga Collection',
				pants: 'Pants',
				defaultCategory: 'Default Category',
				fitness: 'Fitness',
			},
		};
	},

	watch: {
		enabledFilters(value) {
			this.$emit('update-filters', value);
		},
	},

	computed: {
		enabledFilters() {
			const result = [];
			const filtersObject = this.filters;

			for (const key in filtersObject) {
				if (filtersObject[key]) result.push(key);
			}

			return result;
		},

		supportedCategories() {
			// here we only need to show categories array, that are supported by product. but i don't want to do it without
			// backend and just return filters array. i'm lazy))
			let result = [];
			for (const key in this.filters) {
				result.push(key);
			}
			return result;
		},
	},

	methods: {
		getCategoryName(categoryKey) {
			return this.filtersNames[categoryKey];
		},
	},
};
</script>

<style lang="stylus" scoped>
.search-filter {
  &__title {
    font-size: 1.1rem
    font-weight: 600
    color: rgba(85, 85, 85, 0.65)
    padding-bottom: 16px
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 4px;
  }

  ::v-deep.v-btn--outlined {
    border: 2px solid #4040408c;
  }
  ::v-deep.v-btn--active {
    border: 2px solid black
    span {
      color: white
    }
    &::before {
      opacity: 1 !important
    }
  }
}
</style>
