<template>
	<div class="category-page">
		<CommonLoading v-if="!categoryData" />

		<div v-else>
			<CategoryHeader :category-title="categoryData.title"N />
			<CategoryContent :category-data="categoryData" :preferred-currency="preferredCurrency" />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'CategoryPage',

	data() {
		return {
			categoryData: null,
		};
	},

	computed: {
		...mapState({
			preferredCurrency: (state) => state.user.preferredCurrency,
		}),
	},

	async fetch() {
		const { category } = this.$route.params;
		this.categoryData = await this.fetchCategoryStore(category);
	},

	methods: {
		...mapActions({
			fetchCategoryStore: 'category/fetchCategory',
		}),
	},
};
</script>
