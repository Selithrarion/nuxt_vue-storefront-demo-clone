<template>
	<div class="product-select-size pb-6">
		<div v-if="!notShowSelectedState" class="subtitle-2 text--secondary pb-2">
			Size: <b>{{ selectedSizeName }}</b>
		</div>

		<div class="product-select-size__list flex-gap-1">
			<button
				v-for="sizeID in availableSizes"
				:key="sizeID"
				class="product-select-size__item inline-flex-center mr-2 mr-md-1 mr-lg-2"
				:class="{ 'product-select-size__item--selected': sizeID === selectedSize }"
				@click="selectSize(sizeID)"
			>
				{{ getSizeName(sizeID) }}
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ProductSelectSize',

	props: {
		availableSizes: {
			type: Array,
			required: true,
		},
		defaultValue: {
			type: Number,
			required: false,
			default: null,
		},
		notShowSelectedState: {
			type: Boolean,
			required: false,
			default: false,
		},
		emptyDefault: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			selectedSize: null,
		};
	},

	computed: {
		...mapState('product', ['sizes']),

		selectedSizeName() {
			const selectedID = this.selectedSize;
			const sizeItem = this.getSizeItemByID(selectedID);
			return sizeItem?.name;
		},
	},

	mounted() {
		this.setSelected();
	},

	methods: {
		selectSize(id) {
			this.selectedSize = id;
			this.$emit('select', id);
		},

		setSelected() {
			const needDefaultSelect = !this.emptyDefault;
			if (needDefaultSelect) this.selectedSize = this.defaultValue || this.availableSizes[0];
		},
		getSizeName(id) {
			const size = this.getSizeItemByID(id);
			return size.name;
		},
		getSizeItemByID(id) {
			return this.sizes.find((size) => size.id === id);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-select-size {
  &__item {
    width: 40px
    min-height: 40px
    outline: none
    margin-bottom: 4px
    background-color: white
    border: 2px dashed transparent
    transition: filter 200ms ease, border-radius 200ms ease, border 200ms ease
    user-select: none

    > span {
      width: 30px
      min-height: 30px
      padding: 4px
    }

    &:hover {
      border: 2px dashed #cacaca
    }

    &--selected {
      border: 2px dashed #9a9a9a
    }
  }
}
</style>
