<template>
	<div class="compare-page">
		<div class="text-h4 py-8 text-center">Compare products</div>

		<CommonLoading v-if="compareItemsLoading" />
		<div v-else>
			<ProductCompareTable v-if="anyCompareItems" :items="compareList" @remove="removeFromCompare" />
			<ProductCompareNoItems v-else />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'compare',

	computed: {
		...mapState({
			compareList: (state) => state.product.compare.compareList || [],
		}),

		anyCompareItems() {
			return Boolean(this.compareList?.length);
		},
		compareItemsLoading() {
			return !this.compareList?.length;
		},
	},

	methods: {
		...mapActions({
			removeFromCompareStore: 'product/compare/removeFromCompareList',
		}),

		removeFromCompare(itemID) {
			this.removeFromCompareStore(itemID);
		},
	},
};
</script>
