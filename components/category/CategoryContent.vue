<template>
	<v-row :class="{ 'white-overlay': updatingProducts }" no-gutters>
		<v-col class="pr-4" cols="0" md="3">
			<CategoryFilters
				:category-colors="categoryData.colors"
				:category-sizes="categoryData.sizes"
				:max-price="Math.ceil(categoryData.maxPrice)"
				:min-price="Math.floor(categoryData.minPrice)"
				:preferred-currency="preferredCurrency"
				@set-loading="setProductsUpdatingLoading"
			/>
		</v-col>

		<v-col class="pl-4" cols="12" md="9">
			<ProductList :products="categoryData.categoryItems" small />
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'CategoryContent',

	props: {
		categoryData: {
			type: Object,
			required: true,
		},
		preferredCurrency: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			updatingProducts: false,
		};
	},

	methods: {
		setProductsUpdatingLoading(value) {
			this.updatingProducts = value;
		},
	},
};
</script>

<style lang="stylus" scoped></style>
