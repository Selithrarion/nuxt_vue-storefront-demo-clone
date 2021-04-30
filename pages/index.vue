<template>
	<div>
		<CommonLoading v-if="!newProductList" />

		<div v-else>
			<ProductLargeItem v-if="isDesktop" :product="largeProduct" />

			<v-lazy>
				<ProductOffers :products="offersProductList" />
			</v-lazy>

			<v-lazy>
				<div class="text-center text-h4 pt-16 pb-4 text--secondary">Everything new</div>
			</v-lazy>
			<v-lazy>
				<ProductList :products="newProductList" small />
			</v-lazy>

			<v-lazy>
				<div class="text-center text-h4 pt-16 pb-4 text--secondary">Get inspired</div>
			</v-lazy>
			<v-lazy>
				<LayoutMainGetInspired />
			</v-lazy>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'MainPage',

	data() {
		return {
			largeProduct: null,
			newProductList: null,
			offersProductList: null,
		};
	},

	computed: {
		isDesktop() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
	},

	async created() {
		const { items, largeItem, offersList } = await this.fetchProducts();
		this.newProductList = items;
		this.largeProduct = largeItem;
		this.offersProductList = offersList;
	},

	methods: {
		...mapActions({
			fetchProducts: 'product/fetchProducts',
		}),
	},
};
</script>
