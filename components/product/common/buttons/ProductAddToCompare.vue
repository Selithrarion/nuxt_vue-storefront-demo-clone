<template>
	<v-btn
		class="px-1"
		v-bind="$attrs"
		:icon="!text"
		:text="text"
		:ripple="!text"
		color="#828282"
		@click.stop="addToCompare"
	>
		<v-icon v-if="isCompare"> mdi-select-compare </v-icon>
		<v-icon v-else> mdi-compare </v-icon>

		<span v-if="text" class="px-1">
			<span v-if="isCompare"> Remove </span>
			<span v-else> Add to compare </span>
		</span>
	</v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ProductAddToCompare',

	props: {
		product: {
			type: Object,
			required: true,
		},
		text: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			isCompare: false,
		};
	},

	computed: {
		...mapGetters({
			isProductInCompareList: 'product/compare/isProductInCompareList',
		}),
	},

	mounted() {
		this.isCompare = this.isProductInCompareList(this.product.id);
	},

	methods: {
		...mapActions({
			addToCompareStore: 'product/compare/addToCompareList',
			removeFromCompareStore: 'product/compare/removeFromCompareList',
		}),

		addToCompare() {
			this.updateCompareOnServer(this.product);
			this.toggleIsCompare();
		},

		updateCompareOnServer(compare) {
			this.isCompare ? this.removeFromCompareStore(compare.id) : this.addToCompareStore(compare);
		},
		toggleIsCompare() {
			this.isCompare = !this.isCompare;
		},
	},
};
</script>
