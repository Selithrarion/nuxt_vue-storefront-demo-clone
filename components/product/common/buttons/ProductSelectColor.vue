<template>
	<div class="product-select-color pb-6">
		<div v-if="!notShowSelectedState" class="subtitle-2 text--secondary pb-2">
			Color: <b>{{ selectedColorName }}</b>
		</div>

		<div class="product-select-color__list">
			<button
				v-for="colorID in availableColors"
				:key="colorID"
				class="product-select-color__item inline-flex-center mr-2 mr-md-1 mr-lg-2"
				:class="{ 'product-select-color__item--selected': colorID === selectedColor }"
				@click="selectColor(colorID)"
			>
				<span :style="{ background: getColor(colorID) }" />
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ProductSelectColor',

	props: {
		availableColors: {
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
			selectedColor: null,
		};
	},

	computed: {
		...mapState('product', ['colors']),

		selectedColorName() {
			const selectedID = this.selectedColor;
			const colorItem = this.getColorItemById(selectedID);
			return colorItem?.name;
		},
	},

	mounted() {
		this.setSelected();
	},

	methods: {
		selectColor(id) {
			this.selectedColor = id;
			this.$emit('select', id);
		},

		setSelected() {
			const needDefaultSelect = !this.emptyDefault;
			if (needDefaultSelect) this.selectedColor = this.defaultValue || this.availableColors[0];
		},
		getColor(id) {
			const color = this.getColorItemById(id);
			return color.color;
		},
		getColorItemById(id) {
			return this.colors.find((color) => color.id === id);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-select-color {
  min-height: 36px
  &__item {
    width: 40px
    height: 40px
    outline: none
    border-radius: 50%
    margin-bottom: 4px
    border: 2px dashed transparent
    transition: filter 200ms ease, border-radius 200ms ease, border 200ms ease

    > span {
      width: 30px
      height: 30px
      border-radius: 50%
      padding: 4px
    }

    &:hover {
      filter: brightness(1.2)  hue-rotate(10deg)
      border: 2px dashed #aaaaaa
      border-radius: 25%
    }

    &--selected {
      border: 2px dashed #9a9a9a
    }
  }
}
</style>
